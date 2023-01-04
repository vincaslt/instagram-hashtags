import List from './List'

async function HomePage() {
  const lists = await getLists()
  return (
    <main>
      <List lists={lists} />
    </main>
  )
}

async function getLists() {
  const response = await fetch(`${process.env.API_URL}/lists`)
  return response.json()
}

export default HomePage
