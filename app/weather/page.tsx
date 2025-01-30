import React from 'react'
import WeatherSearch from '../components/weatherSearch/WeatherSearch'
import WeatherData from '../components/weatherData/WeatherData'
import HeadPage from '../components/headPage/HeadPage'

const route = () => {
  return (
    <div className="">
      {/* head page */}
      <HeadPage />

      {/* weather search */}
      <WeatherSearch />

      {/* weather data */}
      <WeatherData />
    </div>
  )
}

export default route
