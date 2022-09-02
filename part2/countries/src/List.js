import LanguagesList from "./LanguagesList"

const List = ({ data, setQuery, weatherData }) => {
  let result
  if (!data) result = "Please enter some search criteria"
  else if (data.length > 10) result = "Please narrow your search."
  else if (data.length > 1)
    result = data.map((country) => (
      <div key={country.name.common}>
        {country.name.common}
        <button onClick={() => setQuery(country.name.common)}>Show</button>
      </div>
    ))
  else if (data.length === 1) {
    const country = data[0]
    const result1 = (
      <div>
        <h2>{country.name.common}</h2>
        <div>capital: {country.capital[0]}</div>
        <div>area: {country.area}</div>
        <br />
        <div>languages: </div>
        <LanguagesList data={country.languages} />
        <img style={{ width: "300px" }} src={country.flags.svg} alt="flag" />
      </div>
    )

    let result2 = null
    if (weatherData)
      result2 = (
        <div>
          <div>Current Temperature (Fahrenheit):</div>
          <div>{weatherData.current_weather.temperature}</div>
          <div>Current Wind Speed::</div>
          <div>{weatherData.current_weather.windspeed} mph</div>
        </div>
      )

    result = (
      <>
        {result1}
        {result2}
      </>
    )
  } else {
    result = "No countries found"
  }

  return <div>{result}</div>
}

export default List
