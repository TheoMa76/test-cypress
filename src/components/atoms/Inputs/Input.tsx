import React from 'react'

interface Props {
    placeholder: string
    value: string
    id: string
    onSubmit: (e: React.FormEvent<HTMLFormElement>) => void
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const Input: React.FC<Props> = ({placeholder,value,id,onSubmit,onChange}) => {

  return (
    <form onSubmit={onSubmit}>
        <input
            type="text"
            placeholder={placeholder}
            value={value}
            id={id}
            onChange={onChange}
        />
    </form>
  )
}

export default Input