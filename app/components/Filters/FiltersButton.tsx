'use client'

import { useSearchParams } from 'next/navigation'
import { ReactNode } from 'react'
import { FaFilter } from 'react-icons/fa'
import classNames from '../../utils'
import { Drawer, useDrawer } from '../ui/Drawer'

type Props = {
  filters: ReactNode
  className: string
}

export default function FiltersButton({ filters, className }: Props) {
  const searchParams = useSearchParams()
  const activeFiltersCount = searchParams.get('filter')?.split(',').length ?? 0
  const { isOpen, close, open } = useDrawer()

  const hasActiveFilters = activeFiltersCount > 0

  return (
    <div
      className={classNames(
        'flex gap-1 items-center',
        hasActiveFilters ? 'text-indigo-400' : 'text-gray-400',
        className
      )}
    >
      {hasActiveFilters && (
        <span className="inline-flex">{activeFiltersCount}</span>
      )}

      <button
        type="button"
        className={classNames(
          'p-2',
          hasActiveFilters
            ? 'text-indigo-400 hover:text-indigo-500'
            : 'text-gray-400 hover:text-gray-500'
        )}
        onClick={open}
      >
        <span className="sr-only">Filter</span>
        <FaFilter className="h-5 w-5" aria-hidden="true" />
      </button>

      <Drawer title="Filter" isOpen={isOpen} close={close}>
        {filters}
      </Drawer>
    </div>
  )
}
