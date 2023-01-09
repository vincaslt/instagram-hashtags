import { useState } from 'react'

function useDrawer() {
  const [isOpen, setOpen] = useState(false)

  const open = () => setOpen(true)
  const close = () => setOpen(false)

  return {
    isOpen,
    open,
    close,
  }
}

export default useDrawer
