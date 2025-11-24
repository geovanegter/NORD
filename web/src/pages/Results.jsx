import { resultOverview, focusProducts } from '@/data/mockData.js';
import ProgressBar from '@/components/ProgressBar.jsx';

export default function ResultsPage() {
  const monthProgress = resultOverview.month.current / resultOverview.month.target;
  const weekProgress = resultOverview.week.current / resultOverview.week.target;
  const clientsPercent = resultOverview.clients.attended / resultOverview.clients.planned;

  return (
    <div className="space-y-6">
      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Assistente IA</p>
        <h2 className="mt-2 text-xl font-semibold text-slate-900">{resultOverview.aiMessage}</h2>
        <p className="text-sm text-slate-600">{resultOverview.mixMessage}</p>
      </section>

      <section className="grid gap-4">
        <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
          <h3 className="text-sm font-semibold text-slate-500">Meta do mes</h3>
          <p className="text-3xl font-semibold text-slate-900">
            R$ {resultOverview.month.current.toLocaleString('pt-BR')} / {resultOverview.month.target.toLocaleString('pt-BR')}
          </p>
          <ProgressBar value={monthProgress} color="#0ea5e9" />
        </div>
        <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
          <h3 className="text-sm font-semibold text-slate-500">Meta da semana</h3>
          <p className="text-2xl font-semibold text-slate-900">
            R$ {resultOverview.week.current.toLocaleString('pt-BR')} / {resultOverview.week.target.toLocaleString('pt-BR')}
          </p>
          <ProgressBar value={weekProgress} color="#22c55e" />
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2">
        <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
          <h3 className="text-sm font-semibold text-slate-500">Ticket medio</h3>
          <p className="text-3xl font-semibold text-slate-900">R$ {resultOverview.ticket.current.toLocaleString('pt-BR')}</p>
          <p className="text-sm text-slate-500">Meta: R$ {resultOverview.ticket.goal.toLocaleString('pt-BR')}</p>
        </div>
        <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
          <h3 className="text-sm font-semibold text-slate-500">Clientes atendidos</h3>
          <p className="text-3xl font-semibold text-slate-900">
            {resultOverview.clients.attended} / {resultOverview.clients.planned}
          </p>
          <ProgressBar value={clientsPercent} color="#f97316" />
        </div>
      </section>

      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Produtos foco</p>
            <h3 className="text-xl font-semibold text-slate-900">Execute o mix recomendado</h3>
          </div>
        </div>
        <div className="mt-4 space-y-4">
          {focusProducts.map((product) => (
            <div key={product.id} className="rounded-2xl border border-slate-100 bg-slate-50 p-4">
              <div className="flex items-center justify-between text-sm">
                <p className="font-semibold text-slate-900">{product.name}</p>
                <p className="text-slate-500">Meta {product.target}</p>
              </div>
              <ProgressBar value={product.progress} color="#6366f1" />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
