import { useState } from 'react';
import { createCategory } from '../Services/CategoryApis';

export default function CategoryForm({ onCreated }) {
  const [name, setName] = useState('');
  const [type, setType] = useState('expense');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  async function submit(event) {
    event.preventDefault();
    setError(''); setSaving(true);
    try {
      await createCategory(name.trim(), type);
      setName('');
      await onCreated?.();
    } catch (err) { setError(err.message || 'Não foi possível criar a categoria.'); }
    finally { setSaving(false); }
  }

  return (
    <form onSubmit={submit} className="space-y-5">
      <div className="space-y-2"><label htmlFor="category-name" className="block text-sm font-medium">Nome da categoria</label>
        <input id="category-name" autoFocus required maxLength={80} value={name} onChange={e => setName(e.target.value)} placeholder="Ex.: Alimentação" className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-emerald-600" /></div>
      <div className="space-y-2"><label htmlFor="category-type" className="block text-sm font-medium">Tipo</label>
        <select id="category-type" value={type} onChange={e => setType(e.target.value)} className="w-full rounded-xl border border-slate-300 px-4 py-3"><option value="expense">Despesa</option><option value="income">Receita</option></select></div>
      {error && <p role="alert" className="text-sm text-red-600">{error}</p>}
      <button disabled={saving || !name.trim()} className="w-full rounded-xl bg-emerald-600 px-4 py-3 font-semibold text-white hover:bg-emerald-700 disabled:opacity-50">{saving ? 'Salvando...' : 'Criar categoria'}</button>
    </form>
  );
}
