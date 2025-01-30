import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api'
import React from 'react'

interface Props {
  weatherData: any
}

const containerStyle = {
  width: '100%',
  height: '300px',
  borderRadius: '8px',
}

const WeatherMap: React.FC<Props> = ({ weatherData }) => {
  return (
    <div className="w-full h-[300px] rounded-lg overflow-hidden">
      <LoadScript
        googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!}
      >
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={{ lat: weatherData.coord.lat, lng: weatherData.coord.lon }}
          zoom={10}
        >
          <Marker
            position={{
              lat: weatherData.coord.lat,
              lng: weatherData.coord.lon,
            }}
          />
        </GoogleMap>
      </LoadScript>
    </div>
  )
}

export default WeatherMap
