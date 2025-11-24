export default function ProgressBar({ value, color = '#0ea5e9', label }) {
  const percentage = Math.min(100, Math.round(value * 100));
  return (
    <div>
      {label ? <div className="mb-1 text-xs font-medium text-slate-500">{label}</div> : null}
      <div className="h-3 rounded-full bg-slate-200">
        <div
          className="h-3 rounded-full transition-all"
          style={{ width: `${percentage}%`, background: color }}
        />
      </div>
      <p className="mt-1 text-xs font-semibold text-slate-600">{percentage}%</p>
    </div>
  );
}
