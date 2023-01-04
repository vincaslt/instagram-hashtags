import HashtagsList from './HashtagsList'

async function ListPage({ params }: { params: { listId: string } }) {
  const hashtags = await getHashtags(params.listId)
  return (
    <main>
      <HashtagsList hashtags={hashtags} />
    </main>
  )
}

async function getHashtags(listId: string) {
  const response = await fetch(`${process.env.API_URL}/lists/${listId}`, {
    next: { revalidate: 3 },
  })
  return response.json()
}

export default ListPage
