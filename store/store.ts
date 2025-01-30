import apiAxios from '@/lib/apiAxios'
import { WeatherStore } from '@/types/weather'
import { toast } from 'sonner'
import { create } from 'zustand'

const useWeatherStore = create<WeatherStore>((set) => ({
  city: '',
  weatherData: null,
  suggestions: [],
  loading: false,
  error: null,

  setCity: (city: string) => set({ city }),
  setWeatherData: (data: any) => set({ weatherData: data }),
  setSuggestions: (suggestions: any) => set({ suggestions }),
  setLoading: (loading: boolean) => set({ loading }),
  setError: (error: string) => set({ error }),

  fetchSuggestions: async (query: string) => {
    if (!query) return
    set({ loading: true, error: null })
    try {
      const { data } = await apiAxios.get(
        `find?q=${query}&appid=${process.env.NEXT_PUBLIC_OPENWEATHERMAP_API_KEY}&units=metric`
      )
      set({ suggestions: data.list })
    } catch (error) {
      set({ error: 'Failed to fetch suggestions' })
      toast.error('Failed to fetch suggestions')
    } finally {
      set({ loading: false })
    }
  },

  fetchWeather: async (city: string) => {
    if (!city) return
    set({ loading: true, error: null })
    try {
      const { data } = await apiAxios.get(
        `weather?q=${city}&appid=${process.env.NEXT_PUBLIC_OPENWEATHERMAP_API_KEY}&units=metric`
      )

      if (data.cod === '404') toast.error('City not found')
      set({ weatherData: data })
    } catch (error: any) {
      set({ error: error.message })
      toast.error(error.message)
    } finally {
      set({ loading: false })
    }
  },
  fetchWeatherByCoords: async (latitude: number, longitude: number) => {
    if (!latitude || !longitude) return
    set({ loading: true, error: null })

    try {
      const { data } = await apiAxios.get(
        `weather?lat=${latitude}&lon=${longitude}&appid=${process.env.NEXT_PUBLIC_OPENWEATHERMAP_API_KEY}&units=metric`
      )

      if (data.cod === '404') toast.error('City not found')
      set({ weatherData: data })
    } catch (error: any) {
      set({ error: error.message })
      toast.error(error.message)
    } finally {
      set({ loading: false })
    }
  },
}))

export default useWeatherStore
