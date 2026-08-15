import { useEffect, useState } from 'react'
import { reviews } from '../../data/reviews'

function ReviewCarousel() {
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((current) => (current + 1) % reviews.length)
    }, 3000)

    return () => clearInterval(timer)
  }, [])

  const activeReview = reviews[activeIndex]

  return (
    <div className="relative overflow-hidden rounded-[32px] border border-violet-100 bg-gradient-to-br from-violet-50 via-white to-sky-50 p-6 shadow-[0_25px_80px_rgba(124,58,237,0.12)] sm:p-8">
      <div className="absolute -right-12 -top-12 h-40 w-40 rounded-full bg-violet-300/30 blur-3xl" />
      <div className="absolute -bottom-16 -left-8 h-36 w-36 rounded-full bg-cyan-300/30 blur-3xl" />

      <div className="relative">
        <div className="mb-6 flex items-center justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.26em] text-violet-600/80">
              Traveler feedback
            </p>
            <h2 className="mt-2 text-2xl font-bold text-slate-900 sm:text-3xl">
              What people are saying
            </h2>
          </div>

          <div className="flex items-center gap-1 rounded-full bg-white/80 px-3 py-2 text-sm font-semibold text-amber-500 shadow-sm ring-1 ring-black/5">
            <span aria-hidden="true">★</span>
            <span>4.9/5</span>
          </div>
        </div>

        <div
          key={activeReview.id}
          className="review-card rounded-[28px] border border-slate-200/80 bg-white/85 p-5 shadow-[0_20px_40px_rgba(15,23,42,0.06)] backdrop-blur-sm sm:p-6"
        >
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-600 to-indigo-500 text-lg font-bold text-white shadow-lg shadow-violet-600/20">
                {activeReview.initials}
              </div>

              <div>
                <p className="text-lg font-semibold text-slate-900">{activeReview.name}</p>
                <p className="text-sm text-slate-500">{activeReview.location}</p>
              </div>
            </div>

            <div className="flex items-center gap-1 rounded-full bg-amber-50 px-2.5 py-1 text-sm font-semibold text-amber-600 ring-1 ring-amber-200">
              {Array.from({ length: activeReview.rating }).map((_, index) => (
                <span key={`${activeReview.id}-star-${index}`} aria-hidden="true">
                  ★
                </span>
              ))}
            </div>
          </div>

          <div className="mt-6">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-violet-600">
              Trip review
            </p>
            <h3 className="mt-3 text-2xl font-bold text-slate-900">{activeReview.title}</h3>
            <p className="mt-4 text-base leading-7 text-slate-600">{activeReview.review}</p>
          </div>

          <div className="mt-6 flex flex-wrap items-center justify-between gap-3 rounded-2xl bg-slate-50 px-4 py-3 ring-1 ring-slate-200">
            <span className="text-sm font-medium text-violet-700">{activeReview.highlight}</span>
            <span className="text-sm font-medium text-slate-600">{activeReview.trip}</span>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-center gap-2">
          {reviews.map((review, index) => (
            <button
              key={review.id}
              type="button"
              onClick={() => setActiveIndex(index)}
              aria-label={`Show review ${index + 1}`}
              className={`h-2.5 rounded-full transition-all duration-300 ${
                activeIndex === index ? 'w-8 bg-violet-600' : 'w-2.5 bg-violet-200 hover:bg-violet-400'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default ReviewCarousel
