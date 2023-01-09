'use client'

import { ReactNode } from 'react'
import { FaFilter } from 'react-icons/fa'
import classNames from '../../utils'
import { Drawer, useDrawer } from '../ui/Drawer'

type Props = {
  children: ReactNode
  className: string
}

export default function FiltersButton({ children, className }: Props) {
  const { isOpen, close, open } = useDrawer()

  return (
    <>
      <button
        type="button"
        className={classNames(
          'p-2 text-gray-400 hover:text-gray-500 sm:ml-6',
          className
        )}
        onClick={open}
      >
        <span className="sr-only">Filter</span>
        <FaFilter className="h-5 w-5" aria-hidden="true" />
      </button>

      <Drawer title="Filter" isOpen={isOpen} close={close}>
        {children}
      </Drawer>
    </>
  )
}
