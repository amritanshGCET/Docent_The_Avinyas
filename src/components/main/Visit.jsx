import React, { useEffect, useRef } from 'react'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { mapData } from '../../data/mapData.js'

function Visit() {
  const mapRef = useRef(null)
  const markerMapRef = useRef(new Map())

  const handleSpotClick = (spot) => {
    console.log('Selected spot:', spot)
  }

  const openSpotPopup = (name) => {
    const marker = markerMapRef.current.get(name)
    if (marker) {
      marker.openPopup()
    }
  }

  const closeSpotPopup = (name) => {
    const marker = markerMapRef.current.get(name)
    if (marker) {
      marker.closePopup()
    }
  }

  useEffect(() => {
    if (!mapRef.current) return

    const map = L.map(mapRef.current, {
      zoomControl: false,
      scrollWheelZoom: false,
      doubleClickZoom: false,
      dragging: false,
    }).setView([26.8718, 80.91053], 15)

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors',
    }).addTo(map)

    mapData.forEach((place) => {
      const isBusy = place.Name === 'Bara Imam Bara' && place.Status.toLowerCase().includes('busy')
      const markerColor = isBusy ? '#ef4444' : '#22c55e'

      const marker = L.circleMarker([place.x, place.y], {
        color: markerColor,
        fillColor: markerColor,
        fillOpacity: 0.9,
        radius: 8,
      }).addTo(map)

      marker.bindPopup(`
        <div style="font-family: Arial, sans-serif; line-height: 1.5; color: #0f172a;">
          <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 6px;">
            <span style="display: inline-block; width: 10px; height: 10px; border-radius: 50%; background: ${markerColor};"></span>
            <strong>${place.Name}</strong>
          </div>
          <span style="display: inline-block; padding: 2px 8px; border-radius: 999px; background: ${isBusy ? '#fee2e2' : '#dcfce7'}; color: ${isBusy ? '#b91c1c' : '#166534'}; font-size: 12px; font-weight: 600;">
            ${place.Status}
          </span>
          <div style="display: flex; align-items: center; gap: 8px; margin-top: 8px; color: #334155; font-size: 13px;">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <path d="M16 11C17.657 11 19 9.657 19 8C19 6.343 17.657 5 16 5C14.343 5 13 6.343 13 8C13 9.657 14.343 11 16 11Z" stroke="#7c3aed" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M8 11C9.657 11 11 9.657 11 8C11 6.343 9.657 5 8 5C6.343 5 5 6.343 5 8C5 9.657 6.343 11 8 11Z" stroke="#7c3aed" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M3 18C3.9 15.8 5.8 14 8.2 14H9.1C10.65 14 12.1 14.6 13.2 15.6C14.2 16.4 15.4 17 16.8 17H20C20.55 17 21 17.45 21 18V19H3V18Z" stroke="#7c3aed" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <span>Expected crowd: ${place.expectedCrowd}</span>
          </div>
        </div>
      `)

      markerMapRef.current.set(place.Name, marker)
    })

    return () => {
      markerMapRef.current.clear()
      map.remove()
    }
  }, [])

  return (
    <div className="space-y-4">
      <h1 className="mb-0">
        Places to Visit in, <span className="font-bold text-violet-600">Lucknow</span>
      </h1>

      <div className="grid gap-5 xl:grid-cols-[minmax(0,2.2fr)_minmax(240px,0.9fr)]">
        <div className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-[0_18px_45px_rgba(15,23,42,0.08)]">
          <div className="border-b border-slate-200 bg-slate-50 px-5 py-4">
            <h2 className="text-xl font-bold text-slate-900">Real time crowd data of your Area</h2>
            <p className="mt-1 text-sm text-slate-600">
              
            </p>
          </div>

          <div
            ref={mapRef}
            className="relative z-0 h-96 w-full"
            aria-label="Map showing Bara Imambara in Lucknow"
          />
        </div>

        <div className="rounded-3xl border border-slate-200 bg-slate-50/70 p-4">
          <h2 className="text-2xl font-bold text-slate-900">Famous spots to Explore</h2>

          <div className="mt-5 flex flex-col gap-3">
            {mapData.map((spot) => (
              <button
                key={spot.Name}
                type="button"
                onMouseEnter={() => openSpotPopup(spot.Name)}
                onMouseLeave={() => closeSpotPopup(spot.Name)}
                onFocus={() => openSpotPopup(spot.Name)}
                onBlur={() => closeSpotPopup(spot.Name)}
                onClick={() => handleSpotClick(spot.Name)}
                className="w-full rounded-2xl border border-transparent bg-transparent px-4 py-3 text-left text-base font-semibold text-slate-800 transition-all duration-200 hover:bg-violet-50 hover:text-violet-700 focus:outline-none focus:ring-2 focus:ring-violet-300"
              >
                {spot.Name}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Visit
