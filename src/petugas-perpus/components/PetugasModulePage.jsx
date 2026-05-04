import PetugasLayout from './PetugasLayout';

function ModuleCardContent({
  badge,
  title,
  description,
  stats = [],
  highlights = [],
  noteTitle = 'Catatan',
  noteText,
  children,
}) {
  return (
    <div className="p-4 sm:p-6">
      <div className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm">
        <div className="bg-gradient-to-r from-blue-950 via-blue-900 to-indigo-950 px-6 py-8 text-white sm:px-8">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-amber-300">{badge}</p>
          <h1 className="mt-3 text-3xl font-bold sm:text-4xl">{title}</h1>
          <p className="mt-3 max-w-3xl text-sm text-blue-100 sm:text-base">{description}</p>
        </div>

        <div className="grid gap-4 border-b border-gray-200 p-6 md:grid-cols-2 xl:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="rounded-2xl border border-gray-200 bg-slate-50 p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">{stat.label}</p>
              <p className="mt-2 text-3xl font-bold text-slate-900">{stat.value}</p>
              <p className="mt-1 text-sm text-slate-600">{stat.caption}</p>
            </div>
          ))}
        </div>

        <div className="grid gap-6 p-6 lg:grid-cols-[1.6fr_0.9fr]">
          <div className="space-y-6">
            <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <h2 className="text-lg font-bold text-slate-900">Sorotan Modul</h2>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {highlights.map((item) => (
                  <div key={item} className="rounded-xl bg-slate-50 px-4 py-3 text-sm text-slate-700 ring-1 ring-slate-200">
                    {item}
                  </div>
                ))}
              </div>
            </section>

            {children}
          </div>

          <aside className="rounded-2xl border border-amber-200 bg-amber-50 p-5 shadow-sm">
            <h3 className="text-base font-bold text-blue-950">{noteTitle}</h3>
            <p className="mt-3 text-sm leading-6 text-slate-700">{noteText}</p>
          </aside>
        </div>
      </div>
    </div>
  );
}

export default function PetugasModulePage(props) {
  return (
    <PetugasLayout>
      <ModuleCardContent {...props} />
    </PetugasLayout>
  );
}