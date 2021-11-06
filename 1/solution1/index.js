// Note: Assume modern version of browsers to leverage async/await syntax.

// Note: Due to a CORS issue with the http://ws-old.parlament.ch server (Cross-Origin Request Blocked), we
//       are not able to fetch the endpoints.
//       It seems that the server do not allow cross origin requests from foreign resources.
//       Need to investigate further.
const COUNCILLORS_ENDPOINT_JSON = '/councillors.json'
const DESIRED_COUNSELLORS_DATA_IN_UI = [
  'id',
  'number',
  'council',
  'firstName',
  'lastName',
  'canton',
  'cantonName',
  'party',
  'partyName',
  'faction',
  'factionName',
  'function'
]

// Simulate a global state to make UI data management easier.
const GLOBAL_STATE = {
  councillors: [],
  filteredCouncillors: []
}

async function fetchCouncillorsBasicDataToArray() {
  const res = await fetch(COUNCILLORS_ENDPOINT_JSON)
  const data = await res.json()
  return data
}

async function populateCouncillorTable(councillors) {
  try {
    const councillorsTable = document.getElementById('councillors-table')
    const councillorsTableBody = document.createElement('tbody')
    councillorsTable.appendChild(councillorsTableBody)

    for (const councillor of councillors) {
      const councillorRow = generateCouncillorRow(councillor)
      councillorsTable.tBodies[0].appendChild(councillorRow)
    }
  } catch {
    console.error('error')
  }
}

function generateCouncillorRow(councillor) {
  const row = document.createElement('tr')

  for (const field of DESIRED_COUNSELLORS_DATA_IN_UI) {
    const td = document.createElement('td')
    const data = document.createTextNode(councillor[field])

    td.appendChild(data)
    row.appendChild(td)
  }

  return row
}

function normalizeDiacritics(str) {
  return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
}

function compareLocaleStrings(a, b) {
  const a_normalized = normalizeDiacritics(a.toLocaleLowerCase())
  const b_normalized = normalizeDiacritics(b.toLocaleLowerCase())

  return a_normalized.localeCompare(b_normalized)
}

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

function repopulateCouncillorTable(councillors) {
  const councillorsTable = document.getElementById('councillors-table');
  const councillorsTableBody = councillorsTable.tBodies[0]
  councillorsTable.removeChild(councillorsTableBody)

  populateCouncillorTable(councillors)
}

function sortCouncillorsTableColumnsByField(councillors, fieldName) {
  return function (e) {
    const sortingType = e.target.dataset.sort ?? 'asc'
    const sortedCouncillors = sortCouncillorsDataByField(councillors, fieldName, sortingType)
    GLOBAL_STATE.filteredCouncillors = sortedCouncillors

    repopulateCouncillorTable(GLOBAL_STATE.filteredCouncillors)
    e.target.setAttribute('data-sort', sortingType === 'asc' ? 'desc' : 'asc')
    e.target.className = 'sort-' + sortingType === 'sort-asc' ? 'sort-desc' : 'sort-asc'
  }
}

function filterCouncillorsByValueAndField(councillors, filterValue, filterField) {
  return councillors.filter(councillor => String(councillor[filterField]).startsWith(filterValue))
}

function filterCouncillors() {
  const filterValue = document.getElementById('filter-input').value
  const filterField = document.getElementById('filter-select').value

  if (!filterValue) {
    repopulateCouncillorTable(GLOBAL_STATE.councillors)
    GLOBAL_STATE.filteredCouncillors = GLOBAL_STATE.councillors
  } else {
    GLOBAL_STATE.filteredCouncillors = filterCouncillorsByValueAndField(GLOBAL_STATE.councillors, filterValue, filterField)
    repopulateCouncillorTable(GLOBAL_STATE.filteredCouncillors)
  }
}