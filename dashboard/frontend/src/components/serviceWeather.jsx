import React, { useState } from 'react'

function ServiceWeather() {
 
  const [showWidgets, setShowWidgets] = useState(false);

  const handleClick = () => {
    setShowWidgets(!showWidgets);
  }


  return (
    <div className="bg-gradient-to-r from-indigo-500 to-purple-500 min-h-screen text-gray-800 dark:text-white">

        <div className="container mx-auto px-6 py-8">
            <h1 className="text-4xl font-bold text-center text-white mb-12 animate-fade-in">Our Services</h1>
            
            <div>
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 transform transition-all duration-300 hover:scale-105 animate-fade-in">
                    <h2 className="text-xl font-semibold text-indigo-800 dark:text-white mb-2">Meteo Service</h2>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">Custom web applications tailored to your business needs. We use cutting-edge technologies to deliver fast, responsive, and scalable solutions.</p>
                    <div className="flex justify-center">
                        <button onClick={handleClick} className="px-5 py-2 bg-indigo-500 hover:bg-white hover:text-indigo-500 rounded-md">
                            Widgets
                        </button>
                    </div>
                    {showWidgets && (
                        <div className="flex justify-center gap-6 mt-4">
                            <button className="px-5 py-2 bg-indigo-500 hover:bg-white hover:text-indigo-500 rounded-md">Temperature</button>
                            <button className="px-5 py-2 bg-indigo-500 hover:bg-white hover:text-indigo-500 rounded-md">Sunrise & Sunset</button>
                        </div>
                    )}
                </div>
            </div>    
        </div>

    </div>
  )
}

export default ServiceWeather
