import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext.jsx';
import nordLogo from '/nord-logo.png';

const placeholders = [
  'Inteligencia comercial, agora no navegador.',
  'Construa rotas inteligentes e reduza churn.',
  'Dados de clientes, metas e campanhas em um so lugar.',
];

export default function LoginPage() {
  const navigate = useNavigate();
  const { user, signIn, pending, error } = useAuth();
  const [email, setEmail] = useState('representante@nord.com');
  const [password, setPassword] = useState('nord123');
  const [hint] = useState(() => placeholders[Math.floor(Math.random() * placeholders.length)]);

  useEffect(() => {
    if (user) {
      navigate('/', { replace: true });
    }
  }, [user, navigate]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await signIn(email, password);
      navigate('/', { replace: true });
    } catch (err) {
      console.warn(err);
    }
  };

  return (
    <div className="grid min-h-screen grid-cols-1 bg-slate-100 md:grid-cols-2">
      <div className="hidden flex-col justify-between bg-slate-900 p-12 text-white md:flex">
        <div>
          <div className="flex items-center gap-4">
            <img src={nordLogo} alt="Nord" className="h-10 w-auto rounded-lg bg-white/10 p-2" />
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-emerald-200">Execução comercial simplificada</p>
          </div>
          <h1 className="mt-8 text-4xl font-semibold leading-tight">
            Nord é seu assistente pessoal que te ajuda a vender mais todos os dias.
          </h1>
          <p className="mt-4 max-w-md text-slate-300">{hint}</p>
          <p className="mt-6 text-sm text-emerald-200">Planeje, visite e monitore metas com clareza em 5 segundos.</p>
        </div>
      </div>
      <div className="flex flex-col justify-center p-10">
        <form onSubmit={handleSubmit} className="mx-auto w-full max-w-md space-y-6 rounded-3xl border border-slate-200 bg-white p-8 shadow-xl">
          <div className="text-center">
            <div className="flex justify-center">
              <img src={nordLogo} alt="Nord" className="h-10 w-auto" />
            </div>
            <h2 className="mt-4 text-2xl font-semibold text-slate-900">Acessar conta</h2>
            <p className="text-sm text-slate-500">Nord é seu assistente pessoal para bater metas com foco e IA.</p>
          </div>
          <label className="block text-sm font-medium text-slate-600">
            Email
            <input
              className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 text-slate-900 outline-none focus:border-nord-accent focus:ring-2 focus:ring-nord-accent/20"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
          </label>
          <label className="block text-sm font-medium text-slate-600">
            Senha
            <input
              className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 text-slate-900 outline-none focus:border-nord-accent focus:ring-2 focus:ring-nord-accent/20"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </label>
          {error ? <p className="text-sm text-rose-500">{error}</p> : null}
          <button
            type="submit"
            disabled={pending}
            className="w-full rounded-2xl bg-slate-900 py-3 text-center text-white transition hover:bg-slate-800 disabled:opacity-70"
          >
            {pending ? 'Entrando...' : 'Entrar'}
          </button>
        </form>
      </div>
    </div>
  );
}
