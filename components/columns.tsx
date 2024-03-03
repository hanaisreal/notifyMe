import Column from './column'

export default function Columns() {
  return (
    <section className='flex flex-1 gap-6 lg:gap-12 ml-10'>
      <Column title='Todo' status='TODO' />
      <Column title='In Progress' status='IN_PROGRESS' />
      <Column title='Done' status='DONE' />
    </section>
  )
}
