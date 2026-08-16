import { useEffect, useState } from 'react'
import Header from './components/header/header.jsx'
import Main from './components/main/main.jsx'
import Footer from './components/footer/footer.jsx'
import PlacePage from './Place/place.jsx'

const resolveRoute = () => {
  const path = window.location.pathname

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

  const navigate = (targetPath) => {
    const path = targetPath === '/' ? '/' : `/place/${encodeURIComponent(targetPath)}`
    window.history.pushState({}, '', path)
    setRoute(resolveRoute())
  }

  return (
    <div className="flex min-h-svh flex-col bg-white text-black">
      <Header />
      {route.type === 'home' ? (
        <Main onOpenPlace={navigate} />
      ) : (
        <PlacePage placeName={route.placeName} onBack={() => navigate('/')} />
      )}
      <Footer />
    </div>
  )
}

export default App
