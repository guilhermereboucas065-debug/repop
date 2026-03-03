import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { getSessionUserId } from "@/lib/session";
import { LogoutButton } from "@/components/logout-button";

export default async function DashboardPage() {
  const userId = getSessionUserId();

  if (!userId) {
    redirect("/login");
  }

  const user = await db.user.findUnique({
    where: { id: userId },
    include: { subscription: true },
  });

  if (!user) {
    redirect("/login");
  }

  return (
    <main>
      <section className="dashboard">
        <article className="panel">
          <h2>Bem-vindo{user.name ? `, ${user.name}` : ""}!</h2>
          <p className="text-muted">E-mail: {user.email}</p>
        </article>

        <article className="panel">
          <h3>Assinatura</h3>
          <p>Status: {user.subscription?.status ?? "Sem assinatura"}</p>
          <p>Plano: {user.subscription?.plan ?? "Nenhum"}</p>
          <p>
            Próxima ação: {user.subscription?.stripeCustomerId ? "Gerenciar cobrança" : "Conectar Stripe"}
          </p>
        </article>

        <article className="panel">
          <h3>Métricas iniciais</h3>
          <p>Usuários ativos: 1</p>
          <p>MRR estimado: R$ 0,00</p>
          <p>Trials ativos: {user.subscription?.status === "TRIAL" ? 1 : 0}</p>
        </article>

        <article className="panel">
          <h3>Conta</h3>
          <LogoutButton />
        </article>
      </section>
    </main>
  );
}
