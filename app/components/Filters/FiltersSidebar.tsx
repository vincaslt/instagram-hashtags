import Filters from './Filters'

export default function FiltersSidebar() {
  return (
    <section className="bg-slate-50 border-r hidden md:block w-64 p-6 overflow-auto shadow-inner-r">
      {/* @ts-expect-error Server Component */}
      <Filters />
    </section>
  )
}
