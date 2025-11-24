import { createContext, useContext, useMemo, useState } from 'react';

const fakeDirectory = {
  'gestor@nord.com': {
    id: '1',
    name: 'Mariana Castro',
    perfil: 'gestor',
    region: 'Nordeste',
    password: 'nord123',
  },
  'representante@nord.com': {
    id: '2',
    name: 'Eduarda Lima',
    perfil: 'representante',
    region: 'Recife e RMR',
    password: 'nord123',
  },
  'gerente@nord.com': {
    id: '3',
    name: 'Clara Monteiro',
    perfil: 'gerente',
    region: 'Brasil Nordeste',
    squad: 'Força de Vendas Nordeste',
    password: 'nord456',
  },
};

const AuthContext = createContext(undefined);

function wait(ms = 700) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState(null);

  const signIn = async (email, password) => {
    setPending(true);
    setError(null);
    try {
      await wait();
      const normalized = email?.toLowerCase();
      const authRecord = fakeDirectory[normalized];
      const expectedPassword = authRecord?.password ?? 'nord123';
      if (!authRecord || password !== expectedPassword) {
        throw new Error(
          'Credenciais inválidas. Use representante@nord.com / nord123 ou gerente@nord.com / nord456.',
        );
      }
      setUser(authRecord);
      return authRecord;
    } catch (err) {
      setError(err.message ?? 'Falha ao autenticar');
      throw err;
    } finally {
      setPending(false);
    }
  };

  const signOut = () => setUser(null);

  const value = useMemo(
    () => ({ user, pending, error, signIn, signOut }),
    [user, pending, error],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuth precisa estar dentro de AuthProvider');
  }
  return ctx;
}
