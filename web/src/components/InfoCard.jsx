const intentStyles = {
  positive: 'text-emerald-600 bg-emerald-50',
  warning: 'text-amber-600 bg-amber-50',
  neutral: 'text-slate-600 bg-slate-100',
};

export default function InfoCard({ title, value, change, intent = 'neutral' }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">{title}</p>
      <p className="mt-3 text-3xl font-semibold text-slate-900">{value}</p>
      {change ? (
        <span
          className={`mt-3 inline-flex rounded-full px-3 py-1 text-xs font-medium ${intentStyles[intent] ?? intentStyles.neutral}`}
        >
          {change}
        </span>
      ) : null}
    </div>
  );
}
