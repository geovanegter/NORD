import { profileInfo, managerProfile } from '@/data/mockData.js';
import { useAuth } from '@/context/AuthContext.jsx';

export default function ProfilePage() {
  const { user, signOut } = useAuth();
  const isManager = user?.perfil === 'gerente';
  const info = isManager
    ? {
        name: managerProfile.name,
        region: managerProfile.region,
        companies: managerProfile.squads,
        permissions: managerProfile.permissions,
        policies: managerProfile.policies,
      }
    : profileInfo;

  return (
    <div className="space-y-6">
      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500 text-2xl font-bold text-white">
            {info.name.slice(0, 1)}
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Perfil</p>
            <h1 className="text-2xl font-semibold text-slate-900">{info.name}</h1>
            <p className="text-sm text-slate-500">{isManager ? user?.region : `Codigo ${profileInfo.code}`}</p>
          </div>
        </div>
      </section>

      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <p className="text-xs uppercase tracking-[0.18em] text-slate-400">
          {isManager ? 'Região e squads' : 'Regiao e carteira'}
        </p>
        <p className="mt-2 text-sm text-slate-600">{info.region}</p>
        <div className="mt-3 flex flex-wrap gap-2 text-sm text-slate-600">
          {info.companies.map((company) => (
            <span key={company} className="rounded-full border border-slate-200 px-3 py-1">
              {company}
            </span>
          ))}
        </div>
      </section>

      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Permissoes</p>
        <ul className="mt-3 space-y-2 text-sm text-slate-600">
          {info.permissions.map((permission) => (
            <li key={permission} className="rounded-2xl border border-slate-100 bg-slate-50 px-4 py-3">
              {permission}
            </li>
          ))}
        </ul>
      </section>

      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm text-sm text-slate-600">
        <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Termos e privacidade</p>
        <p className="mt-2">
          Leia nossos termos e política para saber como usamos seus dados. {isManager ? 'Acesse também políticas comerciais.' : ''}
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          {(info.policies ?? ['Termos de uso', 'Privacidade']).map((doc) => (
            <button key={doc} className="rounded-2xl border border-slate-200 px-4 py-2 text-slate-600">
              {doc}
            </button>
          ))}
        </div>
      </section>

      <button
        onClick={signOut}
        className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm font-semibold text-rose-600"
      >
        Sair
      </button>
    </div>
  );
}
