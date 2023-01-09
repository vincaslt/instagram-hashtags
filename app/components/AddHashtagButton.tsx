'use client'

import CircularButton from './ui/CircularButton'

function AddHashtagButton() {
  const handleClick = () => {
    console.log('add hashtag')
  }

  return <CircularButton onClick={handleClick} className="w-14 h-14 text-xl" />
}

export default AddHashtagButton
