'use client'

import { Input } from '@/components/ui/input'
import useWeatherStore from '@/store/store'
import { LocateFixed, Search } from 'lucide-react'
import React, { use, useCallback, useEffect, useRef, useState } from 'react'
import { debounce } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import SearchSuggestions from '../searchSuggestions/SearchSuggestions'

const WeatherSearch = () => {
  const [search, setSearch] = useState('')
  const [showSuggestions, setShowSuggestions] = useState(false)
  const { fetchSuggestions, fetchWeatherByCoords } = useWeatherStore()
  const weatherSearch = useRef<HTMLInputElement>(null)

  // Fetch weather by coordinates
  const handleGeolocation = () => {
    if (!navigator.geolocation) {
      alert('Geolocation is not supported by your browser.')
      return
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords
        await fetchWeatherByCoords(latitude, longitude)
      },
      (error) => {
        console.error('Geolocation error:', error)
        alert('Failed to get location. Please enable location services.')
      }
    )
  }

  // Fetch suggestions
  const debouncedFetchSuggestions = useCallback(
    debounce((query: string) => {
      if (query) {
        fetchSuggestions(query)
        setShowSuggestions(true)
      }
    }, 300),
    []
  )

  useEffect(() => {
    debouncedFetchSuggestions(search)
  }, [search, debouncedFetchSuggestions])

  // Close suggestions when click outside
  useEffect(() => {
    const handleClickOutSide = (e: any) => {
      if (weatherSearch.current && !weatherSearch.current.contains(e.target)) {
        setShowSuggestions(false)
      }
    }
    document.addEventListener('click', handleClickOutSide)
    return () => {
      document.removeEventListener('click', handleClickOutSide)
    }
  }, [])

  return (
    <div className="py-5 bg-gray-100 dark:bg-[#090F0A]">
      <div className="relative  container-80" ref={weatherSearch}>
        <div className="flex items-center gap-4">
          {/* Search Input */}
          <div className="relative w-full md:max-w-[300px]">
            <Search
              className="absolute top-1/2 left-2 -translate-y-1/2 text-gray-400"
              size={20}
            />
            <Input
              type="text"
              placeholder="Search for a city..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onFocus={() => setShowSuggestions(true)}
              className="w-full pl-8 bg-white dark:bg-black"
            />
          </div>
          {/* Geolocation Button */}
          <Button onClick={handleGeolocation} variant="outline" size="icon">
            <LocateFixed size={20} />
          </Button>
        </div>

        {/* Suggestions with Animation */}
        <SearchSuggestions
          search={search}
          setSearch={setSearch}
          showSuggestions={showSuggestions}
          setShowSuggestions={setShowSuggestions}
        />
      </div>
    </div>
  )
}

export default WeatherSearch
