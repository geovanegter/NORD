export const percentualMeta = (valor, meta) => {
  if (!meta) return 0;
  return Number(((valor / meta) * 100).toFixed(1));
};

export const forecast = (somaAteHoje, diasPassados, diasRestantes) => {
  if (!diasPassados) return somaAteHoje;
  const mediaDiaria = somaAteHoje / diasPassados;
  return Math.round(somaAteHoje + mediaDiaria * diasRestantes);
};

