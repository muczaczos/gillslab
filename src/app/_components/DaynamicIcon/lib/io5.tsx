'use client'
import * as Io5 from 'react-icons/io5'

export default function Io5Icon({
  name,
  size = 24,
  color = 'black',
}: {
  name: string
  size?: number
  color?: string
}) {
  const Icon = Io5[name as keyof typeof Io5] as React.ComponentType<{
    size?: number
    color?: string
  }>
  return Icon ? <Icon size={size} color={color} /> : <span>Invalid Io5 Icon</span>
}
