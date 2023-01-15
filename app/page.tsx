import { Category, Hashtag } from '@prisma/client'
import { Filters, FiltersButton, FiltersSidebar } from './components/Filters'
import List from './List'

async function HomePage() {
  const hashtags = await getHashtags()
  const categories = await getCategories()

  return (
    <>
      <FiltersSidebar className="bg-white hidden md:block">
        <Filters categories={categories} />
      </FiltersSidebar>
      <div className="overflow-auto p-6 flex-1">
        <List
          hashtags={hashtags}
          filters={
            <FiltersButton className="md:hidden">
              <Filters categories={categories} />
            </FiltersButton>
          }
        />
      </div>
    </>
  )
}

async function getHashtags(): Promise<
  (Hashtag & {
    categories: Category[]
  })[]
> {
  const response = await fetch(`${process.env.API_URL}/hashtags`)
  return response.json()
}

async function getCategories(): Promise<Category[]> {
  const response = await fetch(`${process.env.API_URL}/categories`)
  return response.json()
}

export default HomePage
