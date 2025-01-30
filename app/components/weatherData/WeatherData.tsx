'use client'

import useWeatherStore from '@/store/store'
import React, { useEffect } from 'react'
import WeatherMap from '../weatherMap/WeatherMap'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import Spinner from '../spinner/Spinner'

const WeatherData = () => {
  const { city, fetchWeather, weatherData, loading } = useWeatherStore()

  useEffect(() => {
    ;(async () => {
      await fetchWeather(city)
    })()
  }, [city])

  return (
    <div className="my-10">
      <div className="container-80">
        {/* loading spinner */}
        {loading && <Spinner />}

        {/* weather data */}
        {weatherData && (
          <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-5">
            <Card className="w-full h-[300px]">
              <CardHeader className="px-4">
                <CardTitle>
                  Weather in {weatherData?.name}, {weatherData?.sys.country}
                </CardTitle>
              </CardHeader>
              <CardContent className="h-3/4 px-4 py-0">
                <div className="flex flex-col items-center justify-center h-1/2">
                  <h3 className="text-3xl font-bold">
                    {weatherData?.main.temp}°C
                  </h3>

                  <span className="text-sm text-gray-500 -mt-1 block">
                    {weatherData?.weather[0].main}
                  </span>
                </div>
                <div className="flex items-center justify-between gap-4 h-1/2">
                  <div>
                    <p className="text-[13px] text-slate-500">
                      Temperature: {weatherData?.main.temp}°C
                    </p>
                    <p className="text-[13px] text-slate-500">
                      Feels Like: {weatherData?.main.feels_like}°C
                    </p>
                    <p className="text-[13px] text-slate-500">
                      Humidity: {weatherData?.main.humidity}%
                    </p>
                    <p className="text-[13px] text-slate-500">
                      Wind Speed: {weatherData?.wind.speed} m/s
                    </p>
                  </div>
                  <img
                    src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}.png`}
                    alt="Weather Icon"
                    width={70}
                    height={70}
                  />
                </div>
              </CardContent>
            </Card>
            {/* weather map */}
            <WeatherMap weatherData={weatherData} />
          </div>
        )}
      </div>
    </div>
  )
}

export default WeatherData
