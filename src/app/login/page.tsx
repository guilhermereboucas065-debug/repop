import Link from "next/link";
import { redirect } from "next/navigation";
import { AuthForm } from "@/components/auth-form";
import { getSessionUserId } from "@/lib/session";

export default function LoginPage() {
  const userId = getSessionUserId();

  if (userId) {
    redirect("/dashboard");
  }

  return (
    <main>
      <section className="card">
        <h1>Login</h1>
        <p className="text-muted">Acesse sua conta SaaS.</p>
        <AuthForm mode="login" />
        <p>
          Ainda não tem conta? <Link href="/cadastro">Cadastre-se</Link>
        </p>
      </section>
    </main>
  );
}
