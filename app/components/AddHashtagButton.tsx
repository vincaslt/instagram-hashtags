'use client'

import { ComponentProps } from 'react'
import CircularButton from './ui/CircularButton'

function AddHashtagButton(
  props: Omit<ComponentProps<typeof CircularButton>, 'className'>
) {
  return <CircularButton {...props} className="w-10 h-10 text-sm" />
}

export default AddHashtagButton
