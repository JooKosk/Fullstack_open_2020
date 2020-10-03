import React, { useEffect, useState } from 'react';
import axios from 'axios'
import Filter from './components/Filter'
import Countries from './components/Countries'


function App() {
  const [countries, setCountries] = useState([])
  const [filterText, setFilterText] = useState('')

useEffect(() => {
  axios
  .get('https://restcountries.eu/rest/v2/all')
  .then(response => {
    setCountries(response.data)
  })
}, [])

const searchResults =! filterText
? countries
: countries.filter(country => 
  country.name.toLowerCase().includes(filterText.toLowerCase()))

const handleFilterChange = (e) => {
  setFilterText(e.target.value)
}
const handleClick = (props) => {
  setFilterText(props)
}

  return (
    <div>
      <Filter filterText = {filterText} handleFilter = {handleFilterChange} />
      <Countries countriesToShow = {searchResults} handleClick = {handleClick} />
    </div>
  );
}

export default App;
