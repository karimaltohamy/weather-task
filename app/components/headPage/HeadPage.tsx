import React from 'react'

import './headPage.scss'
import ThemeToggle from '../themeToggle/ThemeToggle'

const HeadPage = () => {
  return (
    <div className="h-[250px] w-full head_page">
      <div className="container-80 h-full relative">
        <div className="h-full w-full flex flex-col justify-center">
          <h1 className="text-2xl md:text-4xl md:mb-3 font-semibold">
            Weather Dashboard
          </h1>
          <p className="text-gray-300">
            Get the latest weather updates for your city
          </p>
        </div>
        {/* Theme Toggle */}
        <div className="absolute top-5 right-0 z-10 flex items-center gap-3">
          <ThemeToggle />
        </div>
      </div>
    </div>
  )
}

export default HeadPage
