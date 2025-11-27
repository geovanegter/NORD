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


export default function Sidebar() {
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

  return (
    <aside
      className="hidden min-h-screen w-64 flex-col justify-between text-white md:flex"
      style={{
        backgroundColor: '#1c1c1e',
        borderRight: '1px solid rgba(255, 255, 255, 0.1)',
        fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", system-ui, sans-serif',
      }}
    >
      <div className="px-5 py-6">
        <div className="mb-8 flex items-center justify-center">
          <img src={nordLogo} alt="Nord" className="h-16 w-auto" />
        </div>
        <nav className="space-y-1 text-sm font-semibold">
          {navLinks.map((link) => {
            const Icon = link.icon;
            return (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-xl px-4 py-3 transition-all duration-200 ${
                    isActive
                      ? 'bg-white/10 text-white shadow-lg'
                      : 'text-gray-400 hover:bg-white/5 hover:text-white'
                  }`
                }
              >
                <Icon className="h-5 w-5" strokeWidth={2.5} />
                <span className="font-medium">{link.label}</span>
              </NavLink>
            );
          })}
        </nav>
      </div>
      <div className="mx-5 mb-6 space-y-3 rounded-2xl border border-white/10 p-4 text-sm" style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)' }}>
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-wider text-gray-500">Perfil</p>
          <p className="mt-1 text-base font-semibold text-white">{user?.name ?? 'Representante'}</p>
          <p className="text-xs text-gray-400">{user?.region ?? 'Squad Litoral'}</p>
          <div className="mt-3 rounded-xl px-3 py-2 text-xs font-medium text-white" style={{ background: 'linear-gradient(135deg, #fa114f 0%, #92e82a 100%)' }}>
            {isManager ? 'Priorize reps em risco hoje' : 'Foque em clientes quentes hoje'}
          </div>
        </div>
      </div>
    </aside>
  );
}
