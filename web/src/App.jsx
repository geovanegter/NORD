import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { AuthProvider, useAuth } from '@/context/AuthContext.jsx';
import LoginPage from '@/pages/Login.jsx';
import HomePage from '@/pages/Home.jsx';
import ClientsPage from '@/pages/Clients.jsx';
import RoutePage from '@/pages/Roteiro.jsx';
import GamesPage from '@/pages/Games.jsx';
import ProfilePage from '@/pages/Profile.jsx';
import TrainingPage from '@/pages/Training.jsx';
import ManagerRepresentativesPage from '@/pages/ManagerRepresentatives.jsx';
import ManagerClientsPage from '@/pages/ManagerClients.jsx';
import ManagerRoutePage from '@/pages/ManagerRoute.jsx';
import ManagerGamesPage from '@/pages/ManagerGames.jsx';
import AppShell from '@/components/AppShell.jsx';

function PrivateRoute() {
  const { user } = useAuth();
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return <AppShell />;
}

function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route element={<PrivateRoute />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/clientes" element={<ClientsPage />} />
        <Route path="/roteiro" element={<RoutePage />} />
        <Route path="/treinamentos" element={<TrainingPage />} />
        <Route path="/games" element={<GamesPage />} />
        <Route path="/perfil" element={<ProfilePage />} />
        <Route path="/gerente/representantes" element={<ManagerRepresentativesPage />} />
        <Route path="/gerente/clientes" element={<ManagerClientsPage />} />
        <Route path="/gerente/roteiro" element={<ManagerRoutePage />} />
        <Route path="/gerente/games" element={<ManagerGamesPage />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </AuthProvider>
  );
}
