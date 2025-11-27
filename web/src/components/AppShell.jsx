import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar.jsx';
import BottomNav from './BottomNav.jsx';

export default function AppShell() {
  return (
    <div className="flex min-h-screen" style={{ backgroundColor: '#000000' }}>
      <Sidebar />
      <div className="flex w-full flex-col">
        <main className="flex-1 px-4 py-6 md:px-10 md:py-10">
          <Outlet />
        </main>
        <BottomNav />
      </div>
    </div>
  );
}
