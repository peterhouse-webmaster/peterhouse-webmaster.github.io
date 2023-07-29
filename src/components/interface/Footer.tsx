import { PiEnvelopeSimple, PiHeartLight } from 'react-icons/pi'
import { VscGithubAlt } from 'react-icons/vsc'
import { footerHide } from '../atoms'
import { useAtom } from 'jotai'

export default function Footer() {
  const [footerHidden, _setFooterHidden] = useAtom(footerHide)
  return (
    <>
      <div
        className={`pointer-events-none fixed bottom-0 z-10 m-0 box-border w-full transition-opacity ${
          footerHidden ? 'opacity-0' : 'opacity-100'
        }`}
      >
        <div className='pointer-events-auto my-4 flex items-center justify-between px-8 text-zinc-800'>
          <div className='flex flex-row items-center font-alegreyasans font-light'>
            <span>Made with</span>
            <PiHeartLight className='mx-1'></PiHeartLight>
            <span>by Infinus</span>
          </div>
          <div className='flex space-x-2'>
            <a href='mailto:webmaster@peterhousejcr.co.uk'>
              <PiEnvelopeSimple className={'hover:text-orange-700'}></PiEnvelopeSimple>
            </a>
            <a href='https://github.com/infinus-electronics'>
              <VscGithubAlt className={'hover:text-orange-700'}></VscGithubAlt>
            </a>
          </div>
        </div>
      </div>
    </>
  )
}
