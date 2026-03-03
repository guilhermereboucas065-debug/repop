'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { AuthGuard } from '../../../../components/AuthGuard';
import { apiFetch } from '../../../../lib/api';

type Question = { id: string; label: string; type: 'text' | 'textarea' | 'date' | 'select' };

export default function NewFormPage() {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [questions, setQuestions] = useState<Question[]>([
    { id: crypto.randomUUID(), label: 'Descreva o problema jurídico', type: 'textarea' }
  ]);

  function updateQuestion(index: number, next: Partial<Question>) {
    const clone = [...questions];
    clone[index] = { ...clone[index], ...next };
    setQuestions(clone);
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const token = localStorage.getItem('token')!;

    await apiFetch('/forms', {
      method: 'POST',
      body: JSON.stringify({ title, description, questions })
    }, token);

    router.push('/dashboard');
  }

  return (
    <AuthGuard>
      <section className="card">
        <h1>Novo formulário de triagem</h1>
        <form onSubmit={onSubmit}>
          <label>Título</label>
          <input value={title} onChange={(e) => setTitle(e.target.value)} required />

          <label>Descrição</label>
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} />

          <h2>Perguntas</h2>
          {questions.map((question, index) => (
            <div className="card" key={question.id}>
              <label>Pergunta</label>
              <input
                value={question.label}
                onChange={(e) => updateQuestion(index, { label: e.target.value })}
                required
              />
              <label>Tipo</label>
              <select
                value={question.type}
                onChange={(e) => updateQuestion(index, { type: e.target.value as Question['type'] })}
              >
                <option value="text">Texto curto</option>
                <option value="textarea">Texto longo</option>
                <option value="date">Data</option>
                <option value="select">Seleção</option>
              </select>
            </div>
          ))}

          <button
            type="button"
            className="secondary"
            onClick={() => setQuestions([...questions, { id: crypto.randomUUID(), label: '', type: 'text' }])}
            style={{ marginRight: 8 }}
          >
            Adicionar pergunta
          </button>
          <button type="submit">Salvar formulário</button>
        </form>
      </section>
    </AuthGuard>
  );
}
