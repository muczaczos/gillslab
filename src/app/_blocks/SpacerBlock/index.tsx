import React from 'react'

type Props = {
  height: number
}

export const SpacerBlock: React.FC<Props> = ({ height }) => {
  return (
    <div
      style={{
        height: `${height}px`,
        width: '100%',
        display: 'block',
        padding: 0,
        margin: 0,
        border: 'none',
        fontSize: 0,
        lineHeight: 0,
        overflow: 'hidden',
        position: 'relative',
      }}
    />
  )
}
