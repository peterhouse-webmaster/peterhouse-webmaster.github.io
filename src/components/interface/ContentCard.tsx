import { PropsWithChildren } from 'react'

export function ContentCard({ children }: PropsWithChildren) {
  return (
    <div className='box-border flex h-full max-h-full w-full max-w-full overflow-hidden p-4 font-lato text-base sm:col-span-3 sm:row-span-1 sm:px-8'>
      <div className='flex h-full w-full flex-col flex-nowrap space-y-4 overflow-hidden sm:space-y-8'>{children}</div>
    </div>
  )
}
