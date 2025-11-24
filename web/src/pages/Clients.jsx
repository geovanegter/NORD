import { useMemo, useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { clientsSummary, clientsList } from '@/data/mockData.js';

const filters = [
  { id: 'all', label: 'Todos' },
  { id: 'hot', label: 'Recomendados' },
  { id: 'inactive', label: 'Inativos' },
  { id: 'high', label: 'Alto potencial' },
  { id: 'drop', label: 'Em queda' },
  { id: 'near', label: 'Proximos' },
];

export default function ClientsPage() {
  const [search, setSearch] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedClient, setSelectedClient] = useState(null);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const paramValue = searchParams.get('search') ?? '';
    setSearch(paramValue);
  }, [searchParams]);

  const filteredClients = useMemo(() => {
    const term = search.toLowerCase();
    return clientsList.filter((client) => {
      const matchesSearch = [client.name, client.city, client.cnpj].some((field) => field.toLowerCase().includes(term));
      const matchesFilter =
        activeFilter === 'all'
          ? true
          : activeFilter === 'high'
          ? client.flag === 'hot' || client.flag === 'near'
          : client.flag === activeFilter;
      return matchesSearch && matchesFilter;
    });
  }, [search, activeFilter]);

  return (
    <div className="space-y-6">
      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <label className="block text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
          Buscar cliente
          <input
            className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm text-slate-900 outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-200"
            placeholder="Nome, CNPJ ou cidade"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
        </label>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {clientsSummary.map((card) => (
          <div key={card.id} className="rounded-3xl border border-slate-100 bg-white p-5 text-sm shadow">
            <p className="text-xs uppercase tracking-[0.18em] text-slate-400">{card.label}</p>
            <p className="mt-2 text-2xl font-semibold text-slate-900">{card.value}</p>
          </div>
        ))}
      </section>

      <div className="flex flex-wrap gap-2">
        {filters.map((filter) => (
          <button
            key={filter.id}
            type="button"
            onClick={() => setActiveFilter(filter.id)}
            className={`rounded-full px-4 py-2 text-sm font-medium transition ${
              activeFilter === filter.id ? 'bg-emerald-500 text-white' : 'bg-white text-slate-600 shadow'
            }`}
          >
            {filter.label}
          </button>
        ))}
      </div>

      <section className="grid gap-4 lg:grid-cols-2">
        {filteredClients.map((client) => (
          <article key={client.id} className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-emerald-200">
            <div className="flex items-center justify-between text-sm">
              <div>
                <p className="text-base font-semibold text-slate-900">{client.name}</p>
                <p className="text-slate-500">
                  {client.city} • {client.cnpj}
                </p>
              </div>
              <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">{client.status}</span>
            </div>
            <div className="mt-3 grid grid-cols-2 gap-3 text-xs text-slate-500">
              <div>
                <p className="font-semibold text-slate-900">{client.lastPurchase}</p>
                <p>Ultima compra</p>
              </div>
              <div>
                <p className="font-semibold text-slate-900">R$ {client.ticket}</p>
                <p>Ticket medio</p>
              </div>
              <div>
                <p className="font-semibold text-slate-900">{client.mixFocus}</p>
                <p>Mix foco</p>
              </div>
              <div>
                <p className="font-semibold text-slate-900">{client.history.evolution}</p>
                <p>Evolucao</p>
              </div>
            </div>
            <div className="mt-4 text-right">
              <button
                type="button"
                onClick={() => setSelectedClient(client)}
                className="rounded-full border border-slate-200 px-4 py-2 text-xs font-semibold text-slate-600 hover:border-emerald-300 hover:text-emerald-600"
              >
                Detalhar
              </button>
            </div>
          </article>
        ))}
      </section>

      {selectedClient ? (
        <div className="fixed inset-0 z-30 flex items-start justify-center bg-black/40 px-4 py-10">
          <section className="max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-3xl border border-slate-200 bg-white p-6 shadow-2xl">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Detalhe do cliente</p>
              <h2 className="text-2xl font-semibold text-slate-900">{selectedClient.name}</h2>
              <p className="text-sm text-slate-500">
                {selectedClient.city} • {selectedClient.cnpj}
              </p>
            </div>
            <button
              type="button"
              onClick={() => setSelectedClient(null)}
              className="rounded-full border border-slate-200 px-4 py-2 text-xs font-semibold text-slate-500"
            >
              Fechar
            </button>
          </div>

          <div className="mt-5 grid gap-4 md:grid-cols-4">
            <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4 text-sm">
              <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Ultima compra</p>
              <p className="mt-2 text-lg font-semibold text-slate-900">{selectedClient.lastPurchase}</p>
            </div>
            <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4 text-sm">
              <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Ticket medio</p>
              <p className="mt-2 text-lg font-semibold text-slate-900">R$ {selectedClient.ticket}</p>
            </div>
            <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4 text-sm">
              <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Mix foco</p>
              <p className="mt-2 text-lg font-semibold text-slate-900">{selectedClient.mixFocus}</p>
            </div>
            <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4 text-sm">
              <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Status IA</p>
              <p className="mt-2 text-lg font-semibold text-slate-900">{selectedClient.status}</p>
            </div>
          </div>

          <div className="mt-6 rounded-3xl border border-emerald-100 bg-emerald-50 p-5 text-sm text-slate-700">
            <p className="text-xs uppercase tracking-[0.18em] text-emerald-600">Insight da IA</p>
            <p className="mt-2 text-base font-semibold text-slate-900">{selectedClient.insights}</p>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-3 text-sm text-slate-600">
            <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4">
              <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Segmentacao</p>
              <p className="mt-2 text-lg font-semibold text-slate-900">{selectedClient.segment}</p>
              <p className="text-xs text-slate-500">{selectedClient.cluster}</p>
            </div>
            <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4">
              <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Tempo de cliente</p>
              <p className="mt-2 text-lg font-semibold text-slate-900">{selectedClient.since}</p>
            </div>
            <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4">
              <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Cadastro</p>
              <p className="mt-2 text-lg font-semibold text-slate-900">{selectedClient.cnpj}</p>
            </div>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-3 text-sm text-slate-600">
            <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4">
              <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Valor no mes</p>
              <p className="mt-2 text-lg font-semibold text-slate-900">{selectedClient.history.monthValue}</p>
            </div>
            <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4">
              <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Pedidos recentes</p>
              <ul className="mt-2 space-y-1 text-slate-600">
                {selectedClient.history.lastOrders.map((order) => (
                  <li key={order}>{order}</li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4">
              <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Evolucao 3 meses</p>
              <p className="mt-2 text-lg font-semibold text-slate-900">{selectedClient.history.evolution}</p>
            </div>
          </div>

          <div className="mt-6 rounded-2xl border border-slate-100 bg-slate-50 p-4 text-sm text-slate-600">
            <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Compras por colecao</p>
            <div className="mt-3 overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="text-slate-500">
                  <tr>
                    <th className="py-2">Colecao</th>
                    <th className="py-2">Valor</th>
                  </tr>
                </thead>
                <tbody>
                  {(selectedClient.collections ?? []).map((collection) => (
                    <tr key={collection.id} className="border-t border-slate-100">
                      <td className="py-2 text-slate-900">{collection.season}</td>
                      <td className="py-2 font-semibold text-slate-900">{collection.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap gap-3 text-sm font-semibold">
            <button className="rounded-2xl border border-slate-200 px-4 py-2 text-slate-600">Adicionar ao roteiro</button>
            <button className="rounded-2xl border border-slate-200 px-4 py-2 text-slate-600">Ver SKUs foco</button>
          </div>
          </section>
        </div>
      ) : null}
    </div>
  );
}
