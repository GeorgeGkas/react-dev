import React from 'react'
import { useCouncillors } from "../providers/CouncillorsProvider"

import './CouncillorsTable.css'
import { compareLocaleStrings } from '../../../utils'
import { CouncillorsTableBody } from './CouncillorsTableBody'

function sortCouncillorsDataByField(councillors, fieldName, sortingType) {
  return councillors.sort((a, b) => {
    if (sortingType === 'asc') {
      if (typeof a[fieldName] === 'number') {
        return a[fieldName] <= b[fieldName]
      } else {
        return compareLocaleStrings(a[fieldName], b[fieldName]) >= 0
      }
    } else {
      if (typeof a[fieldName] === 'number') {
        return a[fieldName] > b[fieldName]
      } else {
        return compareLocaleStrings(a[fieldName], b[fieldName]) < 0
      }
    }
  })
}

const CouncillorsTable = ({ filterBy }) => {
  const { councillors } = useCouncillors()
  const [filteredCouncillors, setFilteredCouncillors] = React.useState([])
  const [sortingType, setSortingType] = React.useState({
    id: 'asc',
    firstName: 'asc',
    lastName: 'asc'
  })

  React.useEffect(() => {
    setFilteredCouncillors(councillors)
  }, [councillors])

  React.useEffect(() => {
    if (!filterBy.value) {
      setFilteredCouncillors(councillors)
    } else {
      const newFilteredConcillors =  councillors.filter(councillor => String(councillor[filterBy.field]).startsWith(filterBy.value))
      setFilteredCouncillors(newFilteredConcillors)
    }
  }, [filterBy, councillors])

  const sortCouncillorsTableColumnsByField = (fieldName) => () => {
    const sortedCouncillors = sortCouncillorsDataByField(filteredCouncillors, fieldName, sortingType[fieldName])
    setFilteredCouncillors(sortedCouncillors)
    setSortingType({
      ...sortingType,
      [fieldName]: sortingType[fieldName] === 'asc' ? 'desc' : 'asc'
    })
  }

  return (
    <table id="councillors-table">
      <thead>
        <tr>
          <th className={`sort-${sortingType.id}`} onClick={sortCouncillorsTableColumnsByField('id')}>Id</th>
          <th>Number</th>
          <th>Council</th>
          <th className={`sort-${sortingType.firstName}`} onClick={sortCouncillorsTableColumnsByField('firstName')}>First Name
          </th>
          <th className={`sort-${sortingType.lastName}`} onClick={sortCouncillorsTableColumnsByField('lastName')}>Last Name
          </th>
          <th>Canton</th>
          <th>Canton name</th>
          <th>Party</th>
          <th>Party Name</th>
          <th>Faction</th>
          <th>FactionName</th>
          <th>Function</th>
        </tr>
      </thead>
      <CouncillorsTableBody councillors={filteredCouncillors} />
    </table>
  )
}

export { CouncillorsTable }