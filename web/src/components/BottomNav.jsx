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
    <nav className="fixed inset-x-0 bottom-0 z-20 border-t border-white/10 md:hidden" style={{ backgroundColor: 'rgba(28, 28, 30, 0.85)', backdropFilter: 'blur(20px) saturate(180%)' }}>
      <div className="mx-auto flex max-w-2xl items-center justify-around px-2 py-2 text-[10px] font-medium text-gray-400">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `flex flex-col items-center gap-1.5 rounded-2xl px-3 py-2.5 transition-all duration-200 ${
                isActive ? 'bg-white/10 text-white' : 'text-gray-400'
              }`
            }
          >
            <item.icon className="h-6 w-6" strokeWidth={2.5} />
            <span className="font-semibold">{item.label}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  );
}
