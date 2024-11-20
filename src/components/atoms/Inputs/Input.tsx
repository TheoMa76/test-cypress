import React, { useState } from 'react'

interface Props {
    placeholder: string
    value: string
    onSubmit: (e: React.FormEvent<HTMLFormElement>, searchTerm: string) => void
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    ide: string
}

const Input: React.FC<Props> = ({ placeholder, value, onSubmit, onChange, ide }) => {

  return (
    <form onSubmit={(e) => onSubmit(e, value)} style={{ display: 'flex', alignItems: 'center' }}>
        <input
            type="text"
            id={ide}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            style={{ padding: '8px', fontSize: '16px', marginRight: '8px', flex: '1' }}
        />
        <button
            type="submit"
            id="search-button"
            style={{
                padding: '8px 16px',
                fontSize: '16px',
                cursor: 'pointer',
                backgroundColor: '#007bff',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
            }}
        >
            Search
        </button>
    </form>
  )
}

export default Input
