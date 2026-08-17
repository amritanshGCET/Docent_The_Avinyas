import { useEffect, useState } from 'react'
import Header from './components/header/header.jsx'
import Main from './components/main/main.jsx'
import Footer from './components/footer/footer.jsx'
import PlacePage from './Place/place.jsx'
import TripPlannerPage from './trip-planner/trip.jsx'
import SignInPage from './signin/signin.jsx'

const CURRENT_USER_STORAGE_KEY = 'docent-current-user'

const readCurrentUser = () => {
  try {
    const savedUser = localStorage.getItem(CURRENT_USER_STORAGE_KEY)
    return savedUser ? JSON.parse(savedUser) : null
  } catch {
    return null
  }
}

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
  const [currentUser, setCurrentUser] = useState(readCurrentUser)

  useEffect(() => {
    const handleRouteChange = () => setRoute(resolveRoute())
    const syncCurrentUser = () => setCurrentUser(readCurrentUser())

    window.addEventListener('popstate', handleRouteChange)
    window.addEventListener('docent-auth-change', syncCurrentUser)
    window.addEventListener('storage', syncCurrentUser)

    return () => {
      window.removeEventListener('popstate', handleRouteChange)
      window.removeEventListener('docent-auth-change', syncCurrentUser)
      window.removeEventListener('storage', syncCurrentUser)
    }
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
  const handleLogout = () => {
    localStorage.removeItem(CURRENT_USER_STORAGE_KEY)
    setCurrentUser(null)
    window.dispatchEvent(new CustomEvent('docent-auth-change'))
    navigateHome()
  }

  return (
    <div className="flex min-h-svh flex-col bg-white text-black">
      <Header
        currentUser={currentUser}
        onOpenTripPlanner={navigateToTripPlanner}
        onOpenHome={navigateHome}
        onOpenSignIn={navigateToSignIn}
        onLogout={handleLogout}
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
      <Footer onOpenHome={navigateHome} />
    </div>
  )
}

export default App
