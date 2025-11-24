import { useState } from 'react';
import { formSuggestedClients, formProductLines } from '@/data/mockData.js';

export default function RegisterPage() {
  const [form, setForm] = useState({ client: '', value: '', line: '', notes: '' });
  const [message, setMessage] = useState('');

  const handleChange = (field) => (event) => {
    setForm((prev) => ({ ...prev, [field]: event.target.value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!form.client || !form.value) {
      setMessage('Informe cliente e valor.');
      return;
    }
    setMessage('Venda registrada! Meta atualizada.');
    setForm({ client: '', value: '', line: '', notes: '' });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div>
        <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Registrar</p>
        <h2 className="text-2xl font-semibold text-slate-900">Nova venda/visita</h2>
        <p className="text-sm text-slate-500">Preencha em ate 5 segundos.</p>
      </div>
      <label className="block text-sm font-medium text-slate-600">
        Cliente
        <input
          list="client-suggestions"
          value={form.client}
          onChange={handleChange('client')}
          className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm text-slate-900 outline-none focus:border-nord-accent focus:ring-2 focus:ring-nord-accent/20"
          placeholder="Ex.: Planeta Kids"
        />
        <datalist id="client-suggestions">
          {formSuggestedClients.map((name) => (
            <option key={name} value={name} />
          ))}
        </datalist>
      </label>
      <label className="block text-sm font-medium text-slate-600">
        Valor (R$)
        <input
          type="number"
          value={form.value}
          onChange={handleChange('value')}
          className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm text-slate-900 outline-none focus:border-nord-accent focus:ring-2 focus:ring-nord-accent/20"
          placeholder="1800"
        />
      </label>
      <label className="block text-sm font-medium text-slate-600">
        Linha foco
        <select
          value={form.line}
          onChange={handleChange('line')}
          className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm text-slate-900 outline-none focus:border-nord-accent focus:ring-2 focus:ring-nord-accent/20"
        >
          <option value="">Selecione</option>
          {formProductLines.map((line) => (
            <option key={line} value={line}>
              {line}
            </option>
          ))}
        </select>
      </label>
      <label className="block text-sm font-medium text-slate-600">
        Observacoes
        <textarea
          value={form.notes}
          onChange={handleChange('notes')}
          className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm text-slate-900 outline-none focus:border-nord-accent focus:ring-2 focus:ring-nord-accent/20"
          rows="3"
          placeholder="Ex.: pediu cores candy"
        />
      </label>
      {message ? <p className="text-sm font-semibold text-emerald-600">{message}</p> : null}
      <button
        type="submit"
        className="w-full rounded-2xl bg-gradient-to-r from-emerald-500 to-cyan-500 py-3 text-center text-sm font-semibold text-white"
      >
        Salvar em 1 toque
      </button>
    </form>
  );
}
