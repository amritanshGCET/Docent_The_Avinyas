import { useEffect, useState } from 'react'
import Header from './components/header/header.jsx'
import Main from './components/main/main.jsx'
import Footer from './components/footer/footer.jsx'
import PlacePage from './Place/place.jsx'
import TripPlannerPage from './trip-planner/trip.jsx'
import SignInPage from './signin/signin.jsx'

const resolveRoute = () => {
  const path = window.location.pathname

  if (path === '/trip-planner') {
    return { type: 'tripPlanner', placeName: null }
  }

  if (path === '/signin') {
    return { type: 'signin', placeName: null }
  }

  if (path.startsWith('/place/')) {
    return {
      type: 'place',
      placeName: decodeURIComponent(path.replace('/place/', '')),
    }
  }

  return { type: 'home', placeName: null }
}

function App() {
  const [route, setRoute] = useState(resolveRoute)

  useEffect(() => {
    const handleRouteChange = () => setRoute(resolveRoute())

    window.addEventListener('popstate', handleRouteChange)
    return () => window.removeEventListener('popstate', handleRouteChange)
  }, [])

  const navigateToPath = (path) => {
    window.history.pushState({}, '', path)
    setRoute(resolveRoute())
  }

  const navigateHome = () => navigateToPath('/')
  const navigateToPlace = (placeName) =>
    navigateToPath(`/place/${encodeURIComponent(placeName)}`)
  const navigateToTripPlanner = () => navigateToPath('/trip-planner')
  const navigateToSignIn = () => navigateToPath('/signin')

  return (
    <div className="flex min-h-svh flex-col bg-white text-black">
      <Header
        onOpenTripPlanner={navigateToTripPlanner}
        onOpenHome={navigateHome}
        onOpenSignIn={navigateToSignIn}
      />
      {route.type === 'home' ? (
        <Main onOpenPlace={navigateToPlace} onOpenTripPlanner={navigateToTripPlanner} />
      ) : route.type === 'tripPlanner' ? (
        <TripPlannerPage />
      ) : route.type === 'signin' ? (
        <SignInPage />
      ) : (
        <PlacePage placeName={route.placeName} onBack={navigateHome} />
      )}
      <Footer />
    </div>
  )
}

export default App
