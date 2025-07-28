import React from 'react'
import landing from '../assets/landing.jpg'

const Landingpage = () => {
  return (
     <div className="relative w-full h-screen">
      {/* Background Image */}
      <img
        src={landing} 
        alt="Background"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-70"></div>

      {/* Text at Bottom */}
      <div className="absolute bottom-10 w-full text-center px-4">
        <h1 className="text-white text-4xl md:text-6xl font-extrabold tracking-wide fade-text">
          Employee Management System
        </h1>
      </div>
    </div>
  )
}

export default Landingpage
