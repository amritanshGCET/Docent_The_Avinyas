import { useEffect, useMemo, useState } from 'react'
import { placeData } from '../data/place.js'
import { mapData } from '../data/mapData.js'

function PlacePage({ placeName, onBack }) {
  const selectedPlace = useMemo(() => {
    return placeData.find((place) => place.name_of_place === placeName) || placeData[0]
  }, [placeName])

  const [currentImage, setCurrentImage] = useState(0)

  useEffect(() => {
    if (!selectedPlace?.image_urls || selectedPlace.image_urls.length <= 1) return

    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % selectedPlace.image_urls.length)
    }, 4000)

    return () => clearInterval(interval)
  }, [selectedPlace])

  const crowdMatch = useMemo(() => {
    const normalize = (value = '') => value.toLowerCase().replace(/[^a-z]/g, '')
    const target = normalize(selectedPlace?.name_of_place)

    return (
      mapData.find(
        (place) =>
          normalize(place.Name) === target ||
          normalize(place.Name).includes(target) ||
          target.includes(normalize(place.Name)),
      ) || null
    )
  }, [selectedPlace])

  const crowdStatus = useMemo(() => {
    if (!crowdMatch) {
      return {
        label: 'Not available',
        bg: 'bg-slate-100',
        border: 'border-slate-200',
        text: 'text-slate-700',
        dot: 'bg-slate-500',
      }
    }

    if (crowdMatch.expectedCrowd > 400) {
      return {
        label: `${crowdMatch.expectedCrowd} visitors`,
        bg: 'bg-red-50',
        border: 'border-red-200',
        text: 'text-red-700',
        dot: 'bg-red-500',
      }
    }

    if (crowdMatch.expectedCrowd > 200) {
      return {
        label: `${crowdMatch.expectedCrowd} visitors`,
        bg: 'bg-yellow-50',
        border: 'border-yellow-200',
        text: 'text-yellow-700',
        dot: 'bg-yellow-500',
      }
    }

    return {
      label: `${crowdMatch.expectedCrowd} visitors`,
      bg: 'bg-green-50',
      border: 'border-green-200',
      text: 'text-green-700',
      dot: 'bg-green-500',
    }
  }, [crowdMatch])

  const showImages = selectedPlace?.image_urls && selectedPlace.image_urls.length > 0

  if (!selectedPlace) {
    return null
  }

  const nextImage = () => {
    if (!showImages) return
    setCurrentImage((prev) => (prev + 1) % selectedPlace.image_urls.length)
  }

  const prevImage = () => {
    if (!showImages) return
    setCurrentImage((prev) => (prev - 1 + selectedPlace.image_urls.length) % selectedPlace.image_urls.length)
  }

  return (
    <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-6 flex items-center justify-between gap-3">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-violet-200 hover:bg-violet-50 hover:text-violet-700"
        >
          ← Back to places
        </button>
      </div>

      <article className="overflow-hidden rounded-4xl border border-slate-200 bg-white shadow-[0_18px_45px_rgba(15,23,42,0.08)]">
        {showImages && (
          <div className="relative border-b border-slate-200 bg-slate-100">
            <img
              src={selectedPlace.image_urls[currentImage]}
              alt={`${selectedPlace.name_of_place} view ${currentImage + 1}`}
              className="h-80 w-full object-cover sm:h-105"
            />

            <button
              type="button"
              onClick={prevImage}
              className="absolute left-4 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/80 text-xl font-bold text-slate-800 shadow-md backdrop-blur-sm transition hover:bg-white"
              aria-label="Previous image"
            >
              ←
            </button>

            <button
              type="button"
              onClick={nextImage}
              className="absolute right-4 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/80 text-xl font-bold text-slate-800 shadow-md backdrop-blur-sm transition hover:bg-white"
              aria-label="Next image"
            >
              →
            </button>

            <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
              {selectedPlace.image_urls.map((_, index) => (
                <button
                  key={`${selectedPlace.unique_id}-dot-${index}`}
                  type="button"
                  onClick={() => setCurrentImage(index)}
                  className={`h-2.5 w-2.5 rounded-full transition ${
                    index === currentImage ? 'bg-white shadow-md' : 'bg-white/50'
                  }`}
                  aria-label={`Show image ${index + 1}`}
                />
              ))}
            </div>
          </div>
        )}

        <div className="p-6 sm:p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-violet-600">Famous place</p>
          <h1 className="mt-3 text-3xl font-black text-slate-900 sm:text-4xl">{selectedPlace.name_of_place}</h1>

          {crowdMatch && (
            <div
              className={`mt-5 inline-flex items-center gap-2 rounded-full border px-3 py-2 text-sm font-semibold ${crowdStatus.bg} ${crowdStatus.border} ${crowdStatus.text}`}
            >
              <span className={`h-2.5 w-2.5 rounded-full ${crowdStatus.dot}`} />
              Expected crowd: {crowdStatus.label}
            </div>
          )}

          <div className="mt-5 rounded-2xl border border-violet-200 bg-violet-50 p-4">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-violet-700">Highlights</p>
            <p className="mt-2 text-base leading-7 text-slate-700">{selectedPlace.place_information}</p>
          </div>
        </div>

        <div className="grid gap-6 border-t border-slate-200 bg-slate-50 p-6 sm:p-8 lg:grid-cols-[0.9fr_1.1fr]">
          <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="text-xl font-bold text-slate-900">Why visit?</h2>
            <p className="mt-3 text-base leading-7 text-slate-700">{selectedPlace.place_information}</p>
          </section>

          <section className="relative overflow-hidden rounded-3xl border border-amber-200 bg-linear-to-br from-amber-50 via-violet-50 to-white p-5 shadow-[0_18px_35px_rgba(168,85,247,0.08)]">
            <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-white/80 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-violet-700 ring-1 ring-violet-200">
              <span className="text-base">✦</span>
              MUST visit
            </div>
            <h2 className="text-xl font-bold text-slate-900">Hidden gem</h2>
            <p className="mt-3 text-base leading-7 text-slate-700">{selectedPlace.hidden_gem}</p>
          </section>
        </div>
      </article>
    </main>
  )
}

export default PlacePage
