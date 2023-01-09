import { ReactNode } from 'react'
import classNames from '../../utils'

type Props = {
  children: ReactNode
  className: string
}

export default function FiltersSidebar({ children, className }: Props) {
  return (
    <section className={classNames('w-56 p-6 overflow-auto', className)}>
      {children}
    </section>
  )
}
