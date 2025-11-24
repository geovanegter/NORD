export const formatarDiaMes = (isoDate) => {
  const date = new Date(isoDate);
  return `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1)
    .toString()
    .padStart(2, '0')}`;
};

export const diasDesde = (isoDate) => {
  const diff = Date.now() - new Date(isoDate).getTime();
  return Math.floor(diff / (1000 * 60 * 60 * 24));
};

