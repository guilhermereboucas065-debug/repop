'use client';

import { useEffect, useState } from 'react';
import { apiFetch } from '../../../lib/api';

type Form = {
  id: string;
  title: string;
  description?: string;
  slug: string;
  questions: { id: string; label: string; type: 'text' | 'textarea' | 'date' | 'select' }[];
};

export default function PublicFormPage({ params }: { params: { slug: string } }) {
  const [form, setForm] = useState<Form | null>(null);
  const [clientName, setClientName] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [summary, setSummary] = useState('');

  useEffect(() => {
    apiFetch(`/forms/public/${params.slug}`).then(setForm).catch(() => setForm(null));
  }, [params.slug]);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const data = await apiFetch(`/public/forms/${params.slug}/responses`, {
      method: 'POST',
      body: JSON.stringify({ clientName, clientEmail, answers })
    });

    setSummary(data.summary);
  }

  if (!form) return <section className="card"><p>Carregando formulário...</p></section>;

  return (
    <section className="card">
      <h1>{form.title}</h1>
      <p>{form.description}</p>

      <form onSubmit={onSubmit}>
        <label>Nome completo</label>
        <input value={clientName} onChange={(e) => setClientName(e.target.value)} required />

        <label>E-mail</label>
        <input type="email" value={clientEmail} onChange={(e) => setClientEmail(e.target.value)} required />

        {form.questions.map((question) => (
          <div key={question.id}>
            <label>{question.label}</label>
            {question.type === 'textarea' ? (
              <textarea
                value={answers[question.id] || ''}
                onChange={(e) => setAnswers({ ...answers, [question.id]: e.target.value })}
              />
            ) : (
              <input
                type={question.type === 'date' ? 'date' : 'text'}
                value={answers[question.id] || ''}
                onChange={(e) => setAnswers({ ...answers, [question.id]: e.target.value })}
              />
            )}
          </div>
        ))}

        <button type="submit">Enviar triagem</button>
      </form>

      {summary && (
        <div className="card" style={{ marginTop: 16 }}>
          <h2>Resumo automático do caso</h2>
          <pre style={{ whiteSpace: 'pre-wrap' }}>{summary}</pre>
        </div>
      )}
    </section>
  );
}
