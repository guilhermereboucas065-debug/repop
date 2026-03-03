import Link from "next/link";
import { AuthForm } from "@/components/auth-form";

export default function RegisterPage() {
  return (
    <main>
      <section className="card">
        <h1>Cadastro</h1>
        <p className="text-muted">Crie sua conta para iniciar o período de teste.</p>
        <AuthForm mode="register" />
        <p>
          Já possui conta? <Link href="/login">Entrar</Link>
        </p>
      </section>
    </main>
  );
}
