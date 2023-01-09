import { ButtonHTMLAttributes, DetailedHTMLProps, ReactNode } from 'react'
import { FaPlus } from 'react-icons/fa'
import classNames from '../../utils'

type Props = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> & {
  icon?: ReactNode
}

function CircularButton({ icon, className, ...rest }: Props) {
  return (
    <button
      type="button"
      className={classNames(
        'inline-flex items-center justify-center rounded-full border border-transparent bg-indigo-600 text-white shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2',
        className
      )}
      {...rest}
    >
      {icon ?? <FaPlus />}
    </button>
  )
}

export default CircularButton
