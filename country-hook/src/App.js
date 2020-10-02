import React, { useState, useEffect } from 'react'
import countryService from './services/countries'


const useField = (type) => {
  const [value, setData] = useState('')

  const onChange = (event) => {
    setData(event.target.value)
  }

  return {
    type,
    value,
    onChange
  }
}

const useCountry = (name) => {
  const [data, setData] = useState(null)
  const [found, setFound] = useState(false)

  useEffect(() => {
    console.log("start effect")
    countryService
      .getOne(name)
      .then(response => {
        console.log('!!!!!!!', response)
        if (response) {
          setData(response[0])
          setFound(true)
        } else {
          setData(null)
          setFound(false)
        }
      })
  }, [name])

  return {
    data,
    found
  }
}

const Country = ({ country }) => {
  if (country === null) {
    return null
  }

  if (!country.found) {
    return (
      <div>
        not found...
      </div>
    )
  }

  return (
    <div>
      <h3>{country.data.name} </h3>
      <div>capital {country.data.capital} </div>
      <div>population {country.data.population}</div> 
      <img src={country.data.flag} height='100' alt={`flag of ${country.data.name}`}/>  
    </div>
  )
}

const App = () => {
  const nameInput = useField('text')
  const [name, setName] = useState('')
  const country = useCountry(name)

  const fetch = (e) => {
    e.preventDefault()
    setName(nameInput.value)
  }

  return (
    <div>
      <form onSubmit={fetch}>
        <input {...nameInput} />
        <button>find</button>
      </form>

      <Country country={country} />
    </div>
  )
}

export default App