import React, { Suspense } from 'react'

const DynamicIcon = ({ library, name, size = 24, color = 'black' }) => {
  // Dynamiczny import
  const IconComponent = React.lazy(() =>
    import(`react-icons/${library}/index.js`).then(module => ({
      default: module[name] || (() => <span>Invalid Icon</span>),
    })),
  )

  return (
    <Suspense fallback={<span style={{ width: size, height: size }}>...</span>}>
      <IconComponent size={size} color={color} />
    </Suspense>
  )
}

export default DynamicIcon
