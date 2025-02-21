import React from 'react'

import classes from './index.module.scss'

interface RadioButtonProps {
  label: string
  value: string
  isSelected: boolean
  // eslint-disable-next-line no-unused-vars
  onRadioChange: (value: string) => void
  groupName: string
}

export const RadioButton: React.FC<RadioButtonProps> = ({
  label,
  value,
  isSelected,
  onRadioChange,
  groupName,
}) => {
  const handleRadioChange = () => {
    onRadioChange(value)
  }

  return (
    <label className={classes.radioWrapper}>
      <input
        type="radio"
        checked={isSelected}
        onChange={handleRadioChange}
        className={classes.radio}
        name={groupName}
        value={value}
      />
      {label}
    </label>
  )
}
