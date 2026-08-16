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
import './TripMain.css';

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
  const [itinerary, setItinerary] = useState([
    buildDay(1, '2026-08-20'),
  ]);

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
      itinerary.flatMap((day, dayIndex) =>
        day.activities.map((activity, activityIndex) => ({
          id: `${day.id}-${activity.id}`,
          position: [
            48.8566 + dayIndex * 0.2 + activityIndex * 0.05,
            2.3522 + activityIndex * 0.15,
          ],
          title: activity.title,
          dayTitle: day.title,
        })),
      ),
    [itinerary],
  );

  const defaultCenter = [48.8566, 2.3522];

  return (
    <div>
      <main className="main-grid">
        <div>
          <div>
            <h1 className="title">Plan your next adventure</h1>
            <p className="subtitle">Build, organize, and map out your perfect itinerary.</p>
          </div>

          <div className="search-section">
            <div className="search-box">
              <div className="search-input-wrapper">
                <Search className="search-icon" size={20} />
                <input
                  type="text"
                  placeholder="Where do you want to go?"
                  className="search-input"
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                />
              </div>
            </div>

            <button className="btn-primary btn-full-width" type="button">
              Start Planning
            </button>
          </div>

          <div>
            <div className="section-header-wrapper">
              <h2 className="section-title">
                <Calendar size={24} />
                Your Itinerary
              </h2>
              <button className="btn-outline" type="button" onClick={addDay}>
                <Plus size={16} /> Add Day
              </button>
            </div>

            {itinerary.map((day) => (
              <div className="card" key={day.id}>
                <div className="card-header">
                  <input
                    className="card-title-input"
                    value={day.title}
                    onChange={(e) => updateDay(day.id, 'title', e.target.value)}
                    aria-label="Day title"
                  />

                  <div className="card-header-actions">
                    <input
                      type="date"
                      className="date-input"
                      value={day.date}
                      onChange={(e) => updateDay(day.id, 'date', e.target.value)}
                      aria-label="Day date"
                    />
                    <button
                      className="icon-button danger"
                      type="button"
                      onClick={() => removeDay(day.id)}
                      aria-label="Remove day"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>

                <ul className="activity-list">
                  {day.activities.map((activity) => (
                    <li className="activity-item" key={activity.id}>
                      <div className="activity-icon">
                        {activity.icon === 'clock' ? <Clock size={20} /> : <MapPin size={20} />}
                      </div>

                      <div className="activity-editor">
                        <input
                          className="activity-title-input"
                          value={activity.title}
                          onChange={(e) => updateActivity(day.id, activity.id, 'title', e.target.value)}
                          aria-label="Activity title"
                        />
                        <textarea
                          className="activity-desc-input"
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
                  className="btn-outline btn-dashed"
                  type="button"
                  onClick={() => addActivity(day.id)}
                >
                  <Plus size={16} /> Add Activity
                </button>
              </div>
            ))}
          </div>
        </div>

        <div>
          <div className="map-placeholder">
            <MapContainer center={defaultCenter} zoom={11} scrollWheelZoom className="map-shell">
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />

              {mapMarkers.map((marker) => (
                <Marker key={marker.id} position={marker.position}>
                  <Popup>
                    <strong>{marker.title}</strong>
                    <br />
                    {marker.dayTitle}
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          </div>

          <div className="summary-card">
            <h3 className="summary-title">Trip Summary</h3>
            <div>
              <div className="summary-row">
                <span>Duration:</span>
                <span className="summary-value">{itinerary.length} Days</span>
              </div>
              <div className="summary-row">
                <span>Travelers:</span>
                <span className="summary-value">2 Adults</span>
              </div>
              <div className="summary-row">
                <span>Est. Budget:</span>
                <span className="summary-value large">₹1,200</span>
              </div>
            </div>

            <button className="btn-finalize" type="button">
              Finalize Trip
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
