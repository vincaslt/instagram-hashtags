type Props = {
  hashtags: string[]
}

function HashtagsList({ hashtags }: Props) {
  return (
    <ul>
      {hashtags.map((hashtag) => (
        <li key={hashtag}>
          <label>
            <input type="checkbox" /> #{hashtag}
          </label>
        </li>
      ))}
    </ul>
  )
}

export default HashtagsList
