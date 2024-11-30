'use client'
import React, { useState } from 'react'
import { FaPodcast, FaSearch } from "react-icons/fa";

const page = () => {

  const [location, setLocation] = useState('');
  const [weatherResult, setWeatherResult] = useState('')

  let geoLatitude = '';
  let geoLongitude = '';

  const flechDetails = async (search) => {

    setWeatherResult(<>
      <div className='bg-neutral-200 px-10 py-16 rounded-lg '>
        <div className='h-32 w-32 rounded-full bg-transparent m-auto border-neutral-500 border-t-black border-8 animate-spin'></div>
      </div>
    </>)

    let firstUrl;
    console.log(location);
    if (search == 'geo') {
      firstUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${geoLatitude}&lon=${geoLongitude}&units=metric&appid=aedb9cd52d9f17211801b18c296851e8`
      console.log(firstUrl);
      console.log('1');
      console.log(location);
    } else {
      firstUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=aedb9cd52d9f17211801b18c296851e8`
      console.log('2');
    }

    let res = await fetch(firstUrl)
      .then(async (res) => {
        console.log(res);
        let weatherObject = await res.json()
        console.log(weatherObject)
        let address = await fetch(`https://geocode.maps.co/reverse?lat=${weatherObject.coord.lat}&lon=${weatherObject.coord.lon}&units=metric&api_key=${'672460df18a97492686832tpj473b0d'}`)
        let finalAddress = await address.json();
        console.log(finalAddress);

        let fiveDayForecast = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${weatherObject.coord.lat}&lon=${weatherObject.coord.lon}&appid=${'aedb9cd52d9f17211801b18c296851e8'}`)
        console.log('fire');
        console.log(fiveDayForecast);
        let finalAddressObj = await fiveDayForecast.json();
        console.log(finalAddressObj);

        setWeatherResult(<>
          <div className='bg-neutral-200 px-10 py-5 rounded-lg'>
            <img src={`https://flagsapi.com/${weatherObject.sys.country}/flat/64.png`} alt={weatherObject.sys.country} width='100px' height='100px' />
            <p className='text-xl'>Place :  {finalAddress.display_name}</p>
            <p className='text-xl font-semibold'>Temperature :  {weatherObject.main.temp}</p>
            <p className='text-2xl font-semibold'>Weather :  {weatherObject.weather[0].main}</p>
            <p className='text-xl'>Humidity :  {weatherObject.main.humidity}</p>
            <p className='text-xl'>Wind : {(weatherObject.wind.speed * 3.6).toFixed(2)} km/hr</p>
          </div>
        </>)
        console.log(weatherObject.weather[0].main);
      }).catch((err) => {
        setWeatherResult(<>
          <div className='bg-neutral-200 px-10 py-16 rounded-lg '>
            <p className='font-bold uppercase text-center text-2xl'>invalid address</p>
          </div>
        </>)
      })

  }


  // to get user present location


  const getUserLocation = () => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          geoLatitude = position.coords.latitude
          geoLongitude = position.coords.longitude
          console.log(geoLatitude);
          flechDetails('geo');
        },
        (error) => {
          console.log('geoLocation', error.message);
        }
      )
    } else {
      console.log('browser not suppoted to geoLoc');
    }
  }
  //end of getting user present location

  return (
    <>
      <header className='bg-black text-white h-16 font-bold text-4xl text-center py-2 mb-14 w-full'>Weather App</header>
      <main className='w-full'>
        <form className='flex justify-between items-center w-1/2 m-auto' onSubmit={(e) => {
          e.preventDefault();
        }}  >
          <div className='flex items-center border-4 rounded-lg border-gray-200 w-fit p-1'>
            <input type="text" className='px-4 py-2 mx-2 text-xl w-64' placeholder=' CITY...' onChange={(e) => {
              setLocation(e.target.value)
            }} />

            <button className='w-fit h-fit bg-black rounded text-xl ' onClick={() => {
              console.log(location)
              flechDetails('city')
            }}>
              <FaSearch className='text-white text-3xl m-2' />
            </button>
          </div>

          <button className='bg-black text-white text-2xl px-4 py-2 rounded-lg font-semibold' onClick={() => {
            getUserLocation();
          }}>Use Current location
          </button>
        </form>

        <div className='p-5'>
          {weatherResult}
        </div>

      </main>
    </>
  )
}

export default page