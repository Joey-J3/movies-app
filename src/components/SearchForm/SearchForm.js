import React, { useState } from 'react'
import SearchInput from './SearchInput'

function SearchForm() {
  const [value, setValue] = useState('')
  const onSearch = () => {}
  return (
    <div>
      <SearchInput value={value} onChange={setValue} />
      <button className="" onClick={onSearch}>
        Search
      </button>
    </div>
  )
}

export default SearchForm