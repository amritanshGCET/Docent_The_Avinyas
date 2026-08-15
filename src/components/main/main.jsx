import ReviewCarousel from '../reviews/ReviewCarousel.jsx'
import Visit from './Visit.jsx'
const options = [
  { title: 'Tour planner', icon: '✦', active: true },
  { title: 'Crowd analysis', icon: '◌', active: false },
  { title: 'Route navigator', icon: '↗', active: false },
]

function Main() {
  return (
    <main className="mx-auto w-full max-w-7xl flex-1 px-2 py-3 sm:px-3 lg:px-4">
      <div className='flex flex-row'>
      <div className="grid grid-cols-1 gap-6 lg:w-[30%] lg:min-w-300px lg:grid-cols-1">
        <aside className="rounded-[28px] border border-slate-200 bg-slate-50/80 p-4 shadow-[0_16px_45px_rgba(15,23,42,0.04)] backdrop-blur-sm sm:p-5">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
                Explore
              </p>
              <h2 className="mt-2 text-2xl font-bold text-slate-900">Journey tools</h2>
            </div>
          </div>

          <div className="space-y-3">
            {options.map((option) => (
              <button
                key={option.title}
                type="button"
                className={`flex w-full items-center gap-3 rounded-2xl border px-4 py-4 text-left transition-all duration-200 ${
                  option.active
                    ? 'border-violet-200 bg-violet-600 text-white shadow-lg shadow-violet-500/20'
                    : 'border-transparent bg-white text-slate-700 hover:border-violet-200 hover:bg-violet-50 hover:text-violet-700'
                }`}
              >
                <span
                  className={`flex h-10 w-10 items-center justify-center rounded-xl text-lg font-bold ${
                    option.active ? 'bg-white/15 text-white' : 'bg-violet-100 text-violet-600'
                  }`}
                >
                  {option.icon}
                </span>

                <span className="text-base font-semibold">{option.title}</span>
              </button>
            ))}
          </div>
        </aside>

      </div>
      <section className='px-2 mx-2'>
        <Visit />
      </section>
      </div>
        <section className="flex items-center justify-center my-3">
          <div className="w-full">
            <ReviewCarousel />
          </div>
        </section>
    </main>
  )
}

export default Main
