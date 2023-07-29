import { PeterhouseLogo } from './PeterhouseLogo.tsx'
import { motion } from 'framer-motion'
import { headerShrink } from '../atoms.tsx'
import { useAtom } from 'jotai'

// const variants = {
//   visible: {
//     opacity: 1,
//   },
//   hidden: {
//     opacity: 0,
//   },
// }

export default function Header() {
  // const [scope, animate] = useAnimate()
  const [isHidden, _setIsHidden] = useAtom(headerShrink)

  return (
    <div className='pointer-events-none fixed left-0 top-0 z-0 m-0 box-border flex w-screen'>
      <header className='pointer-events-none z-10 my-8 flex h-16 w-full flex-auto items-center justify-end space-x-8 px-8 text-zinc-800'>
        <motion.div
          initial={false}
          animate={isHidden ? { opacity: 0.1 } : { opacity: 1 }}
          transition={{ ease: 'easeOut', duration: 0.5 }}
          className='flex h-full stroke-current'
        >
          <PeterhouseLogo widthMultiplier={2}></PeterhouseLogo>
        </motion.div>
        <motion.div
          initial={false}
          animate={isHidden ? { opacity: 0 } : { opacity: 1 }}
          className='m-0 flex flex-auto flex-col items-end sm:flex-row sm:items-center'
        >
          <motion.h1 className='flex flex-grow font-alegreya text-2xl sm:text-3xl'>Peterhouse JCR</motion.h1>
          <span className='mx-0 flex text-right font-bitter text-sm italic sm:mx-4 sm:text-base '>
            the sexcentenary club
          </span>
        </motion.div>
      </header>
    </div>
  )
}
