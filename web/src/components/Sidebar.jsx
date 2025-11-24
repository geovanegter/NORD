import { NavLink } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext.jsx';
import nordLogo from '/nord-logo.png';

export default function Sidebar() {
  const { user } = useAuth();
  const isManager = user?.perfil === 'gerente';

  const repLinks = [
    { to: '/', label: 'Home', icon: '🏠' },
    { to: '/clientes', label: 'Clientes', icon: '🧾' },
    { to: '/roteiro', label: 'Roteiro', icon: '🧭' },
    { to: '/treinamentos', label: 'Treinamentos', icon: '🎥' },
    { to: '/games', label: 'Games', icon: '🏅' },
    { to: '/perfil', label: 'Perfil', icon: '👤' },
  ];

  const managerLinks = [
    { to: '/', label: 'Home', icon: '🏠' },
    { to: '/gerente/representantes', label: 'Representantes', icon: '👥' },
    { to: '/gerente/clientes', label: 'Clientes', icon: '🏢' },
    { to: '/gerente/roteiro', label: 'Roteiro tático', icon: '🗺️' },
    { to: '/gerente/games', label: 'Games equipe', icon: '🏆' },
    { to: '/perfil', label: 'Perfil', icon: '👤' },
  ];

  const navLinks = isManager ? managerLinks : repLinks;

  return (
    <aside className="hidden min-h-screen w-64 flex-col justify-between border-r border-slate-200 bg-slate-900 text-white md:flex">
      <div className="px-6 py-8">
        <div className="mb-10 flex items-center justify-center">
          <img src={nordLogo} alt="Nord" className="h-12 w-auto rounded-xl shadow-lg" />
        </div>
        <nav className="space-y-2 text-sm font-semibold">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-xl px-4 py-3 transition ${
                  isActive ? 'bg-emerald-500 text-slate-900' : 'text-slate-300 hover:bg-slate-800'
                }`
              }
            >
              <span className="text-lg">{link.icon}</span>
              {link.label}
            </NavLink>
          ))}
        </nav>
      </div>
      <div className="mx-6 mb-8 rounded-2xl border border-slate-700 bg-slate-800 p-4 text-sm">
        <p className="text-xs uppercase text-slate-400">Perfil</p>
        <p className="text-base font-semibold text-white">{user?.name ?? 'Representante'}</p>
        <p className="text-xs text-slate-400">{user?.region ?? 'Squad Litoral'}</p>
        <div className="mt-4 rounded-xl bg-emerald-500/20 px-3 py-2 text-emerald-200">
          {isManager ? '🧭 Priorize reps em risco hoje.' : '🔥 Foque em clientes quentes hoje.'}
        </div>
      </div>
    </aside>
  );
}
