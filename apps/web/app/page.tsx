import Link from 'next/link';

export default function Home() {
  return (
    <div className="grid">
      <section className="card">
        <h1>Plataforma de triagem para escritórios de advocacia</h1>
        <p>
          Centralize captação de clientes, formulários de triagem e geração automática de resumos de caso
          em um único SaaS escalável.
        </p>
        <div style={{ display: 'flex', gap: 12 }}>
          <Link href="/register"><button>Começar agora</button></Link>
          <Link href="/login"><button className="secondary">Entrar</button></Link>
        </div>
      </section>

      <section className="card">
        <h2>Recursos principais</h2>
        <ul>
          <li>Cadastro e login de advogados com autenticação JWT.</li>
          <li>Dashboard com gestão de formulários de triagem.</li>
          <li>Página pública para coleta de respostas dos clientes.</li>
          <li>Resumo automático do caso com base nas respostas.</li>
          <li>Base PostgreSQL e estrutura pronta para assinatura futura.</li>
        </ul>
      </section>
    </div>
  );
}
