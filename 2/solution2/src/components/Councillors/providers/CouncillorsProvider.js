import React from "react";
import axios from 'axios'

const COUNCILLORS_ENDPOINT_JSON = '/councillors.json'

const CouncillorsContext = React.createContext(null);

const CouncillorsProvider = ({ children }) => {
  const [councillors, setCouncillors] = React.useState([])

  React.useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(COUNCILLORS_ENDPOINT_JSON)
      setCouncillors(res.data)
    }

    fetchData()
  }, [])

  return (
    <CouncillorsContext.Provider value={{ councillors }}>
      {children}
    </CouncillorsContext.Provider>
  )
}

const useCouncillors = () => React.useContext(CouncillorsContext)

export {
  CouncillorsProvider,
  useCouncillors
}