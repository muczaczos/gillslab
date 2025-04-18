'use client'
import * as Lia from 'react-icons/lia'

export default function LiaIcon({
  name,
  size = 24,
  color = 'black',
}: {
  name: string
  size?: number
  color?: string
}) {
  const Icon = Lia[name as keyof typeof Lia] as React.ComponentType<{
    size?: number
    color?: string
  }>
  return Icon ? <Icon size={size} color={color} /> : <span>Invalid Lia Icon</span>
}
