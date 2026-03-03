import { Router } from 'express';
import { z } from 'zod';
import { prisma } from '../../config/prisma.js';
import { generateCaseSummary, Question } from '../../utils/summary.js';
import { authMiddleware } from '../../middleware/auth.js';

const router = Router();

const responseSchema = z.object({
  clientName: z.string().min(2),
  clientEmail: z.string().email(),
  answers: z.record(z.string(), z.string())
});

router.post('/public/forms/:slug/responses', async (req, res) => {
  const parsed = responseSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ message: 'Dados inválidos.' });
  }

  const form = await prisma.triageForm.findUnique({ where: { slug: req.params.slug } });
  if (!form) {
    return res.status(404).json({ message: 'Formulário não encontrado.' });
  }

  const { clientName, clientEmail, answers } = parsed.data;
  const questions = form.questions as unknown as Question[];
  const summary = generateCaseSummary(form.title, clientName, questions, answers);

  const response = await prisma.formResponse.create({
    data: {
      formId: form.id,
      clientName,
      clientEmail,
      answers,
      summary
    }
  });

  return res.status(201).json({ id: response.id, summary });
});

router.get('/my-responses', authMiddleware, async (req, res) => {
  const responses = await prisma.formResponse.findMany({
    where: { form: { lawyerId: req.userId } },
    include: { form: { select: { title: true, slug: true } } },
    orderBy: { createdAt: 'desc' }
  });

  return res.json(responses);
});

export { router as responsesRoutes };
