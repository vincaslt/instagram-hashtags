'use client'

import { Category } from '@prisma/client'
import { useRouter, useSearchParams, usePathname } from 'next/navigation'
import { ChangeEvent, startTransition } from 'react'

type Props = {
  categories: Category[]
}

export default function Filters({ categories }: Props) {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const router = useRouter()

  const activeFilters = searchParams.get('filter')?.split(',') || []

  const handleChangeFilter =
    (categoryId: string) => (e: ChangeEvent<HTMLInputElement>) => {
      const params = new URLSearchParams()
      if (e.target.checked) {
        params.append('filter', [...activeFilters, categoryId].join(','))
      } else if (activeFilters.length > 1) {
        params.append(
          'filter',
          activeFilters.filter((id) => id !== categoryId).join(',')
        )
      }

      startTransition(() => {
        // Refresh the current route and fetch new data from the server without
        // losing client-side browser or React state.
        router.replace(`${pathname}?${params.toString()}`)
      })
    }

  return (
    <form className="space-y-4">
      {categories.map((category) => (
        <div key={category.id} className="flex items-center">
          <label className="flex items-center cursor-pointer">
            <input
              name={`filters[]`}
              defaultValue={category.id}
              type="checkbox"
              className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer"
              onChange={handleChangeFilter(category.id)}
              checked={activeFilters.includes(category.id)}
            />
            <span className="ml-3 min-w-0 flex-1 text-gray-500">
              {category.title}
            </span>
          </label>
        </div>
      ))}
    </form>
  )
}
