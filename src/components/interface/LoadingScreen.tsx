import { PeterhouseLogo } from './PeterhouseLogo'

export default function LoadingScreen() {
  return (
    <>
      <div className='fixed left-0 top-0 block h-screen w-screen bg-zinc-800 text-slate-100'>
        <div className='flex h-screen w-screen flex-col items-center justify-center space-y-8 animate-pulse'>
          <div className='max-h-[40%] max-w-[40%] stroke-current'>
            <PeterhouseLogo widthMultiplier={0.6}></PeterhouseLogo>
          </div>
          <span className='flex font-alegreyasans text-2xl font-thin sm:text-4xl'>Loading</span>
        </div>
      </div>
    </>
  )
}
