import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
  addDoc,
  serverTimestamp,
  updateDoc,
  increment,
} from 'firebase/firestore';
import { db } from './firebase';

const MOCK_REPRESENTANTE_ID = 'representante_demo';
const mockMetas = [{ id: 'meta1', valor: 50000, mes: '2025-05', representante_id: MOCK_REPRESENTANTE_ID }];
const mockVendas = [
  { id: 'v1', cliente_id: 'c1', representante_id: MOCK_REPRESENTANTE_ID, valor: 6500, data: new Date().toISOString(), xp: 10 },
  { id: 'v2', cliente_id: 'c2', representante_id: MOCK_REPRESENTANTE_ID, valor: 4200, data: new Date().toISOString(), xp: 10 },
];
const mockClientes = [
  { id: 'c1', nome: 'Mercado Aurora', diasSemCompra: 52, lastLocation: { latitude: -23.55, longitude: -46.64 } },
  { id: 'c2', nome: 'Padaria Solar', diasSemCompra: 12, lastLocation: { latitude: -23.57, longitude: -46.65 } },
  { id: 'c3', nome: 'Empório Norte', diasSemCompra: 78, lastLocation: { latitude: -23.53, longitude: -46.6 } },
];

const safeGetDocs = async (col, filtros = []) => {
  try {
    const ref = filtros.length ? query(collection(db, col), ...filtros) : collection(db, col);
    const snapshot = await getDocs(ref);
    return snapshot.docs.map((docSnap) => ({ id: docSnap.id, ...docSnap.data() }));
  } catch (error) {
    console.warn(`Firestore offline (${col})`, error);
    return null;
  }
};

export const getUsuario = async (uid) => {
  try {
    const snap = await getDoc(doc(db, 'usuarios', uid));
    return snap.exists() ? { id: snap.id, ...snap.data() } : null;
  } catch (error) {
    console.warn('Firestore indisponível para getUsuario, usando mock', error);
    return {
      id: uid,
      nome: 'Representante Demo',
      perfil: 'representante',
      xp: 1200,
    };
  }
};

export const getMetasDoMes = async (representanteId) => {
  const result = await safeGetDocs('metas', [where('representante_id', '==', representanteId)]);
  return result ?? mockMetas.filter((meta) => meta.representante_id === representanteId);
};

export const getVendasDoMes = async (representanteId) => {
  const result = await safeGetDocs('vendas', [where('representante_id', '==', representanteId)]);
  return result ?? mockVendas.filter((venda) => venda.representante_id === representanteId);
};

export const getClientesInativos = async (representanteId, dias) => {
  const result = await safeGetDocs('clientes', [where('representante_id', '==', representanteId)]);
  return (
    result?.filter((cliente) => cliente.diasSemCompra >= dias) ??
    mockClientes.filter((cliente) => cliente.diasSemCompra >= dias)
  );
};

export const salvarVenda = async (payload) => {
  try {
    const docRef = await addDoc(collection(db, 'vendas'), {
      ...payload,
      criado_em: serverTimestamp(),
    });
    return docRef.id;
  } catch (error) {
    console.warn('Falha ao salvar venda, utilize esta função após configurar o Firebase.', error);
    return `mock-${Date.now()}`;
  }
};

export const incrementarXP = async (uid, pontos) => {
  try {
    await updateDoc(doc(db, 'usuarios', uid), { xp: increment(pontos) });
  } catch (error) {
    console.warn('Não foi possível incrementar XP (mock). Ajuste quando Firestore estiver ativo.', error);
  }
};

