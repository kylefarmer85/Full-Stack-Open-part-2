import React from 'react'

const Weather = ({temperature, weather_icons, wind_speed, wind_dir}) => {

  return (
  <div>
    <h3>temperature: {temperature}</h3>
    <img src={weather_icons} alt="weather icon"/>
    <h3>wind: {wind_speed} mph direction {wind_dir} </h3>
  </div>
  )
}


export default Weather