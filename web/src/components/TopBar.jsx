import { useAuth } from '@/context/AuthContext.jsx';

export default function TopBar() {
  const { user } = useAuth();

  return (
    <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-4xl items-center justify-between px-4 py-3">
        <div>
          <p className="text-[11px] uppercase tracking-[0.4em] text-slate-400">Nord Kids</p>
          <p className="text-base font-semibold text-slate-900">{user?.name ?? 'Representante'}</p>
          <p className="text-xs text-slate-500">{user?.region ?? 'Squad Litoral'}</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            className="rounded-full border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-600 transition hover:border-nord-accent hover:text-nord-accent"
          >
            ?? IA
          </button>
          <button
            type="button"
            className="rounded-full border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-600 transition hover:border-nord-accent hover:text-nord-accent"
          >
            ?? Assistente
          </button>
        </div>
      </div>
    </header>
  );
}
