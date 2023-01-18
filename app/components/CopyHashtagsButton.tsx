import { ComponentProps } from 'react'
import { FaCopy } from 'react-icons/fa'
import CircularButton from './ui/CircularButton'

function CopyHashtagsButton(
  props: Omit<ComponentProps<typeof CircularButton>, 'className' | 'icon'>
) {
  return (
    <CircularButton
      {...props}
      className="w-14 h-14 text-xl"
      icon={<FaCopy />}
    />
  )
}

export default CopyHashtagsButton
