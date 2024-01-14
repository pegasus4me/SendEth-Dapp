import Image from 'next/image'
import { useAccount } from 'wagmi'
import { Container } from '@/components/container'

export default function Home() {

  // quand je console.log() ici ça me refresh == sans doute un probleme du useEffect rerender
  return (
   <main className='max-w-90% m-auto mt-10'>
    {/* dapp structure */}
    < Container/>
   </main>
  )
}
