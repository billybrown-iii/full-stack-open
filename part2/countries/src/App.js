import './App.css'
import axios from 'axios'
import List from './List'
import { useEffect, useState } from 'react'
// @ts-ignore
// const apikey = process.env.REACT_APP_APIKEY

// console.log(
//   axios
//     .get('https://restcountries.com/v3.1/all')
//     .then((response) => console.log(response.data.find((obj) => obj.name.common === 'Kuwait')))
// )

// axios
//   .get('https://api.openweathermap.org/data/2.5/weather?lat=7.00&lon=30.00&appid=' + apikey)
//   .then((value) => console.log(value))

function App() {
  const [data, setData] = useState('')
  const [weatherData, setWeatherData] = useState('')
  const [query, setQuery] = useState('')

  const handleChange = (e) => {
    setQuery(e.target.value)
  }

  useEffect(() => {
    if (query.length > 0) {
      axios.get('https://restcountries.com/v3.1/all').then((response) => {
        const countries = response.data.filter((item) =>
          item.name.common.toLowerCase().includes(query.toLowerCase())
        )
        setData(countries)
        if (countries.length === 1) {
          axios
            .get(
              `https://api.open-meteo.com/v1/forecast?latitude=${countries[0].capitalInfo.latlng[0]}&longitude=${countries[0].capitalInfo.latlng[1]}&hourly=temperature_2m&current_weather=true&temperature_unit=fahrenheit`
            )
            .then((response) => setWeatherData(response?.data))
        }
      })
    }
  }, [query])

  return (
    <div className="App">
      <div>
        Find countries: <input onChange={handleChange} type="text" value={query} />
      </div>
      <div>
        <List data={data} setQuery={setQuery} weatherData={weatherData} />
      </div>
    </div>
  )
}

export default App
