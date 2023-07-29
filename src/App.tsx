// import Scene from './components/three/Scene'
import Header from './components/interface/Header.tsx'

// import Committee from './components/interface/Committee.tsx'
// import SportsAndSocieties from './components/interface/SportsAndSocieties.tsx'
// import LifeInPeterhouse from './components/interface/LifeInPeterhouse.tsx'
// import Applying from './components/interface/Applying.tsx'
import Footer from './components/interface/Footer.tsx'
import { Suspense, lazy } from 'react'
import LoadingScreen from './components/interface/LoadingScreen.tsx'
// import { Loader } from '@react-three/drei'
// import CanvasComponent from './CanvasComponent.tsx'

const CanvasComponent = lazy(() => import('./CanvasComponent.tsx'))

function App() {
  return (
    <>
      <Suspense fallback={<LoadingScreen />}>
        <CanvasComponent />
        <Header />
        <Footer></Footer>
      </Suspense>
    </>
  )
}

export default App
