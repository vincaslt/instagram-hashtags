import { fetchCategories, fetchHashtags } from './api'
import { Filters, FiltersButton } from './components/Filters'
import List from './List'

async function HomePage() {
  const hashtags = await fetchHashtags()
  const categories = await fetchCategories()

  return (
    <List
      hashtags={hashtags}
      filters={
        <FiltersButton
          className="md:hidden"
          filters={<Filters categories={categories} />}
        />
      }
    />
  )
}

export default HomePage
