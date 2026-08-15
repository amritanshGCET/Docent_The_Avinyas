import React, { useEffect, useRef } from 'react'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

function Visit() {
  const mapRef = useRef(null)

  useEffect(() => {
    if (!mapRef.current) return

    const map = L.map(mapRef.current, {
      zoomControl: true,
    }).setView([26.8467, 80.9462], 14)

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors',
    }).addTo(map)

    const marker = L.circleMarker([26.8467, 80.9462], {
      color: '#7c3aed',
      fillColor: '#7c3aed',
      fillOpacity: 0.8,
      radius: 10,
    }).addTo(map)

    marker.bindPopup('Bara Imambara, Lucknow')
    marker.openPopup()

    return () => {
      map.remove()
    }
  }, [])

  return (
    <div className="space-y-4">
      <h1 className="mb-0">
        Places to Visit in, <span className="font-bold text-violet-600">Lucknow</span>
      </h1>

      <div className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-[0_18px_45px_rgba(15,23,42,0.08)]">
        <div className="border-b border-slate-200 bg-slate-50 px-5 py-4">
          <h2 className="text-xl font-bold text-slate-900">Famous Imambara</h2>
          <p className="mt-1 text-sm text-slate-600">
            Explore the historic Bara Imambara in the heart of Lucknow.
          </p>
        </div>

        <div
          ref={mapRef}
          className="h-90 w-full"
          aria-label="Map showing Bara Imambara in Lucknow"
        />
      </div>
    </div>
  )
}

export default Visit
