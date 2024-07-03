import React from 'react'
import { FieldValues, UseFormRegister } from 'react-hook-form'

import classes from './index.module.scss'

type Props = {
  name: string
  label: string
  register: UseFormRegister<FieldValues & any>
  required?: boolean
  error: any
  type?: 'text' | 'number' | 'password' | 'email' | 'textarea'
  validate?: (value: string) => boolean | string
  placeholder?: string
  disabled?: boolean
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  className?: string
  value?: string
}

export const Input: React.FC<Props> = ({
  name,
  label,
  required,
  register,
  error,
  type = 'text',
  validate,
  placeholder,
  value, // Dodany atrybut defaultValue
  disabled,
  onChange,
  className,
}) => {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault() // Zignoruj standardowe zachowanie klawisza Enter
    }
  }
  return (
    <div className={classes.inputWrap}>
      <label htmlFor={name} className={classes.label}>
        {label}
        {required && <span className={classes.asterisk}>&nbsp;*</span>}
      </label>
      <input
        className={[className, classes.input, error && classes.error].filter(Boolean).join(' ')}
        type={type}
        placeholder={placeholder}
        {...register(name, {
          required,
          validate,
          ...(type === 'email'
            ? {
                pattern: {
                  value: /\S+@\S+\.\S+/,
                  message: 'Please enter a valid email',
                },
              }
            : {}),
        })}
        disabled={disabled}
        onChange={onChange}
        value={value} // Ustawienie wartości domyślnej za pomocą atrybutu defaultValue
        onKeyDown={handleKeyDown} // Dodaliśmy obsługę klawisza Enter
      />
      {error && (
        <div className={classes.errorMessage}>
          {!error?.message && error?.type === 'required'
            ? `This field is required. Please use the button below to processing form. `
            : error?.message}
        </div>
      )}
    </div>
  )
}
