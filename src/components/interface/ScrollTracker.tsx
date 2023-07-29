import { useEffect, useRef } from 'react'
import { useInView } from 'framer-motion'
import { useAtom } from 'jotai'
import { headerShrink, footerHide } from '../atoms.tsx'

export function HeaderScrollTracker() {
  const [_visible, setVisible] = useAtom(headerShrink)
  const ref = useRef(null)
  const isInView = useInView(ref)
  useEffect(() => {
    setVisible(!isInView)
  }, [isInView])
  return <div className='h-0' ref={ref}></div>
}

export function FooterScrollTracker() {
  const [_visible, setVisible] = useAtom(footerHide)
  const ref = useRef(null)
  const isInView = useInView(ref)
  useEffect(() => {
    setVisible(!isInView)
    // console.log(isInView)
  }, [isInView])
  return <div className='absolute bottom-0 h-0 translate-y-[-30px]' ref={ref}></div>
}
