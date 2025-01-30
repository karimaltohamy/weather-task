# Weather Application 🌦️

A React-based weather application that allows users to search for cities, view weather details, and manage their preferences. The application integrates with the OpenWeatherMap API to fetch real-time weather data.

&#x20;

---

## Table of Contents

1. [Features](#features)
2. [Installation](#installation)
3. [Usage](#usage)
4. [State Management](#state-management)
5. [API Integration](#api-integration)
6. [Components](#components)
7. [Styling](#styling)
8. [Contributing](#contributing)
9. [License](#license)

---

## Features

- **City Search**: Search for cities and view weather suggestions.
- **Weather Details**: Display detailed weather information for the selected city.
- **Debounced Search**: Reduces API calls with debounced search functionality.
- **Responsive Design**: Works seamlessly across devices.
- **Global State Management**: Uses Zustand for efficient state management.

---

## Installation

Follow these steps to set up the project locally:

### Clone the Repository

```bash
git clone https://github.com/karimaltohamy/weather-task
cd weather-task
```

### Install Dependencies

The project uses the following key dependencies:

- **UI Components**: @radix-ui/react-dropdown-menu, @radix-ui/react-popover, @radix-ui/react-slot, lucide-react, shadcn-ui
- **State Management**: Zustand
- **Styling**: Tailwind CSS, tailwind-merge, tailwindcss-animate, Sass
- **Animation**: Framer Motion
- **API Integration**: Axios, @react-google-maps/api
- **Theming**: next-themes
- **Utilities**: class-variance-authority, clsx, sonner

Install them by running:

```bash
npm install
```

### Set Up Environment Variables

Create a `.env` file in the root directory and add your OpenWeatherMap API key:

```env
NEXT_PUBLIC_OPENWEATHERMAP_API_KEY=your_api_key_here
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_api_key_here
```

### Run the Application

```bash
npm start
```

### Open the Application

Visit [http://localhost:3000](http://localhost:3000) in your browser.

---

## Usage

1. Search for a city using the search bar.
2. Select a city from the suggestions.
3. View detailed weather information.
4. Switch themes if desired.

---

## State Management

The application uses Zustand for global state management. The store is defined in `src/store/store.js` and includes the following:

### State:

- `suggestions`: Array of city suggestions.
- `selectedCity`: The currently selected city.

### Actions:

- `fetchSuggestions(query)`: Fetches city suggestions from the API.
- `setCity(city)`: Sets the selected city.

Example store setup:

```javascript
import { create } from 'zustand'

const useWeatherStore = create((set) => ({
  suggestions: [],
  selectedCity: null,
  fetchSuggestions: async (query) => {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/find?q=${query}&appid=${process.env.NEXT_PUBLIC_OPENWEATHERMAP_API_KEY}`
    )
    const data = await response.json()
    set({ suggestions: data.list })
  },
  setCity: (city) => set({ selectedCity: city }),
}))

export default useWeatherStore
```

## API Integration

The application integrates with the **OpenWeatherMap API** to fetch real-time weather data. It utilizes the following API endpoints:

### City Search

Fetches a list of city suggestions based on user input.

```plaintext
https://api.openweathermap.org/data/2.5/find?q={city}&appid={api_key}&units=metric
```

### Weather Data

Fetches weather data for a specific city.

```plaintext
https://api.openweathermap.org/data/2.5/weather?q={city}&appid={api_key}&units=metric
```

### Geolocation

Fetches the current location of the user's device.

```plaintext
https://api.openweathermap.org/data/2.5/weather?lat={latitude}&lon={longitude}&appid={api_key}&units=metric
```

## Components

The application uses the following components:

### WeatherSearch

The `WeatherSearch` component is responsible for handling user input and fetching suggestions.

### WeatherDetails

The `WeatherDetails` component displays detailed weather information for the selected city.

### ThemeToggle

The `ThemeToggle` component allows users to switch between light and dark themes.

### SearchSuggestions

The `SearchSuggestions` component displays a list of city suggestions when the user focuses on the search bar.

### ThemeProvider

The `ThemeProvider` component is a wrapper component that provides a consistent theme across the application.

## Styling

The application uses Tailwind CSS for styling.

## Contributing

We welcome contributions from the community! To get started, follow these steps:

1. **Fork the Repository**: Click the "Fork" button at the top right of the repository page.
2. **Clone Your Fork**: Clone your forked repository to your local machine.

```bash
git clone https://github.com/your-username/weather-task
cd weather-task
```

3. **Create a New Branch**: Create a new branch for your feature or bug fix.

```bash
git checkout -b feature-branch
```

4. **Make Your Changes**: Implement your changes in the new branch.
5. **Commit Your Changes**: Commit your changes with a descriptive commit message.

```bash
git add .
git commit -m "Add detailed description of your changes"
```

6. **Push to Your Fork**: Push your changes to your forked repository.

```bash
git push origin feature-branch
```

7. **Create a Pull Request**: Open a pull request from your forked repository to the main repository.

---

Thank you for your contributions!
