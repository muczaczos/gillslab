import React from 'react'
import * as GameIcons from 'react-icons/gi'
import * as Ionicons from 'react-icons/io5'
import * as LineAwesome from 'react-icons/lia'
import * as TablerIcons from 'react-icons/tb'

const DynamicIcon = ({ library, name, size = 24, color = 'black' }) => {
  const libraries = {
    gi: GameIcons,
    io5: Ionicons,
    lia: LineAwesome,
    tb: TablerIcons,
  }

  const IconLibrary = libraries[library]
  const IconComponent = IconLibrary ? IconLibrary[name] : null

  return IconComponent ? <IconComponent size={size} color={color} /> : <span>Invalid Icon</span>
}

export default DynamicIcon
