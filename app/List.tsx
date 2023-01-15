'use client'

import { Category, Hashtag } from '@prisma/client'
import { ReactNode, useLayoutEffect, useRef, useState } from 'react'
import classNames from './utils'

type Props = {
  hashtags: (Hashtag & {
    categories: Category[]
  })[]
  filters: ReactNode
}

function List({ hashtags, filters }: Props) {
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
    setSelectedHashtags(
      checked || indeterminate ? [] : hashtags.map((hashtag) => hashtag.id)
    )
    setChecked(!checked && !indeterminate)
    setIndeterminate(false)
  }

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-between h-10 pl-4 mb-2 pt-0">
        <div className="flex items-center">
          <input
            type="checkbox"
            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 sm:left-6 cursor-pointer"
            ref={checkbox}
            checked={checked}
            onChange={toggleAll}
          />
          <span className="pl-4 text-gray-500 text-sm">
            {selectedHashtags.length} selected
          </span>
        </div>
        {filters}
      </div>
      <ul className="flex flex-col overflow-auto bg-white rounded-md border">
        {hashtags.map((hashtag) => (
          <li
            key={hashtag.id}
            className={classNames(
              'flex relative border-b last:border-b-0 group',
              selectedHashtags.includes(hashtag.id) ? 'bg-gray-50' : undefined
            )}
          >
            <label className="flex items-center p-4 flex-1 cursor-pointer">
              {selectedHashtags.includes(hashtag.id) && (
                <div className="absolute -inset-y-[1px] group-[:last-child]:-inset-y-0 -left-0 w-0.5 bg-indigo-600" />
              )}
              <input
                type="checkbox"
                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 sm:left-6 cursor-pointer"
                value={hashtag.id}
                checked={selectedHashtags.includes(hashtag.id)}
                onChange={(e) =>
                  setSelectedHashtags(
                    e.target.checked
                      ? [...selectedHashtags, hashtag.id]
                      : selectedHashtags.filter((p) => p !== hashtag.id)
                  )
                }
              />
              <span className="pl-4">#{hashtag.name}</span>
              <div className="items-center justify-end flex-1 gap-1 hidden md:flex">
                {hashtag.categories.map((category) => (
                  <span
                    key={category.id}
                    className="inline-flex items-center rounded bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-800"
                  >
                    {category.title}
                  </span>
                ))}
              </div>
            </label>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default List
