import { NavLink } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext.jsx';
import { Home, ShoppingBag, Map, GraduationCap, Trophy, UserRound, Users, Route, Joystick } from 'lucide-react';

export default function BottomNav() {
  const { user } = useAuth();
  const isManager = user?.perfil === 'gerente';

  const repItems = [
    { to: '/', label: 'Home', icon: Home },
    { to: '/clientes', label: 'Clientes', icon: ShoppingBag },
    { to: '/roteiro', label: 'Roteiro', icon: Map },
    { to: '/treinamentos', label: 'Treinos', icon: GraduationCap },
    { to: '/games', label: 'Games', icon: Trophy },
    { to: '/perfil', label: 'Perfil', icon: UserRound },
  ];

  const managerItems = [
    { to: '/', label: 'Home', icon: Home },
    { to: '/gerente/representantes', label: 'Reps', icon: Users },
    { to: '/gerente/clientes', label: 'Clientes', icon: ShoppingBag },
    { to: '/gerente/roteiro', label: 'Roteiro', icon: Route },
    { to: '/gerente/games', label: 'Games', icon: Joystick },
    { to: '/perfil', label: 'Perfil', icon: UserRound },
  ];

  const navItems = isManager ? managerItems : repItems;

  return (
    <nav className="fixed inset-x-0 bottom-0 z-20 border-t border-slate-200 bg-white/95 backdrop-blur md:hidden">
      <div className="mx-auto flex max-w-2xl items-center justify-around px-2 py-2 text-[11px] font-medium text-slate-500">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `flex flex-col items-center gap-1 rounded-2xl px-2 py-2 transition ${
                isActive ? 'bg-emerald-50 text-emerald-600' : 'text-slate-500'
              }`
            }
          >
            <span className="text-lg" aria-hidden>
              <item.icon className="h-5 w-5" />
            </span>
            {item.label}
          </NavLink>
        ))}
      </div>
    </nav>
  );
}
