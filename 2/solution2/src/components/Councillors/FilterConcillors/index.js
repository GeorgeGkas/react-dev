import React from 'react'

const FilterCouncillors = ({ filterBy, setFilterBy }) => {
  const onValueChange = (e) => setFilterBy({
    ...filterBy,
    value: e.target.value
  })

  const onFieldChange = (e) => setFilterBy({
    ...filterBy,
    field: e.target.value
  })


  return (
    <form>
      <label>Filter:</label>
      <input type='text' onInput={onValueChange}/>
      <select type='text' onChange={onFieldChange} value={filterBy.field}>
        <option value="id">Id</option>
        <option value="firstName">First name</option>
        <option value="lastName">Last name</option>
      </select>
      <small>Data filtering is case sensitive.</small>
    </form>
  )
}

export { FilterCouncillors }