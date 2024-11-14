"use client"
import { useGSAP } from '@gsap/react'
import React from 'react'
import gsap from 'gsap'
const SkelitonLoader = () => {

useGSAP(()=>{
    gsap.to('.move', {
        transform: "translateX(-10%)",
        duration: 2,
        repeat: -1,
        yoyo: true
    })
})

    return (
        <div className='skeliton-loader'>
            <div className='move'>a</div>
        </div>
    )
}

export default SkelitonLoader