'use client'
import * as Gi from 'react-icons/gi'

export default function GiIcon({
  name,
  size = 24,
  color = 'black',
}: {
  name: string
  size?: number
  color?: string
}) {
  const Icon = Gi[name as keyof typeof Gi] as React.ComponentType<{ size?: number; color?: string }>
  return Icon ? <Icon size={size} color={color} /> : <span>Invalid Gi Icon</span>
}
