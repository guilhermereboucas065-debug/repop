import Link from "next/link";

export default function HomePage() {
  return (
    <main>
      <section className="card">
        <h1>SaaS Starter</h1>
        <p className="text-muted">
          Base pronta com autenticação inicial, PostgreSQL e estrutura para assinatura.
        </p>
        <p>
          <Link href="/login">Entrar</Link> ou <Link href="/cadastro">criar conta</Link>
        </p>
      </section>
    </main>
  );
}
