import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { motion, AnimatePresence } from 'framer-motion'
import useWeatherStore from '@/store/store'

interface Props {
  showSuggestions: boolean
  setShowSuggestions: React.Dispatch<React.SetStateAction<boolean>>
  search: string
  setSearch: React.Dispatch<React.SetStateAction<string>>
}

const SearchSuggestions: React.FC<Props> = ({
  showSuggestions,
  setShowSuggestions,
  search,
  setSearch,
}) => {
  const { suggestions, setCity } = useWeatherStore()
  return (
    <AnimatePresence>
      {showSuggestions && search.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2, ease: 'easeInOut' }}
          className="absolute z-10 mt-2 w-[300px]"
        >
          <Card>
            <CardHeader className="p-4">
              <CardTitle>Search Results</CardTitle>
            </CardHeader>
            <CardContent className="px-4 pt-0">
              {suggestions?.length > 0 ? (
                <ul>
                  {suggestions.map((city) => (
                    <li
                      key={city.id}
                      onClick={() => {
                        setCity(city.name)
                        setShowSuggestions(false)
                        setSearch('')
                      }}
                      className="p-2 hover:bg-gray-100 dark:hover:bg-[#181918] cursor-pointer rounded-md flex items-center justify-between"
                    >
                      <span className="text-[13px]">
                        {city.name}, {city.sys.country}
                      </span>
                      <span className="text-[13px]">{city.main.temp}°C</span>
                      <span className="text-[13px] text-gray-500">
                        {city.coord.lat}, {city.coord.lon}
                      </span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-center text-gray-500 text-[13px]">
                  No results found
                </p>
              )}
            </CardContent>
          </Card>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default SearchSuggestions
