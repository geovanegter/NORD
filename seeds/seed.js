/* eslint-disable no-console */
const { initializeApp } = require('firebase/app');
const { getFirestore, doc, setDoc, addDoc, collection } = require('firebase/firestore');
const { getAuth, signInWithEmailAndPassword } = require('firebase/auth');
const firebaseConfig = require('../src/services/firebaseConfig.json');

const usuarios = [
  { id: 'gestor_demo', nome: 'Gestor Demo', perfil: 'gestor', xp: 5000, email: 'gestor@nord.com' },
  {
    id: 'representante_demo',
    nome: 'Representante Demo',
    perfil: 'representante',
    xp: 1200,
    email: 'rep@nord.com',
  },
];

const clientes = [
  { id: 'cliente1', nome: 'Mercado Aurora', representante_id: 'representante_demo', diasSemCompra: 50 },
  { id: 'cliente2', nome: 'Padaria Solar', representante_id: 'representante_demo', diasSemCompra: 10 },
  { id: 'cliente3', nome: 'Empório Norte', representante_id: 'representante_demo', diasSemCompra: 70 },
  { id: 'cliente4', nome: 'Restaurante Lume', representante_id: 'representante_demo', diasSemCompra: 5 },
  { id: 'cliente5', nome: 'Boutique do Pão', representante_id: 'representante_demo', diasSemCompra: 48 },
  { id: 'cliente6', nome: 'Varejo Atlântico', representante_id: 'representante_demo', diasSemCompra: 90 },
];

const metas = [
  {
    id: 'meta_maio',
    representante_id: 'representante_demo',
    mes: '2025-05',
    valor: 50000,
  },
];

const vendas = [
  { cliente_id: 'cliente1', representante_id: 'representante_demo', valor: 6500 },
  { cliente_id: 'cliente2', representante_id: 'representante_demo', valor: 4200 },
  { cliente_id: 'cliente3', representante_id: 'representante_demo', valor: 5800 },
  { cliente_id: 'cliente4', representante_id: 'representante_demo', valor: 3000 },
  { cliente_id: 'cliente5', representante_id: 'representante_demo', valor: 8200 },
].map((venda) => ({ ...venda, data: new Date().toISOString() }));

const planos = [
  { titulo: 'Expansão zona leste', responsavel: 'Ana', status: 'Em andamento' },
  { titulo: 'Campanha combos premium', responsavel: 'Bruno', status: 'Pendente' },
];

const campanhas = [
  {
    nome: 'Campanha Outono',
    ativo: true,
    vigencia: { inicio: '2025-05-01', fim: '2025-05-31' },
    metas: { positivacao: 80 },
  },
];

const validarConfig = () => {
  if (!firebaseConfig.apiKey || firebaseConfig.apiKey.includes('SUA_API_KEY')) {
    throw new Error('Atualize src/services/firebaseConfig.json com os dados reais antes de rodar o seed.');
  }
};

const autenticar = async (auth) => {
  const email = process.env.SEED_EMAIL;
  const password = process.env.SEED_PASSWORD;
  if (!email || !password) {
    throw new Error('Defina as variáveis de ambiente SEED_EMAIL e SEED_PASSWORD com um usuário que tenha acesso ao Firestore.');
  }
  await signInWithEmailAndPassword(auth, email, password);
};

const run = async () => {
  try {
    validarConfig();
    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);
    await autenticar(auth);
    const db = getFirestore(app);

    await Promise.all(usuarios.map((usuario) => setDoc(doc(db, 'usuarios', usuario.id), usuario)));
    await Promise.all(clientes.map((cliente) => setDoc(doc(db, 'clientes', cliente.id), cliente)));
    await Promise.all(metas.map((meta) => setDoc(doc(db, 'metas', meta.id), meta)));
    await Promise.all(
      vendas.map((venda) =>
        addDoc(collection(db, 'vendas'), {
          ...venda,
          criado_em: new Date().toISOString(),
          xp: 25,
        })
      )
    );
    await Promise.all(planos.map((plano) => addDoc(collection(db, 'planos_acao'), plano)));
    await Promise.all(campanhas.map((campanha) => addDoc(collection(db, 'campanhas'), campanha)));

    console.log('Seed concluído.');
  } catch (error) {
    console.error('Seed falhou:', error.message);
    process.exit(1);
  }
};

run();

