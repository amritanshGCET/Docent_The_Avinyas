import { MapContainer, TileLayer, CircleMarker, Tooltip } from 'react-leaflet';
import 'leaflet/dist/leaflet.css'; 
import { locations } from '../data/route.js';
function RouteNavigatorPage() {
  return (
    <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-8 sm:px-6 lg:px-8">
      <section className="overflow-hidden rounded-4xl border border-slate-200 bg-white shadow-[0_18px_45px_rgba(15,23,42,0.08)]">
        <div className="border-b border-slate-200 bg-slate-100">
         <MapContainer center={[28.456751, 77.498213]} zoom={17} style={{ height: '400px', width: '100%' }}>
  <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
  
  {locations.map((loc, index) => {
    // Determine color inline based on crowd
    const markerColor = loc.expectedCrowd > 100 ? 'red' : loc.expectedCrowd > 50 ? 'yellow' : 'green';
    
    return (
      <CircleMarker 
        key={index} 
        center={[loc.x, loc.y]} 
        pathOptions={{ color: markerColor, fillColor: markerColor, fillOpacity: 0.7 }} 
        radius={10}
      >
        <Tooltip>
          <strong>{loc.name}</strong><br />
          Expected Crowd: {loc.expectedCrowd}
        </Tooltip>
      </CircleMarker>
    );
  })}
</MapContainer>
        </div>

        <div className="space-y-4 p-6 sm:p-8">
          <h1 className="text-3xl font-black text-slate-900 sm:text-4xl">
            Route navigator of Galgotias College
          </h1>
          <p className="text-base leading-7 text-slate-700">
            Galgotias College of Engineering and Technology is one of the well-known institutions in
            Greater Noida, Uttar Pradesh. The campus hosts multiple academic blocks, labs, libraries,
            and student activity areas.
          </p>
          <p className="text-base leading-7 text-slate-700">
            This route navigator page helps students and visitors quickly understand the layout of the
            college and plan movement between blocks, administration areas, and key facilities.
          </p>
        </div>
      </section>
    </main>
  )
}

export default RouteNavigatorPage
