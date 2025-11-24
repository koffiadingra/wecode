import React, { useState } from "react";

const api = {
  key: "dfad3584f4e81d200849eb4924ee82e6",
  base: "http://api.weatherstack.com/",
};

function WidgetTemperature({ onClose }) {
  const [location, setLocation] = useState("");
  const [timer, setTimer] = useState("");
  const [weatherCurrent, setWeatherCurrent] = useState({});
  const [weatherLocation, setWeatherLocation] = useState({});
  const [weatherSunrise, setWeatherSunrise] = useState({});

  const submitPressed = () => {
    console.log("submit pressed!");
    console.log(location);
    console.log(timer);

    fetch(`${api.base}current?access_key=${api.key}&query=${location}`)
      .then((res) => res.json())
      .then((result) => {
        setWeatherLocation(result.location);
        setWeatherCurrent(result.current);
        setWeatherSunrise(result.current.astro);
        console.log(result);
      });
  };
  return (
    <div className="mt-4 bg-white rounded-lg shadow-md max-h-[500px] overflow-auto md:w-80">
      <div className="container mx-auto p-4">
        <div className="flex justify-end">
          <button onClick={onClose}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 640 640"
              width={30}
            >
              <path d="M183.1 137.4C170.6 124.9 150.3 124.9 137.8 137.4C125.3 149.9 125.3 170.2 137.8 182.7L275.2 320L137.9 457.4C125.4 469.9 125.4 490.2 137.9 502.7C150.4 515.2 170.7 515.2 183.2 502.7L320.5 365.3L457.9 502.6C470.4 515.1 490.7 515.1 503.2 502.6C515.7 490.1 515.7 469.8 503.2 457.3L365.8 320L503.1 182.6C515.6 170.1 515.6 149.8 503.1 137.3C490.6 124.8 470.3 124.8 457.8 137.3L320.5 274.7L183.1 137.4z" />
            </svg>
          </button>
        </div>
        <div className="w-full flex flex-col justify-center items-center">
          <input
            placeholder="Enter city or country's name ...."
            className="w-1/2 py-3 px-4 text-base border border-indigo-500 rounded-md shadow-md outline-none transition ease-in duration-250 focus:shadow-lg active:ring-2 active:ring-indigo-500 mb-5"
            type="text"
            onChange={(e) => setLocation(e.target.value)}
          />
          <br />
          <input
            placeholder="Set a timer ...."
            className="w-1/2 py-3 px-4 text-base border border-indigo-500 rounded-md shadow-md outline-none transition ease-in duration-250 focus:shadow-lg active:ring-2 active:ring-indigo-500"
            type="number"
            min="0"
            onChange={(e) => setTimer(e.target.value)}
          />
          <div className="w-1/2 flex justify-center py-4">
            <button
              onClick={submitPressed}
              className="px-5 py-2 bg-indigo-500 border border-indigo-500 hover:bg-white hover:text-indigo-500 rounded-md text-white"
            >
              Submit
            </button>
          </div>
        </div>
        <div className="max-w-md p-8 mx-auto mt-16 rounded-lg bg-slate-100 text-gray-800 border shadow-md">
          <div className="flex justify-between space-x-8">
            <div className="flex flex-col items-center">
              <p className="text-xl font-semibold text-black mb-2">
                {new Date().toDateString(weatherLocation.localtime)}
              </p>
              <img src={weatherCurrent.weather_icons} alt="weather_icon" />
              <h1 className="text-xl font-semibold text-indigo-500">
                {weatherLocation.name}, {weatherLocation.country}
              </h1>
            </div>
            <div>
              <p className="text-7xl font-semibold text-indigo-500">
                {weatherCurrent.temperature}
                <sup>°C</sup>
              </p>
              <span className="text-xl font-semibold">
                {weatherCurrent.weather_descriptions}
              </span>
              <br />
            </div>
          </div>
          <div className="flex justify-between mt-8 space-x-4 text-gray-600">
            <div>
              <p className="text-xl font-semibold text-indigo-500">Sunrise</p>
              <span className="text-xl font-semibold text-black">
                {weatherSunrise.sunrise}
              </span>
              <br />
            </div>
            <div>
              <p className="text-xl font-semibold text-indigo-500">Sunset</p>
              <span className="text-xl font-semibold text-black">
                {weatherSunrise.sunset}
              </span>
              <br />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default WidgetTemperature;
