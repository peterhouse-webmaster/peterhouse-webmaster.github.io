import { useScroll } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useAnimate, useMotionValue, useMotionValueEvent } from 'framer-motion'
import { useEffect, useRef } from 'react'

export default function ScrollManager() {
  const data = useScroll()
  const lastScroll = useRef(0)
  const [_scope, animate] = useAnimate()
  const scrollOffset = useMotionValue(0)
  const animating = useRef(false)
  const hyst = 0.01
  let currScroll = 0

  data.fill.classList.add('top-0')
  data.fill.classList.add('absolute')
  // const {size, viewport} = useThree()
  useFrame(() => {
    // console.log(Math.floor(data.offset*(data.pages)))
    // console.log(data.el.scrollTop)
    // console.log(animating.current)
    // console.log(data.offset)
    if (animating.current === true) {
      lastScroll.current = data.offset
      data.el.scrollTop = currScroll
    } else {
      const currSection = Math.floor(data.offset * data.pages)
      // console.log(data.offset-lastScroll.current)
      if (data.offset > lastScroll.current && currSection == 0) {
        // console.log(data.offset-lastScroll.current)
        // data.el.scrollTop = (data.el.scrollHeight / data.pages) * (currSection + 1);
        animate(scrollOffset, (data.el.scrollHeight / data.pages) * (1), {
          duration: 1,
          ease: 'easeOut',
        })
      }
      if (data.offset < lastScroll.current && currSection == 1) {
        // data.el.scrollTop = (data.el.scrollHeight / data.pages) * (currSection - 1);
        animate(scrollOffset, 0, {
          duration: 1,
          ease: 'easeOut',
        })
      }
      
      lastScroll.current = data.offset
    }
  })

  useMotionValueEvent(scrollOffset, 'animationStart', () => {
    // console.log("started")
    animating.current = true
  })
  useMotionValueEvent(scrollOffset, 'animationComplete', () => {
    animating.current = false
  })
  useMotionValueEvent(scrollOffset, 'animationCancel', () => {
    animating.current = false
  })
  useMotionValueEvent(scrollOffset, 'change', (value) => {
    // data.el.scrollTop = value
    currScroll = value
  })
  return null
}
