import React, { InputHTMLAttributes, useRef, useEffect } from 'react'
import { useField } from '@unform/core'
import { uniqueId } from 'lodash'

import { Container, Error } from './styles'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string
  label?: string
  tip?: string
}

const Input: React.FC<InputProps> = ({ name, label, tip, ...rest }) => {
  const inputRef = useRef<HTMLInputElement>(null)
  const fieldId = uniqueId('form-field-')

  const { fieldName, defaultValue, error, registerField } = useField(name)

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value'
    })
  }, [fieldName, registerField])

  return (
    <Container isErrored={!!error}>
      {label && (
        <label htmlFor={fieldId}>
          {label}
          {error && <Error> - {error}</Error>}
        </label>
      )}
      <input
        id={fieldId}
        defaultValue={defaultValue}
        ref={inputRef}
        {...rest}
      />
      {tip && <span>{tip}</span>}
    </Container>
  )
}

export default Input
