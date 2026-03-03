import './globals.css';
import Link from 'next/link';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>
        <header className="container">
          <div className="card" style={{ marginBottom: 24 }}>
            <Link href="/"><strong>LexFlow SaaS</strong></Link>
          </div>
        </header>
        <main className="container">{children}</main>
      </body>
    </html>
  );
}
