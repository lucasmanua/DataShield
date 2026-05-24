import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="grid-bg relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.2),transparent_42%)]" />

      <section className="relative mx-auto max-w-4xl px-4 pb-16 pt-10 text-center md:pb-24 md:pt-16">
        <p className="mb-4 inline-flex rounded-full border border-brand-500/30 bg-brand-500/10 px-4 py-1 text-xs font-medium uppercase tracking-[0.22em] text-brand-100">
          Sistema Comunitario Anti-Fraude
        </p>
        <h1 className="text-4xl font-extrabold leading-tight tracking-tight text-white md:text-5xl">
          Antes de transferir, <span className="text-brand-400">verifica</span>
        </h1>
        <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-slate-300 md:text-lg">
          Consulta si un número de teléfono, correo o cuenta bancaria ya fue reportado como fraudulento
          por la comunidad. DataShield es el primer sistema comunitario de registro de fraudes digitales en Paraguay.
        </p>

        <div className="mt-10 mx-auto max-w-lg rounded-2xl border border-slate-800 bg-slate-900/80 p-6">
          <p className="mb-4 text-sm font-medium text-slate-200">Buscar indicador de fraude</p>
          <div className="space-y-3">
            <input id="homeSearch" type="text" placeholder="Teléfono, correo o cuenta bancaria..." className="w-full rounded-xl border border-slate-700 bg-slate-950/80 px-4 py-3 text-sm text-white placeholder-slate-500 outline-none focus:border-brand-500" />
            <Link to="/search" className="block w-full rounded-xl bg-brand-600 px-4 py-3 text-center text-sm font-semibold text-white hover:bg-brand-500 transition">
              Buscar coincidencias
            </Link>
          </div>
        </div>

        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link to="/register" className="rounded-full bg-brand-600 px-6 py-3 text-sm font-semibold text-white hover:bg-brand-500 transition">
            Crear cuenta gratuita
          </Link>
          <Link to="/stats" className="rounded-full border border-slate-700 px-6 py-3 text-sm font-semibold text-slate-200 hover:border-slate-500 hover:text-white transition">
            Ver estadísticas
          </Link>
        </div>
      </section>
    </div>
  );
}