"use client"
import React from 'react'
import SkelitonLoader from './SkelitonLoader'

const WeatherDetails = ({ obj, finalAddress }) => {
    return (
        <>
            {obj && finalAddress ?
                < div className='bg-neutral-200 px-10 py-5 rounded-lg' >
                    <img src={`https://flagsapi.com/${obj.sys.country}/flat/64.png`} alt={obj.sys.country} width='100px' height='100px' />
                    <p className='text-xl'>Place :  {finalAddress.display_name}</p>
                    <p className='text-xl font-semibold'>Temperature :  {obj.main.temp}</p>
                    <p className='text-2xl font-semibold'>Weather :  {obj.weather[0].main}</p>
                    <p className='text-xl'>Humidity :  {obj.main.humidity}</p>
                    <p className='text-xl'>Wind : {(obj.wind.speed * 3.6).toFixed(2)} km/hr</p>
                </ div> :
                <div div className='bg-neutral-300 px-10 py-5 rounded-lg' >
                    <p className='w-[100px] h-[100px] rounded-md'><SkelitonLoader /></p>
                    <p className='w-full h-[30px] rounded-md'><SkelitonLoader /></p>
                    <p className='w-[30%] h-[30px] rounded-md'><SkelitonLoader /></p>
                    <p className='w-[25%] h-[30px] rounded-md'><SkelitonLoader /></p>
                    <p className='w-[25%] h-[30px] rounded-md'><SkelitonLoader /></p>
                    <p className='w-[40%] h-[30px] rounded-md'><SkelitonLoader /></p>
                </div>
            }
        </>
    )
}

export default WeatherDetails