'use client'
import * as Tb from 'react-icons/tb'

export default function TbIcon({
  name,
  size = 24,
  color = 'black',
}: {
  name: string
  size?: number
  color?: string
}) {
  const Icon = Tb[name as keyof typeof Tb] as React.ComponentType<{ size?: number; color?: string }>
  return Icon ? <Icon size={size} color={color} /> : <span>Invalid Tb Icon</span>
}
