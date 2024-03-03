import Columns from '@/components/columns'
import SidePanel from '@/components/side-panel'

export default function Home() {
  return (
    <section className='flex h-screen bg-gradient-to-br from-gray-700 to-gray-900 py-12 text-white'>
      <div className='mx-auto w-full px-5 flex'>

        <SidePanel />
        <Columns />
      </div>
    </section>
  )
}
