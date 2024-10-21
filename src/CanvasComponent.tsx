import { Scroll, ScrollControls, useDetectGPU } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { BG } from './components/three/BG.tsx'
import { FooterScrollTracker, HeaderScrollTracker } from './components/interface/ScrollTracker.tsx'
import { Suspense, lazy } from 'react'



import GeneralInformation from './components/interface/pages/GeneralInformation.tsx'
import Prospective from './components/interface/pages/Prospective.tsx'
import Freshers from './components/interface/pages/Freshers.tsx'
import SportsAndSocieties from "./components/interface/pages/SportsAndSocieties.tsx"
import JCRDocuments from './components/interface/pages/JCRDocuments.tsx'
// import ScrollManager from './components/three/ScrollManager.tsx'


const Committee = lazy(() => import('./components/interface/Committee.tsx'))
const Scene = lazy(() => import('./components/three/Scene'))


export default function CanvasComponent() {
  const GPUTier = useDetectGPU()
  const nerf = GPUTier.tier <= 1 || (GPUTier.isMobile === undefined ? false : GPUTier.isMobile)
  
  // const nerf = true
  return (
    <>
      {/* <Loader></Loader> */}
      
      <Canvas dpr={[1, 2]} camera={{ fov: 45 }} shadows={'soft'} frameloop={nerf ? 'demand' : 'always'}>
        <BG></BG>

        <ScrollControls pages={nerf ? 7.5 : 7} damping={0.1}> 
          {/* <ScrollManager></ScrollManager> */}
          <Scroll>
            <Suspense fallback={null}>
              <Scene nerf={nerf}></Scene>
            </Suspense>
          </Scroll>

          <Scroll html>

            <section className='top-0 m-0 h-screen max-h-screen w-screen p-0'>
              <HeaderScrollTracker></HeaderScrollTracker>
            </section>
            <section className='top-[100vh]  m-0 h-screen max-h-screen w-screen p-0'>
              <GeneralInformation></GeneralInformation>  
            </section>
            <section className='top-[200vh]  m-0 h-screen max-h-screen w-screen p-0'>
              <Prospective></Prospective>     
            </section>
            <section className='top-[300vh]  m-0 h-screen max-h-screen w-screen p-0'>
              <Freshers></Freshers>
            </section>
            <section className='top-[400vh]  m-0 h-screen max-h-screen w-screen p-0'>
              <SportsAndSocieties />
            </section>
            <section className='top-[500vh]  m-0 h-screen max-h-screen w-screen p-0'>
              <JCRDocuments />
            </section>
            <section className='top-[600vh] m-0 h-screen max-h-screen w-screen p-0'>
              <Committee></Committee>
              <FooterScrollTracker></FooterScrollTracker>
            </section>
            
          </Scroll>
        </ScrollControls>
      </Canvas> 
      
    </>
  )
}
