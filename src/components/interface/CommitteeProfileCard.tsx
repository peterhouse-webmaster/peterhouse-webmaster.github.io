import { useEffect, useRef, useState } from 'react'

interface committeeProfileCardProps {
  name: string
  pictureUrl: string
  role: string
  email: string
  introduction: string
}
export function CommitteeProfileCard({ name, pictureUrl, role, email, introduction }: committeeProfileCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [overflow, setOverflow] = useState(false)
  useEffect(() => {
    if (
      cardRef.current !== null &&
      (cardRef.current.clientHeight < cardRef.current.scrollHeight ||
        cardRef.current.clientWidth < cardRef.current.scrollWidth)
    ) {
      setOverflow(true)
    } else {
      setOverflow(false)
    } // console.log(cardRef.current)
    // console.log('called')
  }, [cardRef.current, cardRef.current?.offsetHeight, cardRef.current?.offsetWidth])
  return (
    <div className='box-border flex h-full max-h-full w-full max-w-full overflow-hidden p-4 font-lato text-base sm:col-span-3 sm:row-span-1 sm:px-8'>
      <div className='box-border flex h-full w-full flex-col flex-nowrap space-y-4 sm:space-y-8'>
        <div className='flex items-center space-x-5'>
          <img
            loading={'lazy'}
            className='flex h-20 w-20 rounded-full object-cover drop-shadow-lg sm:h-32 sm:w-32'
            src={pictureUrl}
          ></img>
          <div className='flex-1 flex-col'>
            <span className='flex font-alegreyasans text-2xl sm:text-4xl sm:font-light'>{name}</span>
            <span className='flex font-lato text-base italic sm:text-xl sm:font-light'>{role}</span>
            <a
              href={`mailto:${email}`}
              className='flex cursor-pointer font-lato text-base italic hover:text-orange-700 sm:text-xl sm:font-light'
            >
              {email}
            </a>
          </div>
        </div>
        <div className='box-border flex h-full max-h-full w-full flex-col items-end overflow-hidden'>
          <div ref={cardRef} className='h-full min-h-0 w-full flex-shrink overflow-auto text-left'>
            {introduction}
          </div>
          <div className='bottom-0 right-0 flex h-5 flex-1 text-right font-alegreyasans font-light italic'>
            {overflow ? 'Scroll Down' : ''}
          </div>
        </div>
      </div>
    </div>
  )
}
