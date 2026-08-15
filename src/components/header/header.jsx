import { useState } from 'react'

function Header() {
  const [searchQuery, setSearchQuery] = useState('')
  const [language, setLanguage] = useState('EN')

  const languages = ['EN', 'ES', 'FR', 'DE', 'HI']

  const handleLanguageChange = () => {
    const currentIndex = languages.indexOf(language)
    const nextIndex = (currentIndex + 1) % languages.length
    setLanguage(languages[nextIndex])
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-black/10 bg-white/95 backdrop-blur-sm">
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-4 px-2 sm:px-3 lg:px-4">
        {/* Logo */}
        <div className="flex shrink-0 items-center">
          <div
            className="flex h-10 w-10 items-center justify-center rounded-lg bg-violet-600 text-white"
            aria-label="Site logo"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 2l2.09 6.26L20.5 9.5l-5 3.64L17.18 20 12 16.9 6.82 20 8.5 13.14l-5-3.64 6.41-1.24L12 2z"
              />
            </svg>
          </div>
        </div>

        {/* Search bar */}
        <div className="relative hidden flex-1 md:block">
          <svg
            className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-black/40"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <input
            type="search"
            placeholder="Search destinations, tours..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-full border border-black/10 bg-black/5 py-2 pl-10 pr-4 text-sm text-black placeholder:text-black/40 outline-none transition focus:border-violet-600 focus:bg-white focus:ring-2 focus:ring-violet-600/20"
          />
        </div>

        {/* Navigation actions */}
        <nav className="flex items-center gap-1 sm:gap-2">
          <button
            type="button"
            className="hidden items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium text-black transition hover:bg-violet-600/10 hover:text-violet-600 sm:inline-flex"
          >
            <svg
              className="h-4 w-4 shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
              />
            </svg>
            Tour Planner
          </button>

          <button
            type="button"
            className="inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium text-black transition hover:bg-violet-600/10 hover:text-violet-600"
          >
            <span className="relative flex shrink-0">
              <svg
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                />
              </svg>
              <span className="absolute -right-0.5 -top-0.5 h-2 w-2 rounded-full bg-violet-600 ring-2 ring-white" />
            </span>
            Alerts
          </button>

          <div className="mx-1 hidden h-6 w-px bg-black/10 sm:block" aria-hidden="true" />

         

          <button
            type="button"
            className="rounded-lg bg-black px-3 py-2 text-sm font-medium text-white transition hover:bg-violet-600"
          >
            SignIn
          </button>

          <button
            type="button"
            onClick={handleLanguageChange}
            className="ml-1 flex h-9 items-center gap-1 rounded-lg border border-black/10 px-2 text-xs font-semibold text-black transition hover:border-violet-600 hover:bg-violet-600/10 hover:text-violet-600"
            aria-label={`Change language, current: ${language}`}
            title="Change language"
          >
            <svg
              className="h-4 w-4 shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            {language}
          </button>
        </nav>
      </div>

      {/* Mobile search bar */}
      <div className="border-t border-black/10 px-4 pb-3 pt-2 md:hidden">
        <div className="relative">
          <svg
            className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-black/40"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <input
            type="search"
            placeholder="Search destinations, tours..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-full border border-black/10 bg-black/5 py-2 pl-10 pr-4 text-sm text-black placeholder:text-black/40 outline-none transition focus:border-violet-600 focus:bg-white focus:ring-2 focus:ring-violet-600/20"
          />
        </div>
        <button
          type="button"
          className="mt-2 inline-flex w-full items-center justify-center gap-1.5 rounded-lg py-2 text-sm font-medium text-black transition hover:bg-violet-600/10 hover:text-violet-600 sm:hidden"
        >
          <svg
            className="h-4 w-4 shrink-0"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
            />
          </svg>
          Tour Planner
        </button>
      </div>
    </header>
  )
}

export default Header
