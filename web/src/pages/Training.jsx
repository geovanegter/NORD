import { trainingsContent } from '@/data/mockData.js';

export default function TrainingPage() {
  const { videos = [], challenges = [] } = trainingsContent;

  return (
    <div className="space-y-6">
      <section className="rounded-3xl border border-emerald-100 bg-white p-6 shadow-sm">
        <p className="text-xs uppercase tracking-[0.18em] text-emerald-600">
          <span className="mr-1 text-base" aria-hidden>
            🎯
          </span>
          Treinamentos NORD
        </p>
        <h1 className="mt-2 text-3xl font-bold text-slate-900">Cursos rápidos + games para dominar a coleção</h1>
        <p className="mt-3 max-w-2xl text-sm text-slate-600">
          Escolha um vídeo curto, pratique na hora e ganhe pontos extras nos Games. A IA acompanha seu progresso e indica o que fazer
          depois.
        </p>
      </section>

      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.18em] text-slate-400">
              <span className="mr-1 text-base" aria-hidden>
                🎬
              </span>
              Trilhas do dia
            </p>
            <h2 className="text-xl font-semibold text-slate-900">Vídeos curtos para assistir agora</h2>
          </div>
          <p className="rounded-full bg-slate-100 px-4 py-1 text-xs font-semibold text-slate-500">Ganhe XP assistindo</p>
        </div>
        <div className="mt-5 grid gap-4 md:grid-cols-2">
          {videos.map((video) => (
            <article key={video.id} className="rounded-3xl border border-slate-100 bg-slate-50 p-5 shadow-sm">
              <div className="flex flex-wrap items-center justify-between gap-3 text-xs font-semibold uppercase text-slate-500">
                <span className="rounded-full bg-white px-3 py-1">{video.tag}</span>
                <span>{video.duration}</span>
              </div>
              <h3 className="mt-3 text-lg font-semibold text-slate-900">{video.title}</h3>
              <p className="mt-1 text-sm text-slate-600">{video.description}</p>
              <div className="mt-4 flex items-center justify-between text-sm font-semibold text-emerald-600">
                <span>{video.reward}</span>
                <button className="rounded-full bg-emerald-500 px-4 py-1 text-xs uppercase tracking-widest text-white shadow">
                  {video.action}
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="rounded-3xl border border-amber-200 bg-gradient-to-br from-amber-50 to-white p-6 shadow-sm">
        <p className="text-xs uppercase tracking-[0.18em] text-amber-600">
          <span className="mr-1 text-base" aria-hidden>
            🕹️
          </span>
          Games ligados aos cursos
        </p>
        <h2 className="mt-2 text-xl font-semibold text-slate-900">Faça o curso e desbloqueie desafios</h2>
        <div className="mt-4 grid gap-4 md:grid-cols-3">
          {challenges.map((challenge) => (
            <article key={challenge.id} className="rounded-3xl border border-amber-100 bg-white/80 p-4 text-sm text-slate-700 shadow">
              <p className="text-base font-semibold text-slate-900">{challenge.title}</p>
              <p className="mt-1 text-slate-600">{challenge.description}</p>
              <p className="mt-3 text-xs font-semibold text-emerald-600">{challenge.reward}</p>
              <p className="text-xs text-slate-400">{challenge.status}</p>
            </article>
          ))}
        </div>
        <div className="mt-5 rounded-3xl border border-white/50 bg-white/70 px-6 py-4 text-sm text-slate-700">
          💡 Complete um curso por semana para manter o selo de especialista e liberar roteiros premium no app.
        </div>
      </section>
    </div>
  );
}
