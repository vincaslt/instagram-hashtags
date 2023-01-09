'use client'

import { FaCopy } from 'react-icons/fa'
import CircularButton from './ui/CircularButton'

function CopyHashtagsButton() {
  const handleClick = () => {
    console.log('copy hashtags')
  }

  return (
    <CircularButton
      onClick={handleClick}
      className="w-9 h-9 text-sm"
      icon={<FaCopy />}
    />
  )
}

export default CopyHashtagsButton
