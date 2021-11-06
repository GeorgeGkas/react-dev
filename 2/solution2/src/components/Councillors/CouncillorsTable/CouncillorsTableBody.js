const CouncillorsTableBody = ({ councillors }) => (
  <tbody>
    {
      councillors.map((councillor, i) => (
        <tr key={i}>
          <td>{councillor.id}</td>
          <td>{councillor.number}</td>
          <td>{councillor.council}</td>
          <td>{councillor.firstName}</td>
          <td>{councillor.lastName}</td>
          <td>{councillor.canton}</td>
          <td>{councillor.cantonName}</td>
          <td>{councillor.party}</td>
          <td>{councillor.partyName}</td>
          <td>{councillor.faction}</td>
          <td>{councillor.factionName}</td>
          <td>{councillor.function}</td>
        </tr>
      ))
    }
  </tbody>
)

export { CouncillorsTableBody }