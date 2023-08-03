interface frameProps {
  src: string
  caption?: string
}

export default function ImageFrame(props: frameProps) {
  return (
    <>
    <div className="block w-full h-fit">
      <div className='my-4 flex w-full max-h-[80%] justify-center flex-col items-center p-2 sm:p-8 space-y-2'>
        <img
          src={props.src}
          loading='lazy'
          className='flex max-w-full sm:max-w-[60%] max-h-96 rounded object-contain drop-shadow-xl'
        ></img>
        {props.caption === undefined ? <></> : 
        <p className="flex font-lato font-light text-sm text-zinc-500">
          {props.caption}
          </p>}
      </div>
      </div>
    </>
  )
}
