import React, { useEffect, useRef, useState } from 'react'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { mapData } from '../../data/mapData.js'

function Visit() {
  const mapRef = useRef(null)
  const markerMapRef = useRef(new Map())
  const [selectedPlace, setSelectedPlace] = useState(mapData[0])

  const handleSpotClick = (spot) => {
    const selected = mapData.find(place => place.Name === spot)
    if (selected) setSelectedPlace(selected)
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

  const getStatusColors = (crowd) => {
    if (crowd > 400) {
      return {
        bg: 'bg-red-50',
        border: 'border-red-200',
        text: 'text-red-700',
        badge: 'text-red-600',
        status: 'Very busy'
      }
    } else if (crowd > 200) {
      return {
        bg: 'bg-yellow-50',
        border: 'border-yellow-200',
        text: 'text-yellow-700',
        badge: 'text-yellow-600',
        status: 'Moderately busy'
      }
    } else {
      return {
        bg: 'bg-green-50',
        border: 'border-green-200',
        text: 'text-green-700',
        badge: 'text-green-600',
        status: 'Not very busy'
      }
    }
  }

  useEffect(() => {
    if (!mapRef.current) return

    const map = L.map(mapRef.current, {
      zoomControl: false,
      dragging:false,
      doubleClickZoom: false,
      doubleClickZoom:false,
    }).setView([26.8718, 80.91053], 16)

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors',
    }).addTo(map)

    mapData.forEach((place) => {
      let crowdStatus = 'Not very busy'
      let markerColor = '#22c55e'
      let badgeBg = '#dcfce7'
      let badgeText = '#166534'

      if (place.expectedCrowd > 400) {
        crowdStatus = 'Very busy'
        markerColor = '#ef4444'
        badgeBg = '#fee2e2'
        badgeText = '#b91c1c'
      } else if (place.expectedCrowd > 200) {
        crowdStatus = 'Moderately busy'
        markerColor = '#facc15'
        badgeBg = '#fef3c7'
        badgeText = '#a16207'
      }

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
          <span style="display: inline-block; padding: 2px 8px; border-radius: 999px; background: ${badgeBg}; color: ${badgeText}; font-size: 12px; font-weight: 600;">
            ${crowdStatus}
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

        <div className="rounded-3xl border border-slate-200 bg-slate-50/70 p-4 overflow-hidden flex flex-col">
          <h2 className="text-2xl font-bold text-slate-900">Famous spots to Explore</h2>

          {/* Tabs */}
          <div className="mt-4 flex flex-wrap gap-2 pb-3 border-b border-slate-300">
            {mapData.map((place) => (
              <button
                key={place.Name}
                onClick={() => setSelectedPlace(place)}
                onMouseEnter={() => openSpotPopup(place.Name)}
                onMouseLeave={() => closeSpotPopup(place.Name)}
                className={`rounded-lg px-3 py-2 text-sm font-semibold transition-all duration-200 whitespace-nowrap ${
                  selectedPlace.Name === place.Name
                    ? 'bg-violet-600 text-white shadow-lg shadow-violet-500/20'
                    : 'bg-white text-slate-700 border border-slate-200 hover:bg-violet-50 hover:border-violet-200'
                }`}
              >
                {place.Name}
              </button>
            ))}
          </div>

          {/* Selected Place Details */}
          <div className="mt-4 flex-1">
            <div className="space-y-3">
              <div>
                <h3 className="text-lg font-bold text-slate-900">{selectedPlace.Name}</h3>
                <p className="mt-1 text-sm font-semibold text-violet-600 uppercase tracking-wider">
                  Expected Crowd: {selectedPlace.expectedCrowd}
                </p>
              </div>

              <div className="space-y-2">
                <div className={`rounded-lg p-3 border ${getStatusColors(selectedPlace.expectedCrowd).bg} ${getStatusColors(selectedPlace.expectedCrowd).border}`}>
                  <p className={`text-xs font-semibold uppercase tracking-wider ${getStatusColors(selectedPlace.expectedCrowd).badge}`}>Status</p>
                  <p className={`mt-1 text-sm font-semibold ${getStatusColors(selectedPlace.expectedCrowd).text}`}>{getStatusColors(selectedPlace.expectedCrowd).status}</p>
                </div>

                <div className="rounded-lg bg-violet-50 p-3 border border-violet-200">
                  <p className="text-xs font-semibold uppercase text-violet-600 tracking-wider">Estimated Visitors</p>
                  <p className="mt-1 text-2xl font-bold text-violet-600">{selectedPlace.expectedCrowd}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Visit
