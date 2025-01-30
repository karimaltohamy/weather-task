export interface Suggestion {
  id: number
  name: string
  coord: {
    lat: number
    lon: number
  }
  main: {
    temp: number
    feels_like: number
    temp_min: number
    temp_max: number
    pressure: number
    humidity: number
    sea_level?: number
    grnd_level?: number
  }
  dt: number
  wind: {
    speed: number
    deg: number
  }
  sys: {
    country: string
  }
  rain?: null | Record<string, number>
  snow?: null | Record<string, number>
  clouds: {
    all: number
  }
  weather: {
    id: number
    main: string
    description: string
    icon: string
  }[]
}

export interface WeatherData {
  coord: {
    lon: number
    lat: number
  }
  weather: {
    id: number
    main: string
    description: string
    icon: string
  }[]
  main: {
    temp: number
    feels_like: number
    temp_min: number
    temp_max: number
    pressure: number
    humidity: number
  }
  wind: {
    speed: number
    deg: number
  }
  sys: {
    country: string
  }
  name: string
}

export interface WeatherStore {
  city: string
  weatherData: WeatherData | null
  suggestions: Suggestion[]
  loading: boolean
  error: string | null

  setCity: (city: string) => void
  setWeatherData: (data: WeatherData) => void
  setSuggestions: (suggestions: Suggestion[]) => void
  setLoading: (loading: boolean) => void
  setError: (error: string) => void

  fetchSuggestions: (query: string) => Promise<void>
  fetchWeather: (city: string) => Promise<void>
  fetchWeatherByCoords: (latitude: number, longitude: number) => Promise<void>
}
