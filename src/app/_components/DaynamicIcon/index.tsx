'use client'

import dynamic from 'next/dynamic'

const GiIcons = dynamic(() => import('./lib/gi'))
const Io5Icons = dynamic(() => import('./lib/io5'))
const LiaIcons = dynamic(() => import('./lib/lia'))
const TbIcons = dynamic(() => import('./lib/tb'))

type Props = {
  library: 'gi' | 'io5' | 'lia' | 'tb'
  name: string
  size?: number
  color?: string
}

export default function DynamicIcon({ library, name, size = 24, color = 'black' }: Props) {
  const iconProps = { size, color }

  switch (library) {
    case 'gi':
      return <GiIcons name={name} {...iconProps} />
    case 'io5':
      return <Io5Icons name={name} {...iconProps} />
    case 'lia':
      return <LiaIcons name={name} {...iconProps} />
    case 'tb':
      return <TbIcons name={name} {...iconProps} />
    default:
      return <span>Invalid Icon</span>
  }
}
