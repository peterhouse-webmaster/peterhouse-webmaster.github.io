import { BiChevronLeft, BiChevronRight } from 'react-icons/bi'
import { useState, useRef, useEffect } from 'react'
import { useInView, useMotionValueEvent, useScroll } from 'framer-motion'

export interface contentPageProps {
  title: string
  content: JSX.Element
}
interface contentPageType {
  title: string
  data: contentPageProps[]
}
export function ContentPage(props: contentPageType) {
  const [currentSubsection, setCurrentSubsection] = useState(0)
  const leftButtonRef = useRef<HTMLDivElement>(null)
  const rightButtonRef = useRef<HTMLDivElement>(null)
  const menuContainerRef = useRef<HTMLUListElement>(null)

  return (
    <>
      <div className='m-0 box-border flex h-full max-h-full w-full max-w-full flex-col space-y-8 overflow-hidden p-12'>
        <h1 className='flex font-alegreyasans text-5xl font-light'>{props.title}</h1>
        <div className='h-full w-full flex-1 overflow-auto'>
          <div className='flex h-full max-h-full w-full flex-col divide-y-[1px] divide-x-0 divide-stone-400 sm:grid sm:grid-cols-4 sm:grid-rows-1 sm:divide-x-2 sm:divide-y-0'>
            <div className='h-14 sm:h-full row-span-1 flex items-center overflow-auto sm:col-span-1 sm:items-start'>
              <div className='flex h-full w-6 items-center justify-center opacity-50 sm:hidden'>
                <div className='flex'  ref={leftButtonRef} onClick={()=>{
                  const current = currentSubsection;
                  setCurrentSubsection(current-1)
                }}>
                  <BiChevronLeft></BiChevronLeft>
                </div>
              </div>
              <ul ref={menuContainerRef} className='flex h-full w-full flex-shrink flex-row flex-nowrap divide-x-2 divide-stone-300 overflow-auto font-lato text-base sm:flex-col sm:divide-x-0 sm:divide-y-[1px]'>
                {props.data.map((e, i) => {
                  return <MenuItem containerRef={menuContainerRef} key={i} index={i} text={e.title} />
                })}
                {/* {props.menuItems} */}
              </ul>
              <div className='flex h-full w-6 items-center justify-center opacity-50 sm:hidden'>
                <div className='flex' ref={rightButtonRef} onClick={()=>{
                  const current = currentSubsection;
                  setCurrentSubsection(current+1)
                }}>
                  <BiChevronRight></BiChevronRight>
                </div>
              </div>
            </div>

            {props.data[currentSubsection].content}
          </div>
        </div>
      </div>
    </>
  )

  interface MenuItemProps {
    text: string
    index: number
    containerRef: typeof menuContainerRef

  }

  function MenuItem({ text, index, containerRef }: MenuItemProps) {
    const thisRef = useRef<HTMLDivElement>(null)
    // const isInView = useInView(thisRef, {root: containerRef})
    // const {scrollXProgress} = useScroll({target: thisRef})
    // useEffect(()=>{
    //   console.log(text + ` ${scrollXProgress}`)
    // }, [scrollXProgress])
    // useMotionValueEvent(scrollXProgress, "change", (latest)=>{
    //   console.log(text + ` ${latest}`)
    // })
    useEffect(()=>{
      if(currentSubsection===index && thisRef.current !== null && containerRef.current !== null){
        const targetPos = containerRef.current.getBoundingClientRect().left
        const currentPos = thisRef.current.getBoundingClientRect().left
        containerRef.current.scrollBy({
          top:0,
          left: currentPos-targetPos,
          behavior: "smooth"
        })
      }
    }, [currentSubsection])
    // useEffect(()=>{
    //   console.log(thisRef.current?.getBoundingClientRect())
    // }, [])
    return (
      <div
      ref={thisRef}
        className={`w-fit sm:w-full whitespace-nowrap p-4 hover:backdrop-brightness-95 hover:backdrop-grayscale sm:whitespace-normal ${
          index === currentSubsection ? 'backdrop-brightness-75' : ''
        } cursor-pointer`}
        onClick={() => {
          setCurrentSubsection(index)
        }}
      >
        {text}
      </div>
    )
  }
}
