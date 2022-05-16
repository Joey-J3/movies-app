import React from "react";

function SearchInput ({ value, onChange }) {
  const Input = React.createElement('input', {
    className: '',
    id: 'search',
    name: 'search',
    value,
    onChange: e => onChange(e.target.value)
  })
  return <>
    {Input}
    <label htmlFor='search' />
  </>
}

export default React.memo(SearchInput);