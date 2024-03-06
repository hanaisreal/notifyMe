import Columns from '@/components/columns'
import ListPanel from '@/components/listpanel'
import SidePanel from '@/components/side-panel'

export default function Home() {
  return (
    <section className='flex h-screen w-screen bg-gradient-to-br from-gray-700 to-gray-900 py-12 text-white '>
      <div className='flex mx-auto'>

        {/* Side Panel stays on the left */}
        <div className=''>
          <SidePanel />
        </div>

        {/* Columns and ListPanel in a vertical layout */}
        <div className='flex-col flex space-y-4 w-2/3'>
          <div><Columns /></div>
          <div className=''>
            <ListPanel />
          </div>
        </div>
        
      </div>
    </section>
  );
}
