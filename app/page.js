'use client'
import React, { useState } from 'react'

const page = () => {

  const [location, setLocation] = useState('');
  const [weatherResult, setWeatherResult] = useState('')

  let res;
  const sun = async (loc) => {
    res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${loc}&units=metric&appid=aedb9cd52d9f17211801b18c296851e8`)
    console.log(res);
    let obj = await res.json()
    console.log(obj)
    let address = await fetch(` https://geocode.maps.co/reverse?lat=${obj.coord.lat}&lon=${obj.coord.lon}&api_key=672460df18a97492686832tpj473b0d`)
    let finalAddress = await address.json();
    console.log(finalAddress);

    setWeatherResult(<>
      <div className='bg-neutral-200 px-10 py-5 rounded-lg'>
        <img src={`https://flagsapi.com/${obj.sys.country}/flat/64.png`} alt={obj.sys.country} width='100px' height='100px' />
        <p className='text-xl'>Place :  {finalAddress.display_name}</p>
        <p className='text-xl font-semibold'>Temperature :  {obj.main.temp}</p>
        <p className='text-2xl font-semibold'>Weather :  {obj.weather[0].main}</p>
        <p className='text-xl'>Humidity :  {obj.main.humidity}</p>
        <p className='text-xl'>Wind : {(obj.wind.speed * 3.6).toFixed(2)} km/hr</p>
      </div>
    </>)
    console.log(obj.weather[0].main);
  }


  return (
    <>
      <header className='bg-black text-white h-16  font-bold text-4xl text-center py-2 mb-12 w-full'>Weather App</header>
      <main>

        <form onSubmit={(e) => {
          e.preventDefault();
        }} className='flex justify-center mb-20' >
          <input type="text" className='border-4 rounded-lg px-4 py-2 text-xl mr-14' placeholder='CITY...' onChange={(e) => {
            setLocation(e.target.value)
          }} />
          <button className='bg-black text-white text-2xl px-4 py-2 rounded-lg font-semibold' onClick={() => {
            console.log(location)
            sun(location)
          }}>Submit</button>
        </form>
        <div className=' p-5'>
          {weatherResult}
        </div>

      </main>
    </>
  )
}

export default page