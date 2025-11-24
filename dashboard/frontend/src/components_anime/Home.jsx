export default function Home(){
    return(
        <>
         <div  className="w-[300px] p-4 mx-auto mt-5 text-center bg-white rounded-lg shadow-md " >
         
          <img src={"https://media.api-sports.io/football/players/874.png"} alt={"image"} className="w-[100px] h-[100px] mx-auto mb-3 border-4 rounded-full shadow-md border-violet-600"/>
          
          <h2 className="font-bold text-white uppercase rounded-md bg-violet-500">name </h2>

          <div className="flex justify-between px-6 mt-2 text-sm text-gray-600">

            <div className="flex flex-col items-center justify-center w-32 h-16 transition duration-300 ease-in-out bg-white rounded-lg shadow-md delay-50 hover:-translate-y-1 hover:scale-110">
                 <p className="px-6 font-bold text-blue-700 rounded-lg">Age</p>
                 <p>30 ans</p>
            </div>
            <div className="flex flex-col items-center justify-center w-32 h-16 ml-5 transition duration-300 ease-in-out bg-white rounded-lg shadow-md delay-50 hover:-translate-y-1 hover:scale-110">
                 <p className="px-6 font-bold text-blue-700 rounded-lg">Position</p>
                 <p>Attacker</p>
            </div>
          </div>
        

          <div className="flex justify-between px-6 mt-2 text-sm text-gray-600">

            <div className="flex flex-col items-center justify-center w-32 h-16 transition duration-300 ease-in-out bg-white rounded-lg shadow-md delay-50 hover:-translate-y-1 hover:scale-110">
                 <p className="px-6 font-bold text-blue-700 rounded-lg">Height</p>
                 <p>187</p>
            </div>
            <div className="flex flex-col items-center justify-center w-32 h-16 ml-5 transition duration-300 ease-in-out bg-white rounded-lg shadow-md delay-50 hover:-translate-y-1 hover:scale-110">
                 <p className="px-6 font-bold text-blue-700 rounded-lg">Weight</p>
                 <p>87</p>
            </div>
          </div>
         
          <div className="flex justify-between px-6 mt-2 text-sm text-gray-600">

            <div className="flex flex-col items-center justify-center w-full h-16 transition duration-300 ease-in-out bg-white rounded-lg shadow-md delay-50 hover:-translate-y-1 hover:scale-110">
                 <p className="px-6 font-bold text-blue-700 rounded-lg">Nationality</p>
                 <p>ivoirienne</p>
            </div>
           
          </div>
          <br/>
          <div className="flex justify-between px-6 mt-2 text-sm text-gray-600">

            <div className="flex flex-col items-center justify-center w-full h-16 transition duration-300 ease-in-out bg-white rounded-lg shadow-md delay-50 hover:-translate-y-1 hover:scale-110">
                 <p className="px-6 font-bold text-blue-700 rounded-lg">Number Player</p>
                 <p>7</p>
            </div>
           
          </div>
          
        </div>


        </>
    )
}