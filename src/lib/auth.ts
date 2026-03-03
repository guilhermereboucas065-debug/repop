import bcrypt from "bcryptjs";
import { z } from "zod";
import { db } from "@/lib/db";

const credentialsSchema = z.object({
  email: z.string().email("E-mail inválido"),
  password: z.string().min(6, "A senha precisa ter ao menos 6 caracteres"),
  name: z.string().min(2, "Nome é obrigatório").optional(),
});

export async function registerUser(input: unknown) {
  const parsed = credentialsSchema.extend({ name: z.string().min(2) }).safeParse(input);

  if (!parsed.success) {
    return { ok: false, error: parsed.error.issues[0]?.message ?? "Dados inválidos" };
  }

  const { email, password, name } = parsed.data;
  const exists = await db.user.findUnique({ where: { email } });

  if (exists) {
    return { ok: false, error: "Usuário já cadastrado" };
  }

  const passwordHash = await bcrypt.hash(password, 10);

  await db.user.create({
    data: {
      email,
      name,
      passwordHash,
      subscription: {
        create: {
          status: "TRIAL",
          plan: "STARTER",
          trialEndsAt: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
        },
      },
    },
  });

  return { ok: true };
}

export async function loginUser(input: unknown) {
  const parsed = credentialsSchema.pick({ email: true, password: true }).safeParse(input);

  if (!parsed.success) {
    return { ok: false, error: "Credenciais inválidas" };
  }

  const { email, password } = parsed.data;
  const user = await db.user.findUnique({
    where: { email },
    include: { subscription: true },
  });

  if (!user) {
    return { ok: false, error: "Usuário não encontrado" };
  }

  const validPassword = await bcrypt.compare(password, user.passwordHash);

  if (!validPassword) {
    return { ok: false, error: "Senha incorreta" };
  }

  return {
    ok: true,
    user: {
      id: user.id,
      email: user.email,
      name: user.name,
      subscription: user.subscription,
    },
  };
}
