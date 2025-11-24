import { create } from 'zustand';
import { getMetasDoMes, getVendasDoMes } from '../services/firestoreQueries';
import { percentualMeta, forecast } from '../utils/calc';

const useSalesStore = create((set) => ({
  metas: [],
  vendas: [],
  ranking: [],
  resumo: { percentual: 0, forecast: 0 },
  carregarDados: async (representanteId) => {
    const [metas, vendas] = await Promise.all([
      getMetasDoMes(representanteId),
      getVendasDoMes(representanteId),
    ]);
    const metaAtual = metas?.[0];
    const somaVendas = vendas.reduce((acc, venda) => acc + (venda.valor ?? 0), 0);
    const diasPassados = new Date().getDate();
    const diasRestantes = 30 - diasPassados;
    const calculoPercentual = metaAtual ? percentualMeta(somaVendas, metaAtual.valor) : 0;
    const calculoForecast = metaAtual
      ? forecast(somaVendas, diasPassados, diasRestantes)
      : 0;

    set({
      metas,
      vendas,
      ranking: vendas
        .sort((a, b) => b.valor - a.valor)
        .slice(0, 5)
        .map((venda, index) => ({ ...venda, posicao: index + 1 })),
      resumo: { percentual: calculoPercentual, forecast: calculoForecast },
    });
  },
}));

export default useSalesStore;

