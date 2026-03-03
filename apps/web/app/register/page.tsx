'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { apiFetch } from '../../lib/api';

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({ name: '', officeName: '', email: '', password: '' });
  const [error, setError] = useState('');

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');

    try {
      const data = await apiFetch('/auth/register', {
        method: 'POST',
        body: JSON.stringify(form)
      });

      localStorage.setItem('token', data.token);
      router.push('/dashboard');
    } catch (err) {
      setError((err as Error).message);
    }
  }

  return (
    <section className="card">
      <h1>Criar conta de advogado</h1>
      <form onSubmit={onSubmit}>
        <label>Nome</label>
        <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />

        <label>Escritório</label>
        <input value={form.officeName} onChange={(e) => setForm({ ...form, officeName: e.target.value })} />

        <label>E-mail</label>
        <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />

        <label>Senha</label>
        <input type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} required />

        {error && <p style={{ color: '#dc2626' }}>{error}</p>}
        <button type="submit">Cadastrar</button>
      </form>
    </section>
  );
}
