import { Router } from 'express';
import { z } from 'zod';
import { prisma } from '../../config/prisma.js';
import { authMiddleware } from '../../middleware/auth.js';

const router = Router();

const questionSchema = z.object({
  id: z.string(),
  label: z.string().min(1),
  type: z.enum(['text', 'textarea', 'date', 'select'])
});

const createFormSchema = z.object({
  title: z.string().min(3),
  description: z.string().optional(),
  questions: z.array(questionSchema).min(1)
});

function slugify(title: string) {
  return title
    .toLowerCase()
    .normalize('NFD')
    .replace(/[^\w\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-');
}

router.get('/', authMiddleware, async (req, res) => {
  const forms = await prisma.triageForm.findMany({
    where: { lawyerId: req.userId },
    orderBy: { createdAt: 'desc' }
  });
  return res.json(forms);
});

router.post('/', authMiddleware, async (req, res) => {
  const parsed = createFormSchema.safeParse(req.body);

  if (!parsed.success) {
    return res.status(400).json({ message: 'Dados inválidos.', errors: parsed.error.flatten() });
  }

  const { title, description, questions } = parsed.data;
  const baseSlug = slugify(title);
  let slug = baseSlug;
  let index = 1;

  while (await prisma.triageForm.findUnique({ where: { slug } })) {
    slug = `${baseSlug}-${index}`;
    index += 1;
  }

  const form = await prisma.triageForm.create({
    data: {
      title,
      description,
      slug,
      questions,
      lawyerId: req.userId!
    }
  });

  return res.status(201).json(form);
});

router.get('/public/:slug', async (req, res) => {
  const form = await prisma.triageForm.findUnique({
    where: { slug: req.params.slug },
    select: { id: true, title: true, description: true, slug: true, questions: true }
  });

  if (!form) {
    return res.status(404).json({ message: 'Formulário não encontrado.' });
  }

  return res.json(form);
});

export { router as formsRoutes };
