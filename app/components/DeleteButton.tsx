'use client'

import { useRef, useState } from 'react'
import { FaCheckCircle, FaTrash } from 'react-icons/fa'
import classNames from '../utils'

type Props = {
  onConfirm: () => Promise<void>
}

function DeleteButton({ onConfirm }: Props) {
  const timeoutRef = useRef<NodeJS.Timeout>()
  const [isConfirmationVisible, setConfirmationVisible] = useState(false)

  const buttonSettings = isConfirmationVisible
    ? {
        className: 'text-red-400 hover:text-red-500',
        icon: <FaCheckCircle className="h-5 w-5" aria-hidden="true" />,
        label: 'Confirm',
        onClick: async () => {
          if (timeoutRef.current) {
            clearTimeout(timeoutRef.current)
          }

          await onConfirm().then(() => {
            setConfirmationVisible(false)
          })
        },
      }
    : {
        className: 'text-gray-400 hover:text-gray-500',
        icon: <FaTrash className="h-5 w-5" aria-hidden="true" />,
        label: 'Delete',
        onClick: () => {
          setConfirmationVisible(true)
          timeoutRef.current = setTimeout(() => {
            setConfirmationVisible(false)
          }, 2000)
        },
      }

  return (
    <button
      type="button"
      className={classNames('p-2', buttonSettings.className)}
      onClick={buttonSettings.onClick}
    >
      <span className="sr-only">{buttonSettings.label}</span>
      {buttonSettings.icon}
    </button>
  )
}

export default DeleteButton
