import Columns from '@/components/columns'
import ListPanel from '@/components/listpanel'
import SidePanel from '@/components/side-panel'

export default function Home() {
  return (
    <section className='flex h-screen bg-gradient-to-br from-gray-700 to-gray-900 py-12 text-white overflow-auto'>
      <div className='flex w-full max-w-7xl mx-auto'>

        {/* Side Panel stays on the left */}
        <div className='w-[250px] flex-none'>
          <SidePanel />
        </div>

        {/* Columns and ListPanel in a vertical layout */}
        <div className='flex-1 flex flex-col'>
          <Columns />
          <div className='ml-10 mt-4'>
            <ListPanel />
          </div>
        </div>
        
      </div>
    </section>
  );
}
