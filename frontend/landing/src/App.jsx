const fraudTypes = [
  { icon: '📱', title: 'Phishing', desc: 'Correos o mensajes falsos que roban tus credenciales bancarias.' },
  { icon: '🛒', title: 'Estafas en Marketplace', desc: 'Vendedores falsos en Facebook, OLX y plataformas de compraventa.' },
  { icon: '🏦', title: 'Suplantación Bancaria', desc: 'Llamadas o SMS de falsos funcionarios de bancos.' },
  { icon: '🆔', title: 'Robo de Identidad', desc: 'Uso fraudulento de tus datos personales para estafar.' },
  { icon: '💸', title: 'Préstamos Falsos', desc: 'Ofertas de crédito fácil que terminan en extorsión.' }
];

const stats = [
  { value: '+60%', label: 'Crecimiento de fraudes digitales en Paraguay (2021-2024)' },
  { value: '75%', label: 'De la población paraguaya usa internet' },
  { value: '5+', label: 'Tipos de fraudes monitoreados por DataShield' }
];

const steps = [
  { num: '1', title: 'Busca', desc: 'Ingresa un número, correo o cuenta bancaria antes de realizar una operación.' },
  { num: '2', title: 'Verifica', desc: 'DataShield te muestra si ese indicador fue reportado como fraudulento.' },
  { num: '3', title: 'Reporta', desc: 'Si fuiste víctima, crea un reporte y ayuda a prevenir futuras estafas.' },
  { num: '4', title: 'Protege', desc: 'Recibe alertas y mantente informado sobre las últimas amenazas.' }
];

function SectionHeading({ eyebrow, title, subtitle }) {
  return (
    <header className="mx-auto mb-12 max-w-3xl text-center">
      <p className="mb-3 text-sm font-semibold uppercase tracking-[0.22em] text-brand-100">{eyebrow}</p>
      <h2 className="text-3xl font-bold tracking-tight text-white md:text-4xl">{title}</h2>
      {subtitle ? <p className="mt-4 text-base text-slate-300 md:text-lg">{subtitle}</p> : null}
    </header>
  );
}

