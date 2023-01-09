'use client'

import { useLayoutEffect, useRef, useState } from 'react'
import { Filters, FiltersButton } from './components/Filters'
import classNames from './utils'

type Props = {
  hashtags: string[]
}

function List({ hashtags }: Props) {
  const checkbox = useRef<HTMLInputElement>(null)
  const [checked, setChecked] = useState(false)
  const [indeterminate, setIndeterminate] = useState(false)
  const [selectedHashtags, setSelectedHashtags] = useState<string[]>([])

  useLayoutEffect(() => {
    const isIndeterminate =
      selectedHashtags.length > 0 && selectedHashtags.length < hashtags.length
    setChecked(selectedHashtags.length === hashtags.length)
    setIndeterminate(isIndeterminate)
    if (checkbox.current) {
      checkbox.current.indeterminate = isIndeterminate
    }
  }, [selectedHashtags])

  function toggleAll() {
    setSelectedHashtags(checked || indeterminate ? [] : hashtags)
    setChecked(!checked && !indeterminate)
    setIndeterminate(false)
  }

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-between h-10 pl-4 mb-2 pt-0">
        <div className="flex items-center">
          <input
            type="checkbox"
            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 sm:left-6"
            ref={checkbox}
            checked={checked}
            onChange={toggleAll}
          />
          <span className="pl-4 text-gray-500 text-sm">
            {selectedHashtags.length} selected
          </span>
        </div>
        <FiltersButton className="md:hidden">
          <Filters />
        </FiltersButton>
      </div>
      <ul className="flex flex-col overflow-auto bg-white rounded-md border">
        {hashtags.map((hashtag) => (
          <li
            key={hashtag}
            className={classNames(
              'flex items-center relative p-4 border-b last:border-b-0',
              selectedHashtags.includes(hashtag) ? 'bg-gray-50' : undefined
            )}
          >
            {selectedHashtags.includes(hashtag) && (
              <div className="absolute -inset-y-[1px] -left-0 w-0.5 bg-indigo-600" />
            )}
            <input
              type="checkbox"
              className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 sm:left-6"
              value={hashtag}
              checked={selectedHashtags.includes(hashtag)}
              onChange={(e) =>
                setSelectedHashtags(
                  e.target.checked
                    ? [...selectedHashtags, hashtag]
                    : selectedHashtags.filter((p) => p !== hashtag)
                )
              }
            />
            <span className="pl-4">#{hashtag}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default List
