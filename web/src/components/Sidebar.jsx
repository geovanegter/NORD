import { NavLink } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext.jsx';
import nordLogo from '@/assets/nord-logo-white.png';
import gradientTexture from '@/assets/gradient.jpg';
import {
  Home,
  ShoppingBag,
  Map,
  GraduationCap,
  Trophy,
  UserRound,
  Users,
  Route,
  Joystick,
} from 'lucide-react';

const gradientOverlay =
  'linear-gradient(135deg, rgba(6, 18, 40, 0.98) 0%, rgba(7, 52, 115, 0.93) 55%, rgba(7, 97, 171, 0.9) 100%)';

export default function Sidebar({ isDarkMode, onToggleTheme }) {
  const { user } = useAuth();
  const isManager = user?.perfil === 'gerente';

  const repLinks = [
    { to: '/', label: 'Home', icon: Home },
    { to: '/clientes', label: 'Clientes', icon: ShoppingBag },
    { to: '/roteiro', label: 'Roteiro', icon: Map },
    { to: '/treinamentos', label: 'Treinamentos', icon: GraduationCap },
    { to: '/games', label: 'Games', icon: Trophy },
    { to: '/perfil', label: 'Perfil', icon: UserRound },
  ];

  const managerLinks = [
    { to: '/', label: 'Home', icon: Home },
    { to: '/gerente/representantes', label: 'Representantes', icon: Users },
    { to: '/gerente/clientes', label: 'Clientes', icon: ShoppingBag },
    { to: '/gerente/roteiro', label: 'Roteiro tático', icon: Route },
    { to: '/gerente/games', label: 'Games equipe', icon: Joystick },
    { to: '/perfil', label: 'Perfil', icon: UserRound },
  ];

  const navLinks = isManager ? managerLinks : repLinks;
  const inactiveLink = isDarkMode ? 'text-white/80 hover:bg-white/10' : 'text-slate-50/90 hover:bg-black/10';

  return (
    <aside
      className="sidebar-quicksand hidden min-h-screen w-64 flex-col justify-between text-white shadow-2xl md:flex"
      style={{
        backgroundImage: `${gradientOverlay}, url(${gradientTexture})`,
        backgroundSize: '220% 220%, cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center top',
        borderRight: isDarkMode ? '1px solid rgba(15,23,42,0.6)' : '1px solid rgba(15,23,42,0.2)',
      }}
    >
      <div className="px-6 py-8">
        <div className="mb-10 flex items-center justify-center">
          <img src={nordLogo} alt="Nord" className="h-20 w-auto drop-shadow-[0_10px_25px_rgba(0,0,0,0.45)]" />
        </div>
        <nav className="space-y-2 text-sm font-semibold">
          {navLinks.map((link) => {
            const Icon = link.icon;
            return (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-xl px-4 py-3 transition ${
                    isActive ? 'bg-white text-slate-900 shadow' : inactiveLink
                  }`
                }
              >
                <Icon className="h-4 w-4" />
                {link.label}
              </NavLink>
            );
          })}
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
