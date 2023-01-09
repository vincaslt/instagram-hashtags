import { Filters, FiltersButton, FiltersSidebar } from './components/Filters'
import List from './List'

async function HomePage() {
  const hashtags = await getHashtags()
  return <List hashtags={hashtags} />
}

async function getHashtags() {
  const response = await fetch(`${process.env.API_URL}/hashtags`)
  return response.json()
}

export default HomePage
