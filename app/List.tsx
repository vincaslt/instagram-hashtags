import Link from 'next/link'

type Props = {
  lists: {
    id: number
    name: string
  }[]
}

function List({ lists }: Props) {
  return (
    <ul>
      {lists.map((list) => (
        <li key={list.id}>
          <Link href={`/lists/${list.id}`}>{list.name}</Link>
        </li>
      ))}
    </ul>
  )
}

export default List
