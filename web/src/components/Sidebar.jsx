import { NavLink } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext.jsx';

const nordLogo = '/nord-logo-white.png';

export default function Sidebar({ isDarkMode, onToggleTheme }) {
  const { user } = useAuth();
  const isManager = user?.perfil === 'gerente';

  const repLinks = [
    { to: '/', label: 'Home', icon: '🏠' },
    { to: '/clientes', label: 'Clientes', icon: '🛍️' },
    { to: '/roteiro', label: 'Roteiro', icon: '🗺️' },
    { to: '/treinamentos', label: 'Treinamentos', icon: '🎬' },
    { to: '/games', label: 'Games', icon: '🏆' },
    { to: '/perfil', label: 'Perfil', icon: '👤' },
  ];

  const managerLinks = [
    { to: '/', label: 'Home', icon: '🏠' },
    { to: '/gerente/representantes', label: 'Representantes', icon: '👥' },
    { to: '/gerente/clientes', label: 'Clientes', icon: '🛍️' },
    { to: '/gerente/roteiro', label: 'Roteiro tático', icon: '🧭' },
    { to: '/gerente/games', label: 'Games equipe', icon: '🎯' },
    { to: '/perfil', label: 'Perfil', icon: '👤' },
  ];

  const navLinks = isManager ? managerLinks : repLinks;
  const inactiveLink = isDarkMode ? 'text-white/70 hover:bg-white/10' : 'text-slate-50/80 hover:bg-black/10';

  return (
    <aside
      className="sidebar-quicksand hidden min-h-screen w-64 flex-col justify-between text-white shadow-2xl md:flex"
      style={{
        backgroundImage: "url('/gradient.jpg')",
        backgroundSize: '160% 160%',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center top',
        borderRight: isDarkMode ? '1px solid rgba(15,23,42,0.6)' : '1px solid rgba(15,23,42,0.2)',
      }}
    >
      <div className="px-6 py-8">
        <div className="mb-10 flex items-center justify-center">
          <img src={nordLogo} alt="Nord" className="h-20 w-auto shadow-xl" />
        </div>
        <nav className="space-y-2 text-sm font-semibold">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-xl px-4 py-3 transition ${
                  isActive ? 'bg-white text-slate-900 shadow' : inactiveLink
                }`
              }
            >
              <span className="text-lg">{link.icon}</span>
              {link.label}
            </NavLink>
          ))}
        </nav>
      </div>
      <div className="mx-6 mb-8 space-y-4 rounded-2xl border border-white/20 bg-white/10 p-4 text-sm backdrop-blur-md">
        <div>
          <p className="text-xs uppercase text-white/70">Perfil</p>
          <p className="text-base font-semibold text-white">{user?.name ?? 'Representante'}</p>
          <p className="text-xs text-white/70">{user?.region ?? 'Squad Litoral'}</p>
          <div className="mt-4 rounded-xl bg-white/20 px-3 py-2 text-white">
            {isManager ? '🚨 Priorize reps em risco hoje.' : '🔥 Foque em clientes quentes hoje.'}
          </div>
        </div>
        <button
          type="button"
          onClick={onToggleTheme}
          className="flex w-full items-center justify-between rounded-xl border border-white/30 px-3 py-2 text-xs font-semibold text-white transition hover:border-white"
        >
          <span>{isDarkMode ? '☀️ Modo claro' : '🌙 Modo escuro'}</span>
          <span
            className={`relative inline-flex h-5 w-10 items-center rounded-full ${
              isDarkMode ? 'bg-emerald-400' : 'bg-slate-500'
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                isDarkMode ? 'translate-x-5' : 'translate-x-1'
              }`}
            />
          </span>
        </button>
      </div>
    </aside>
  );
}
