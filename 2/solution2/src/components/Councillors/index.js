import React from 'react'
import { CouncillorsTable } from "./CouncillorsTable/CouncillorsTable"
import { FilterCouncillors } from "./FilterConcillors"
import { CouncillorsProvider } from "./providers/CouncillorsProvider"

const Councillors = () => {
  const [councillorsFilterBy, setCouncillorsFilterBy] = React.useState({
    value: '',
    field: 'id'
  })

  React.useEffect(() => {
    console.log(councillorsFilterBy)
  })

  return (
    <CouncillorsProvider>
      <FilterCouncillors filterBy={councillorsFilterBy} setFilterBy={setCouncillorsFilterBy} />
      <CouncillorsTable filterBy={councillorsFilterBy} />
    </CouncillorsProvider>
  )
}

export { Councillors }