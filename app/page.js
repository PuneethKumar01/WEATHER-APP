'use client'
import React, { useState } from 'react'

const page = () => {

  const [location, setLocation] = useState('');
  const [weatherResult, setWeatherResult] = useState('')

  let a;
  const sun = async (loc) => {
    a = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${loc}&units=metric&appid=aedb9cd52d9f17211801b18c296851e8`)
    console.log(a);
    let obj = await a.json()
    console.log(obj)
    setWeatherResult(<>
      <img src={`https://flagsapi.com/${obj.sys.country}/flat/64.png`} alt={`b.sys.country`} />
      {`weather :  ${obj.weather[0].main}  Humidity :  ${obj.main.humidity} %  Wind : ${(obj.wind.speed * 3.6).toFixed(2)} km/hr`}
    </>)
    console.log(obj.weather[0].main);
  }


  return (
    <>
      <header className='bg-black text-white h-16  font-bold text-4xl text-center py-2 mb-12'>Weather App</header>
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
        <div className='bg-neutral-200 p-5'>
          {weatherResult}
        </div>

      </main>
    </>
  )
}

export default page