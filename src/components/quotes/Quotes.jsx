import React, { useState, useEffect } from 'react'
import { travelQuotes } from '../../data/Quotes.js'

function Quotes() {
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0)
  const [displayedQuote, setDisplayedQuote] = useState(travelQuotes[0])

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentQuoteIndex((prevIndex) => (prevIndex + 1) % travelQuotes.length)
    }, 10000)

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    setDisplayedQuote(travelQuotes[currentQuoteIndex])
  }, [currentQuoteIndex])

  const goToPreviousQuote = () => {
    setCurrentQuoteIndex((prevIndex) => (prevIndex - 1 + travelQuotes.length) % travelQuotes.length)
  }

  const goToNextQuote = () => {
    setCurrentQuoteIndex((prevIndex) => (prevIndex + 1) % travelQuotes.length)
  }

  return (
    <section className="my-8">
      <div className="mx-auto w-full max-w-7xl px-2 sm:px-3 lg:px-4">
        <div className="relative overflow-hidden rounded-[28px] border border-violet-200 shadow-[0_16px_45px_rgba(124,58,237,0.1)]" style={{
          backgroundImage: 'url(https://images.pexels.com/photos/3532555/pexels-photo-3532555.jpeg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}>
          {/* Dark overlay */}
          <div className="absolute inset-0 bg-black/40 rounded-[28px]"></div>

          {/* Decorative elements */}
          <div className="absolute top-0 right-0 h-32 w-32 bg-violet-200 rounded-full opacity-5 -mr-16 -mt-16"></div>
          <div className="absolute bottom-0 left-0 h-40 w-40 bg-purple-200 rounded-full opacity-5 -ml-20 -mb-20"></div>

          <div className="relative z-10 p-8">
            {/* Compass icon - Travel inspiration */}
            <div className="mb-6">
              <svg className="h-16 w-16 text-white drop-shadow-lg" fill="currentColor" viewBox="0 0 24 24">
                {/* Outer circle */}
                <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="1.5" opacity="0.6"/>
                {/* Inner circle */}
                <circle cx="12" cy="12" r="8" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.4"/>
                {/* Cardinal directions */}
                <text x="12" y="5" textAnchor="middle" fontSize="7" fontWeight="bold" fill="currentColor">N</text>
                <text x="19" y="13.5" textAnchor="middle" fontSize="7" fontWeight="bold" fill="currentColor">E</text>
                <text x="12" y="21" textAnchor="middle" fontSize="7" fontWeight="bold" fill="currentColor">S</text>
                <text x="5" y="13.5" textAnchor="middle" fontSize="7" fontWeight="bold" fill="currentColor">W</text>
                {/* Compass needle - North pointing up */}
                <polygon points="12,8 14,12 12,15 10,12" fill="currentColor" opacity="0.9"/>
                {/* Center dot */}
                <circle cx="12" cy="12" r="1.5" fill="currentColor"/>
              </svg>
            </div>

            {/* Quote text */}
            <blockquote className="space-y-4">
              <p className="text-2xl md:text-3xl font-bold text-white leading-relaxed">
                "{displayedQuote.quote}"
              </p>
              <footer className="text-lg text-violet-200 font-semibold">
                — {displayedQuote.author}
              </footer>
            </blockquote>

            {/* Quote counter and navigation */}
            <div className="mt-8 flex flex-col md:flex-row items-center justify-between gap-6">
              {/* Progress indicator */}
              <div className="flex items-center gap-2">
                <div className="flex gap-1">
                  {travelQuotes.map((_, index) => (
                    <div
                      key={index}
                      className={`h-2 rounded-full transition-all duration-300 ${
                        index === currentQuoteIndex
                          ? 'bg-white w-8'
                          : 'bg-white/40 w-2'
                      }`}
                    ></div>
                  ))}
                </div>
                <span className="ml-4 text-sm text-white/80 font-medium">
                  {currentQuoteIndex + 1} / {travelQuotes.length}
                </span>
              </div>

              {/* Navigation buttons */}
              <div className="flex gap-3">
                <button
                  onClick={goToPreviousQuote}
                  className="flex items-center justify-center h-10 w-10 rounded-full bg-white/20 hover:bg-white/30 text-white transition-all duration-200 backdrop-blur-sm border border-white/30"
                  aria-label="Previous quote"
                >
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button
                  onClick={goToNextQuote}
                  className="flex items-center justify-center h-10 w-10 rounded-full bg-white/20 hover:bg-white/30 text-white transition-all duration-200 backdrop-blur-sm border border-white/30"
                  aria-label="Next quote"
                >
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Quotes
