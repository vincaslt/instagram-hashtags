import { fetchCategories } from '../../api'
import Filters from './Filters'

export default async function FiltersSidebar() {
  const categories = await fetchCategories()

  return (
    <section className="bg-slate-50 border-r hidden md:block w-64 p-6 overflow-auto shadow-inner-r">
      <Filters categories={categories} />
    </section>
  )
}