function App() {
  return (
    <div className="grid-bg relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.2),transparent_42%)]" />

      <header className="relative mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-6 md:px-10">
        <a href="#inicio" className="flex items-center gap-2 text-lg font-semibold tracking-tight text-white">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-600 text-sm font-bold">DS</span>
          DataShield
        </a>
        <nav className="items-center gap-8 text-sm text-slate-300 hidden md:flex">
          <a href="#problema" className="transition hover:text-white">Problema</a>
          <a href="#funciona" className="transition hover:text-white">Cómo funciona</a>
          <a href="#fraudes" className="transition hover:text-white">Fraudes</a>
          <a href="#app" className="transition hover:text-white">App</a>
        </nav>
        <a
          href="#app"
          className="rounded-full border border-slate-700 bg-slate-900/80 px-5 py-2.5 text-sm font-medium text-white transition hover:border-brand-500 hover:bg-slate-800"
        >
          Ir al panel
        </a>
      </header>

      <main>
        <section id="inicio" className="relative mx-auto max-w-6xl px-6 pb-16 pt-10 md:px-10 md:pb-24 md:pt-16">
          <div className="grid items-center gap-12 md:grid-cols-2">
            <div>
              <p className="mb-4 inline-flex rounded-full border border-brand-500/30 bg-brand-500/10 px-4 py-1 text-xs font-medium uppercase tracking-[0.22em] text-brand-100">
                Sistema Comunitario Anti-Fraude
              </p>
              <h1 className="text-4xl font-extrabold leading-tight tracking-tight text-white md:text-5xl">
                Antes de transferir, <span className="text-brand-400">verifica</span>. Antes de que te estafen, <span className="text-brand-400">reporta</span>.
              </h1>
              <p className="mt-6 max-w-xl text-base leading-relaxed text-slate-300 md:text-lg">
                DataShield es el primer sistema comunitario de registro de fraudes digitales en Paraguay. 
                Consulta si un número, cuenta o correo ya fue reportado como fraudulento por la comunidad.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href="#app"
                  className="rounded-full bg-brand-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-brand-500"
                >
                  Consultar ahora
                </a>
                <a
                  href="#funciona"
                  className="rounded-full border border-slate-700 px-6 py-3 text-sm font-semibold text-slate-200 transition hover:border-slate-500 hover:text-white"
                >
                  Cómo funciona
                </a>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6">
              <div className="mb-4 flex items-center justify-between">
                <p className="text-sm font-medium text-slate-200">Buscador de indicadores</p>
                <span className="rounded-full bg-emerald-500/15 px-3 py-1 text-xs font-semibold text-emerald-300">
                  Gratuito
                </span>
              </div>
              <div className="space-y-3">
                <div>
                  <label className="text-xs uppercase tracking-[0.18em] text-slate-400">Número de teléfono</label>
                  <input type="text" placeholder="Ej: +595 981 123456" className="mt-1 w-full rounded-xl border border-slate-700 bg-slate-950/80 px-4 py-3 text-sm text-white placeholder-slate-500 outline-none focus:border-brand-500" readOnly />
                </div>
                <div>
                  <label className="text-xs uppercase tracking-[0.18em] text-slate-400">Correo electrónico</label>
                  <input type="text" placeholder="Ej: correo@sospechoso.com" className="mt-1 w-full rounded-xl border border-slate-700 bg-slate-950/80 px-4 py-3 text-sm text-white placeholder-slate-500 outline-none focus:border-brand-500" readOnly />
                </div>
                <button className="w-full rounded-xl bg-brand-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-brand-500">
                  Buscar coincidencias
                </button>
              </div>
            </div>
          </div>
        </section>

        <section id="stats" className="mx-auto max-w-6xl px-6 pb-14 md:px-10 md:pb-20">
          <div className="grid gap-4 md:grid-cols-3">
            {stats.map((s) => (
              <div key={s.label} className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5 text-center">
                <p className="text-3xl font-bold text-white">{s.value}</p>
                <p className="mt-2 text-sm text-slate-400">{s.label}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="problema" className="mx-auto max-w-6xl px-6 py-14 md:px-10 md:py-20">
          <SectionHeading
            eyebrow="El problema"
            title="En Paraguay no existe un registro único de fraudes digitales"
            subtitle="Cada día, cientos de paraguayos caen en estafas que pudieron evitarse si hubiera un sistema centralizado de consulta."
          />
          <div className="grid gap-5 md:grid-cols-2">
            <article className="rounded-2xl border border-rose-500/30 bg-rose-500/5 p-6">
              <h3 className="text-xl font-semibold text-white">Sin DataShield</h3>
              <ul className="mt-4 space-y-3 text-slate-300">
                <li>- Las mismas estafas se repiten con distintas víctimas.</li>
                <li>- No hay forma de verificar un número antes de transferir.</li>
                <li>- Denunciar es lento y burocrático (Fiscalía, MITIC, comisarías).</li>
                <li>- Las víctimas no denuncian por temor o desconocimiento.</li>
              </ul>
            </article>
            <article className="rounded-2xl border border-brand-500/30 bg-brand-500/5 p-6">
              <h3 className="text-xl font-semibold text-white">Con DataShield</h3>
              <ul className="mt-4 space-y-3 text-slate-200">
                <li>- Consulta en segundos si un indicador ya fue reportado.</li>
                <li>- Reporta de forma anónima y sin burocracia.</li>
                <li>- Recibe alertas sobre fraudes activos en tu región.</li>
                <li>- Ayudas a la comunidad: tu reporte protege a otros.</li>
              </ul>
            </article>
          </div>
        </section>

        <section id="funciona" className="mx-auto max-w-6xl px-6 py-14 md:px-10 md:py-20">
          <SectionHeading
            eyebrow="Cómo funciona"
            title="Cuatro pasos para protegerte y proteger a tu comunidad"
          />
          <div className="grid gap-5 md:grid-cols-4">
            {steps.map((step) => (
              <article key={step.num} className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6 text-center">
                <p className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-brand-600 text-lg font-bold text-white">{step.num}</p>
                <h3 className="text-lg font-semibold text-white">{step.title}</h3>
                <p className="mt-2 text-sm text-slate-300">{step.desc}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="fraudes" className="mx-auto max-w-6xl px-6 py-14 md:px-10 md:py-20">
          <SectionHeading
            eyebrow="Tipos de fraude"
            title="Estos son los fraudes más comunes en Paraguay"
            subtitle="DataShield te permite reportar y consultar cualquiera de estas modalidades."
          />
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {fraudTypes.map((f) => (
              <article key={f.title} className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5">
                <p className="text-2xl">{f.icon}</p>
                <h3 className="mt-2 text-lg font-semibold text-white">{f.title}</h3>
                <p className="mt-1 text-sm text-slate-300">{f.desc}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="app" className="mx-auto max-w-6xl px-6 py-14 md:px-10 md:py-20">
          <div className="rounded-3xl border border-brand-500/30 bg-gradient-to-r from-brand-700/25 to-slate-900 p-8 md:p-10 text-center">
            <h2 className="text-3xl font-bold tracking-tight text-white md:text-4xl">
              ¿Te llamaron de un número sospechoso?
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-slate-200">
              
              Verifícalo ahora en DataShield. Es gratis, anónimo y ayudas a toda la comunidad.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
          <a
              href="/app"
              className="rounded-full bg-brand-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-brand-500"
            >
              Ir al panel de consulta
            </a>
              <a
                href="#funciona"
                className="rounded-full border border-slate-600 px-6 py-3 text-sm font-semibold text-slate-100 transition hover:border-slate-400"
              >
                Más información
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-slate-800/90 py-8">
        <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-4 px-6 text-sm text-slate-400 md:flex-row md:items-center md:px-10">
          <p>© {new Date().getFullYear()} DataShield. Sistema Comunitario de Registro de Fraudes Digitales - Paraguay.</p>
          <div className="flex gap-5">
            <a href="#inicio" className="transition hover:text-slate-200">Inicio</a>
            <a href="#problema" className="transition hover:text-slate-200">Problema</a>
            <a href="#app" className="transition hover:text-slate-200">App</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;