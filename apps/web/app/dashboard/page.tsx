'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { AuthGuard } from '../../components/AuthGuard';
import { apiFetch } from '../../lib/api';

type Form = { id: string; title: string; slug: string; createdAt: string };
type Response = { id: string; summary: string; clientName: string; form: { title: string; slug: string } };

export default function DashboardPage() {
  const [forms, setForms] = useState<Form[]>([]);
  const [responses, setResponses] = useState<Response[]>([]);

  useEffect(() => {
    const token = localStorage.getItem('token')!;
    apiFetch('/forms', undefined, token).then(setForms).catch(() => undefined);
    apiFetch('/my-responses', undefined, token).then(setResponses).catch(() => undefined);
  }, []);

  return (
    <AuthGuard>
      <div className="grid">
        <section className="card">
          <h1>Dashboard</h1>
          <Link href="/dashboard/forms/new"><button>Novo formulário de triagem</button></Link>
        </section>

        <section className="card">
          <h2>Formulários criados</h2>
          {forms.length === 0 ? <p>Nenhum formulário ainda.</p> : (
            <ul>
              {forms.map((form) => (
                <li key={form.id}>
                  {form.title} — link público: <a href={`/f/${form.slug}`}>/f/{form.slug}</a>
                </li>
              ))}
            </ul>
          )}
        </section>

        <section className="card">
          <h2>Últimos resumos automáticos</h2>
          {responses.length === 0 ? <p>Nenhuma resposta recebida.</p> : (
            <ul>
              {responses.map((response) => (
                <li key={response.id}>
                  <strong>{response.clientName}</strong> ({response.form.title})
                  <pre style={{ whiteSpace: 'pre-wrap' }}>{response.summary}</pre>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </AuthGuard>
  );
}
