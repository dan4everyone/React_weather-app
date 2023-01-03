import axios from 'axios'
import { useEffect, useState } from 'react'
import './App.css'
import WeatherCard from './components/WeatherCard'

function App() {
  const [coords, setCoords] = useState()
  const [weather, setWeather] = useState()
  const [temperature, setTemperature] = useState()
  const [isC, setIsC] = useState(true)

  const success = (pos) => {
    const newCoords = {
      lat: pos.coords.latitude,
      lon: pos.coords.longitude
    }
    setCoords(newCoords)
  }

  const changeUnitTemperature = () => setIsC(!isC)

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(success)
  }, [])

  useEffect(() =>{
    if(coords) {
      const API_KEY = '1f18242e8d99589c82b23bc69fdd5597'
      const URL = `https://api.openweathermap.org/data/2.5/weather?lat=${coords.lat}&lon=${coords.lon}&appid=${API_KEY}`
      axios.get(URL)
        .then(res => {
        const tempK = res.data.main.temp
        const tempC = (tempK - 273.15).toFixed(0)
        const tempF = ((tempC * 9/5) + 32).toFixed(0)
        const newTemperature = {
          c: tempC,
          f: tempF
        }
        setTemperature(newTemperature)
        setWeather (res.data)
      })
        .catch(err => console.log(err))
    }
  }, [coords])

  return (
    <div className="App">
      {
        weather ? (
        <WeatherCard 
        weather={weather} 
        temperature={temperature}
        isC={isC}
        changeUnitTemperature={changeUnitTemperature} />
          ) : <p>Load</p>
      }
    </div>
  )
}

export default App
