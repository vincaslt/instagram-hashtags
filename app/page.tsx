import { Category, Hashtag } from '@prisma/client'
import { Filters, FiltersButton } from './components/Filters'
import List from './List'

async function HomePage() {
  const hashtags = await fetchHashtags()

  return (
    <List
      hashtags={hashtags}
      // @ts-expect-error Server Component
      filters={<FiltersButton className="md:hidden" filters={<Filters />} />}
    />
  )
}

async function fetchHashtags(): Promise<
  (Hashtag & {
    categories: Category[]
  })[]
> {
  const response = await fetch(`${process.env.API_URL}/hashtags`)
  return response.json()
}

export default HomePage
