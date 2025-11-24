export default function PlayerProfile({player}){
   return (
  <div className="grid grid-cols-1 gap-6 mt-8 sm:grid-cols-2 lg:grid-cols-3">
    {player.response.map((player) => {
      const info = player.player;
      return (
        <>
        {/* <div key={info.id} className="p-4 text-center bg-white rounded-lg shadow-md" >
          <img src={info.photo} alt={info.name} className="w-20 h-20 mx-auto mb-3 rounded-full"/>
          <h2 className="font-bold">{info.name}</h2>
          <p>{info.age} ans — {info.nationality}</p>
           <p>position :{info.position}</p>
        </div> */}
         <div key={info.id}  className="w-[300px] p-4 mx-auto mt-5 text-center bg-white rounded-lg shadow-md " >
         
          <img src={info.photo} alt={info.name} className="w-[100px] h-[100px] mx-auto mb-3 border-4 rounded-full shadow-md border-violet-600"/>
          
          <h2 className="font-bold text-white uppercase rounded-md bg-violet-500">{info.name}</h2>

          <div className="flex justify-between px-6 mt-2 text-sm text-gray-600">

            <div className="flex flex-col items-center justify-center w-32 h-16 transition duration-300 ease-in-out bg-white rounded-lg shadow-md delay-50 hover:-translate-y-1 hover:scale-110">
                 <p className="px-6 font-bold text-blue-700 rounded-lg">Age</p>
                 <p>{info.age} ans</p>
            </div>
            <div className="flex flex-col items-center justify-center w-32 h-16 ml-5 transition duration-300 ease-in-out bg-white rounded-lg shadow-md delay-50 hover:-translate-y-1 hover:scale-110">
                 <p className="px-6 font-bold text-blue-700 rounded-lg">Position</p>
                 <p>{info.position}</p>
            </div>
          </div>
        

          <div className="flex justify-between px-6 mt-2 text-sm text-gray-600">

            <div className="flex flex-col items-center justify-center w-32 h-16 transition duration-300 ease-in-out bg-white rounded-lg shadow-md delay-50 hover:-translate-y-1 hover:scale-110">
                 <p className="px-6 font-bold text-blue-700 rounded-lg">Height</p>
                 <p>{info.height}</p>
            </div>
            <div className="flex flex-col items-center justify-center w-32 h-16 ml-5 transition duration-300 ease-in-out bg-white rounded-lg shadow-md delay-50 hover:-translate-y-1 hover:scale-110">
                 <p className="px-6 font-bold text-blue-700 rounded-lg">Weight</p>
                 <p>{info.weight} Kg</p>
            </div>
          </div>
         
          <div className="flex justify-between px-6 mt-2 text-sm text-gray-600">

            <div className="flex flex-col items-center justify-center w-full h-16 transition duration-300 ease-in-out bg-white rounded-lg shadow-md delay-50 hover:-translate-y-1 hover:scale-110">
                 <p className="px-6 font-bold text-blue-700 rounded-lg">Nationality</p>
                 <p>{info.nationality}</p>
            </div>
           
          </div>
          <br/>
          <div className="flex justify-between px-6 mt-2 text-sm text-gray-600">

            <div className="flex flex-col items-center justify-center w-full h-16 transition duration-300 ease-in-out bg-white rounded-lg shadow-md delay-50 hover:-translate-y-1 hover:scale-110">
                 <p className="px-6 font-bold text-blue-700 rounded-lg">Number Player</p>
                 <p>{info.number}</p>
            </div>
           
          </div>
          
        </div>
        </>
    
      );
    })}
  </div>
);

}