import { useState } from 'react'

function Header({ currentUser, onOpenTripPlanner, onOpenHome, onOpenSignIn, onLogout }) {
  const [searchQuery, setSearchQuery] = useState('')
  const [language, setLanguage] = useState('EN')

  const languages = ['EN', 'ES', 'FR', 'DE', 'HI']

  const handleLanguageChange = () => {
    const currentIndex = languages.indexOf(language)
    const nextIndex = (currentIndex + 1) % languages.length
    setLanguage(languages[nextIndex])
  }

  const displayName = currentUser?.name ? currentUser.name.split(' ')[0] : 'Traveler'

  return (
    <header className="sticky top-0 z-50 w-full border-b border-black/10 bg-white/95 backdrop-blur-sm">
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-4 px-2 sm:px-3 lg:px-4">
        {/* Logo */}
        <div className="flex shrink-0 items-center">
          <button
            type="button"
            onClick={onOpenHome}
            className="rounded-lg bg-violet-600 px-3 py-2 text-base font-semibold tracking-wide text-white transition hover:bg-violet-700"
            aria-label="Go to home"
          >
            Docent
          </button>
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
            onClick={onOpenHome}
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
                d="M3 10.5L12 3l9 7.5V20a1 1 0 01-1 1h-5.5v-6h-5v6H4a1 1 0 01-1-1v-9.5z"
              />
            </svg>
            Home
          </button>

          <button
            type="button"
            onClick={onOpenTripPlanner}
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
                d="M3 8.5L8.5 3h7L21 8.5 12 21 3 8.5z"
              />
            </svg>
            Buy premium
          </button>

          <div className="mx-1 hidden h-6 w-px bg-black/10 sm:block" aria-hidden="true" />

         

          {currentUser ? (
            <>
              <button
                type="button"
                className="inline-flex items-center gap-2 rounded-full border border-violet-200 bg-violet-50 px-2.5 py-1.5 text-sm font-medium text-violet-700 transition hover:bg-violet-100"
                aria-label={`Signed in as ${currentUser.name}`}
              >
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-violet-600 text-white shadow-sm">
                  <svg
                    className="h-4 w-4"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <circle cx="12" cy="8" r="4" />
                    <path d="M4 19c1.6-3 4.2-4.5 8-4.5s6.4 1.5 8 4.5" />
                  </svg>
                </span>
                <span className="hidden sm:inline">{displayName}</span>
              </button>

              <button
                type="button"
                onClick={onLogout}
                className="rounded-lg border border-black/10 bg-white px-3 py-2 text-sm font-medium text-black transition hover:border-red-200 hover:bg-red-50 hover:text-red-600"
              >
                Log out
              </button>
            </>
          ) : (
            <button
              type="button"
              onClick={onOpenSignIn}
              className="rounded-lg bg-black px-3 py-2 text-sm font-medium text-white transition hover:bg-violet-600"
            >
              SignIn
            </button>
          )}

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
          onClick={onOpenHome}
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
              d="M3 10.5L12 3l9 7.5V20a1 1 0 01-1 1h-5.5v-6h-5v6H4a1 1 0 01-1-1v-9.5z"
            />
          </svg>
          Home
        </button>
        <button
          type="button"
          onClick={onOpenTripPlanner}
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
