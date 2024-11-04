'use client'
import WeatherDetails from '@/components/WeatherDetails';
import { Search } from 'lucide-react';
import React, { useState } from 'react'

const page = () => {

  const [location, setLocation] = useState('');
  const [weatherResult, setWeatherResult] = useState('')

  let res;
  const sun = async (loc) => {
    setWeatherResult(<WeatherDetails obj={null} finalAddress={null} />)
    res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${loc}&units=metric&appid=aedb9cd52d9f17211801b18c296851e8`)
    console.log(res);
    let obj = await res.json()
    console.log(obj)
    let address = await fetch(` https://geocode.maps.co/reverse?lat=${obj.coord.lat}&lon=${obj.coord.lon}&api_key=672460df18a97492686832tpj473b0d`)
    let finalAddress = await address.json();
    console.log(finalAddress);

    setWeatherResult(<WeatherDetails obj={obj} finalAddress={finalAddress} />)
    console.log(obj.weather[0].main);
  }

  return (
    <>
      <header className='bg-black text-white h-16  font-bold text-4xl text-center py-2 mb-14 w-full'>Weather App</header>
      <main>
        <form onSubmit={(e) => {
          e.preventDefault();
        }} className='flex justify-center w-fit mx-auto border-4 border-black rounded-lg p-1' >
          <input type="text" className=' px-4 py-2 text-xl font-semibold mr-14 grow focus:outline-none' placeholder='CITY...' onChange={(e) => { setLocation(e.target.value) }} />
          <button className='bg-black text-white px-4 py-2 rounded-lg' onClick={() => { sun(location) }}><Search /></button>
        </form>
        <div className=' p-5'>
          {weatherResult}
        </div>
      </main>
    </>
  )
}

export default page