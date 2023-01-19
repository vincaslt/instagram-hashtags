'use client'

import { Category, Hashtag } from '@prisma/client'
import { useRouter } from 'next/navigation'
import {
  ChangeEvent,
  FormEvent,
  ReactNode,
  startTransition,
  useLayoutEffect,
  useRef,
  useState,
} from 'react'
import { HiCheck, HiX } from 'react-icons/hi'
import { useAsync, useAsyncFn } from 'react-use'
import AddHashtagButton from './components/AddHashtagButton'
import CopyHashtagsButton from './components/CopyHashtagsButton'
import classNames from './utils'

type Props = {
  hashtags: (Hashtag & {
    categories: Category[]
  })[]
  filters: ReactNode
}

function List({ hashtags, filters }: Props) {
  const checkbox = useRef<HTMLInputElement>(null)
  const router = useRouter()
  const [checked, setChecked] = useState(false)
  const [indeterminate, setIndeterminate] = useState(false)
  const [selectedHashtags, setSelectedHashtags] = useState<string[]>([])
  const [newHashtagText, setNewHashtagText] = useState<string | null>(null)

  useLayoutEffect(() => {
    const isIndeterminate =
      selectedHashtags.length > 0 && selectedHashtags.length < hashtags.length
    setChecked(selectedHashtags.length === hashtags.length)
    setIndeterminate(isIndeterminate)
    if (checkbox.current) {
      checkbox.current.indeterminate = isIndeterminate
    }
  }, [hashtags.length, selectedHashtags])

  function toggleAll() {
    setSelectedHashtags(
      checked || indeterminate ? [] : hashtags.map((hashtag) => hashtag.id)
    )
    setChecked(!checked && !indeterminate)
    setIndeterminate(false)
  }

  const handleAddNewClick = () => {
    setNewHashtagText('')
  }

  const handleCloseClick = () => {
    setNewHashtagText(null)
  }

  const handleInputTextChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewHashtagText(e.target.value.trim())
  }

  const [submitState, handleSubmit] = useAsyncFn(
    async (e: FormEvent) => {
      e.preventDefault()

      if (!newHashtagText) {
        return
      }

      await sendNewHashtag(newHashtagText)

      startTransition(() => {
        // Refresh the current route and fetch new data from the server without
        // losing client-side browser or React state.
        router.refresh()
        setNewHashtagText(null)
      })
    },
    [newHashtagText, router]
  )

  const handleCopyClick = async () => {
    const selectedHashtagsText = hashtags
      .filter((hashtag) => selectedHashtags.includes(hashtag.id))
      .map((hashtag) => `#${hashtag.name}`)
      .join(' ')

    try {
      await navigator.clipboard.writeText(selectedHashtagsText)
      console.log('Content copied to clipboard')
    } catch (err) {
      console.error('Failed to copy: ', err)
    }
  }

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-between h-10 pl-6 mb-2 pt-0">
        <div className="flex items-center">
          <input
            type="checkbox"
            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 sm:left-6 cursor-pointer"
            ref={checkbox}
            checked={checked}
            onChange={toggleAll}
          />
          <span
            className={classNames(
              'pl-2 md:text-sm',
              selectedHashtags.length > 0 ? 'text-indigo-700' : 'text-gray-500'
            )}
          >
            {selectedHashtags.length} selected
          </span>
        </div>
        {filters}
      </div>
      <ul className="relative overflow-auto rounded-md border border-gray-300 bg-white text-gray-900">
        {hashtags.map((hashtag) => (
          <li
            key={hashtag.id}
            className={
              selectedHashtags.includes(hashtag.id)
                ? 'bg-indigo-50 even:bg-indigo-100'
                : 'even:bg-gray-50'
            }
          >
            <label className="flex items-center px-6 py-4 cursor-pointer">
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
              <span className="pl-2 md:text-sm">#{hashtag.name}</span>
              {hashtag.categories.length > 0 && (
                <div className="items-center justify-end flex-1 gap-1 hidden md:flex">
                  {hashtag.categories.map((category) => (
                    <span
                      key={category.id}
                      className={classNames(
                        'inline-flex items-center rounded bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-800',
                        selectedHashtags.includes(hashtag.id)
                          ? 'bg-indigo-200'
                          : 'bg-gray-100'
                      )}
                    >
                      {category.title}
                    </span>
                  ))}
                </div>
              )}
            </label>
          </li>
        ))}
        {newHashtagText !== null && (
          <li className="px-6 py-4 flex-1 bg-gray-50 border-t border-gray-300 sticky bottom-0">
            <form className="flex items-center gap-2" onSubmit={handleSubmit}>
              <input
                type="text"
                name="hashtag"
                autoFocus
                className="flex w-full min-w-0 max-w-xs rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm h-9"
                value={newHashtagText}
                onChange={handleInputTextChange}
              />
              <button
                type="submit"
                className="inline-flex flex-shrink-0 items-center justify-center rounded-md border w-9 h-9 min-w-9 border-transparent bg-indigo-600 text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                disabled={submitState.loading}
              >
                <HiCheck className="h-5 w-5" />
              </button>
              <button
                type="button"
                className="inline-flex flex-shrink-0 items-center justify-center rounded-md border w-9 h-9 min-w-9 border-gray-300 bg-white text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                onClick={handleCloseClick}
              >
                <HiX className="h-5 w-5" aria-hidden="true" />
              </button>
            </form>

            {/* TODO: assign categories */}
          </li>
        )}
      </ul>
      <div className="fixed justify-end items-center bottom-0 inset-x-0 flex p-3 space-x-2 pointer-events-none">
        <AddHashtagButton onClick={handleAddNewClick} />
        <CopyHashtagsButton onClick={handleCopyClick} />
      </div>
    </div>
  )
}

function sendNewHashtag(hashtag: string) {
  return fetch('api/hashtags', {
    method: 'POST',
    body: JSON.stringify({ hashtag }),
  })
}

export default List
