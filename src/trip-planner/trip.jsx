import React, { useMemo, useState } from 'react';
import {
  MapPin,
  Calendar,
  Plus,
  Search,
  Clock,
  Trash2,
} from 'lucide-react';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { mapData } from '../data/mapData.js';

const createId = () => Date.now() + Math.random();

const initialActivities = [
  {
    id: createId(),
    title: 'Check-in at Hotel',
    description: 'Drop off bags at the front desk and grab a quick coffee.',
    icon: 'clock',
  },
  {
    id: createId(),
    title: 'City Center Walking Tour',
    description: 'Explore the historical downtown architecture and local artisan shops.',
    icon: 'map',
  },
];

const buildDay = (dayNumber, dateValue, activities = initialActivities) => ({
  id: createId(),
  title: `Day ${dayNumber}: ${dayNumber === 1 ? 'Arrival & Exploration' : 'New Adventure'}`,
  date: dateValue,
  activities,
});

export default function TripMain() {
  const [destination, setDestination] = useState('');
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [itinerary, setItinerary] = useState([
    buildDay(1, '2026-08-20'),
  ]);

  const adjustAdults = (delta) => {
    setAdults((prev) => Math.max(1, prev + delta));
  };

  const adjustChildren = (delta) => {
    setChildren((prev) => Math.max(0, prev + delta));
  };

  const addDay = () => {
    setItinerary((prev) => {
      const nextDayNumber = prev.length + 1;
      const nextDate = new Date();
      nextDate.setDate(nextDate.getDate() + prev.length);

      return [
        ...prev,
        buildDay(
          nextDayNumber,
          nextDate.toISOString().slice(0, 10),
          [
            {
              id: createId(),
              title: `Explore day ${nextDayNumber}`,
              description: 'Add a new spot to this day and keep planning your perfect itinerary.',
              icon: 'map',
            },
          ],
        ),
      ];
    });
  };

  const removeDay = (dayId) => {
    setItinerary((prev) => prev.filter((day) => day.id !== dayId));
  };

  const updateDay = (dayId, field, value) => {
    setItinerary((prev) =>
      prev.map((day) =>
        day.id === dayId
          ? {
              ...day,
              [field]: value,
            }
          : day,
      ),
    );
  };

  const addActivity = (dayId) => {
    setItinerary((prev) =>
      prev.map((day) =>
        day.id === dayId
          ? {
              ...day,
              activities: [
                ...day.activities,
                {
                  id: createId(),
                  title: `New stop ${day.activities.length + 1}`,
                  description: 'Add a custom location or experience to your travel plan.',
                  icon: 'map',
                },
              ],
            }
          : day,
      ),
    );
  };

  const updateActivity = (dayId, activityId, field, value) => {
    setItinerary((prev) =>
      prev.map((day) => {
        if (day.id !== dayId) return day;

        return {
          ...day,
          activities: day.activities.map((activity) =>
            activity.id === activityId ? { ...activity, [field]: value } : activity,
          ),
        };
      }),
    );
  };

  const mapMarkers = useMemo(
    () =>
      mapData.map((place) => ({
        id: place.Name,
        position: [place.x, place.y],
        title: place.Name,
        status: place.Status,
        expectedCrowd: place.expectedCrowd,
      })),
    [],
  );

  const defaultCenter = useMemo(() => {
    if (!mapData.length) return [26.8467, 80.9462];

    const totals = mapData.reduce(
      (acc, place) => ({
        lat: acc.lat + place.x,
        lng: acc.lng + place.y,
      }),
      { lat: 0, lng: 0 },
    );

    return [totals.lat / mapData.length, totals.lng / mapData.length];
  }, []);

  const estimatedBudget = useMemo(() => {
    const perDayAdultCost = 600;
    const perDayChildCost = 350;
    const dayCount = itinerary.length;

    return dayCount * ((adults * perDayAdultCost) + (children * perDayChildCost));
  }, [itinerary.length, adults, children]);

  return (
    <div className="mx-auto w-full max-w-7xl flex-1 px-4 py-8 sm:px-6 lg:px-8">
      <main className="grid grid-cols-1 gap-8 lg:grid-cols-[1.25fr_0.95fr]">
        <section>
          <div className="mb-8">
            <h1 className="mb-2 text-4xl font-semibold tracking-tight text-black sm:text-5xl">
              Plan your next <span className='text-violet-600'>adventure</span>
            </h1>
            <p className="max-w-2xl text-base text-black/70 sm:text-lg">
              Build, organize, and map out your perfect itinerary.
            </p>
          </div>

          <div className="mb-8 rounded-2xl border border-black/10 bg-white p-4 shadow-sm sm:p-5">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <div className="relative min-w-0 flex-1">
                <Search className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-black/40" size={20} />
                <input
                  type="text"
                  placeholder="Where do you want to go?"
                  className="w-full rounded-xl border border-black/10 bg-black/3 py-3 pl-10 pr-4 text-sm text-black placeholder:text-black/45 outline-none transition focus:border-violet-500 focus:bg-white focus:ring-2 focus:ring-violet-500/20"
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                />
              </div>

              <button
                className="inline-flex w-full items-center justify-center rounded-xl bg-black px-5 py-3 text-sm font-semibold text-white transition hover:bg-violet-600 sm:w-auto"
                type="button"
              >
                Start Planning
              </button>
            </div>
          </div>

          <div>
            <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <h2 className="inline-flex items-center gap-2 text-2xl font-semibold text-black">
                <Calendar size={24} />
                Your Itinerary
              </h2>
              <button
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-black/15 bg-white px-4 py-2.5 text-sm font-medium text-black transition hover:border-violet-500 hover:bg-violet-500/10 hover:text-violet-700"
                type="button"
                onClick={addDay}
              >
                <Plus size={16} /> Add Day
              </button>
            </div>

            {itinerary.map((day) => (
              <article
                className="mb-5 rounded-2xl border border-black/10 bg-white p-4 shadow-sm sm:p-5"
                key={day.id}
              >
                <div className="mb-4 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
                  <input
                    className="w-full rounded-lg border border-transparent bg-black/3 px-3 py-2 text-lg font-semibold text-black outline-none transition focus:border-violet-500 focus:bg-white focus:ring-2 focus:ring-violet-500/20"
                    value={day.title}
                    onChange={(e) => updateDay(day.id, 'title', e.target.value)}
                    aria-label="Day title"
                  />

                  <div className="flex items-center gap-2 sm:gap-3">
                    <input
                      type="date"
                      className="rounded-lg border border-black/10 px-3 py-2 text-sm text-black outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20"
                      value={day.date}
                      onChange={(e) => updateDay(day.id, 'date', e.target.value)}
                      aria-label="Day date"
                    />
                    <button
                      className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-red-200 text-red-500 transition hover:bg-red-50"
                      type="button"
                      onClick={() => removeDay(day.id)}
                      aria-label="Remove day"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>

                <ul className="space-y-3">
                  {day.activities.map((activity) => (
                    <li
                      className="flex gap-3 rounded-xl border border-black/10 bg-black/2 p-3"
                      key={activity.id}
                    >
                      <div className="mt-1 inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-violet-600/10 text-violet-700">
                        {activity.icon === 'clock' ? <Clock size={20} /> : <MapPin size={20} />}
                      </div>

                      <div className="min-w-0 flex-1 space-y-2">
                        <input
                          className="w-full rounded-lg border border-transparent bg-white px-3 py-2 text-sm font-medium text-black outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20"
                          value={activity.title}
                          onChange={(e) => updateActivity(day.id, activity.id, 'title', e.target.value)}
                          aria-label="Activity title"
                        />
                        <textarea
                          className="w-full rounded-lg border border-transparent bg-white px-3 py-2 text-sm text-black/80 outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20"
                          value={activity.description}
                          rows={2}
                          onChange={(e) =>
                            updateActivity(day.id, activity.id, 'description', e.target.value)
                          }
                          aria-label="Activity description"
                        />
                      </div>
                    </li>
                  ))}
                </ul>

                <button
                  className="mt-4 inline-flex items-center gap-2 rounded-xl border border-dashed border-black/30 px-4 py-2 text-sm font-medium text-black transition hover:border-violet-500 hover:bg-violet-500/10 hover:text-violet-700"
                  type="button"
                  onClick={() => addActivity(day.id)}
                >
                  <Plus size={16} /> Add Activity
                </button>
              </article>
            ))}
          </div>
        </section>

        <aside className="space-y-5 lg:sticky lg:top-24 lg:h-fit">
          <div className="overflow-hidden rounded-2xl border border-black/10 bg-white shadow-sm">
            <MapContainer center={defaultCenter} zoom={14} scrollWheelZoom className="h-90 w-full sm:h-105">
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />

              {mapMarkers.map((marker) => (
                <Marker key={marker.id} position={marker.position}>
                  <Popup>
                    <strong>{marker.title}</strong>
                    <br />
                    {marker.status}
                    <br />
                    Expected crowd: {marker.expectedCrowd}
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          </div>

          <div className="rounded-2xl border border-black/10 bg-white p-5 shadow-sm">
            <h3 className="mb-4 text-xl font-semibold text-black">Trip Summary</h3>
            <div className="space-y-3 text-sm text-black/70">
              <div className="flex items-center justify-between rounded-lg bg-black/3 px-3 py-2">
                <span>Duration:</span>
                <span className="font-semibold text-black">{itinerary.length} Days</span>
              </div>

              <div className="flex items-center justify-between rounded-lg bg-black/3 px-3 py-2">
                <span>Adults:</span>
                <div className="flex items-center gap-2">
                  <button
                    className="inline-flex h-7 w-7 items-center justify-center rounded-md border border-black/15 bg-white font-semibold text-black transition hover:border-violet-500 hover:text-violet-700"
                    type="button"
                    onClick={() => adjustAdults(-1)}
                    aria-label="Decrease adults"
                  >
                    -
                  </button>
                  <span className="min-w-7 text-center font-semibold text-black">{adults}</span>
                  <button
                    className="inline-flex h-7 w-7 items-center justify-center rounded-md border border-black/15 bg-white font-semibold text-black transition hover:border-violet-500 hover:text-violet-700"
                    type="button"
                    onClick={() => adjustAdults(1)}
                    aria-label="Increase adults"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between rounded-lg bg-black/3 px-3 py-2">
                <span>Children:</span>
                <div className="flex items-center gap-2">
                  <button
                    className="inline-flex h-7 w-7 items-center justify-center rounded-md border border-black/15 bg-white font-semibold text-black transition hover:border-violet-500 hover:text-violet-700"
                    type="button"
                    onClick={() => adjustChildren(-1)}
                    aria-label="Decrease children"
                  >
                    -
                  </button>
                  <span className="min-w-7 text-center font-semibold text-black">{children}</span>
                  <button
                    className="inline-flex h-7 w-7 items-center justify-center rounded-md border border-black/15 bg-white font-semibold text-black transition hover:border-violet-500 hover:text-violet-700"
                    type="button"
                    onClick={() => adjustChildren(1)}
                    aria-label="Increase children"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between rounded-lg bg-black/3 px-3 py-2">
                <span>Est. Budget:</span>
                <span className="text-lg font-semibold text-black">₹{estimatedBudget.toLocaleString('en-IN')}</span>
              </div>
            </div>

            <button
              className="mt-5 inline-flex w-full items-center justify-center rounded-xl bg-violet-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-violet-700"
              type="button"
            >
              Finalize Trip
            </button>
          </div>
        </aside>
      </main>
    </div>
  );
}
