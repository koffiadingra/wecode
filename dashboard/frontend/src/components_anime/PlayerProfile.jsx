// export default function PlayerProfile({player}){
//    return (
//   <div className="grid grid-cols-1 gap-6 mt-8 sm:grid-cols-2 lg:grid-cols-3">
//     {player.response.map((player) => {
//       const info = player.player;
//       return (
//         <>
//          <div key={info.id}  className="w-[300px] p-4 mx-auto mt-5 text-center bg-white rounded-lg shadow-md " >
         
//           <img src={info.image} alt={info.title} className="w-[100px] h-[100px] mx-auto mb-3 border-4 rounded-full shadow-md border-violet-600"/>
          
//           <h2 className="font-bold text-white uppercase rounded-md bg-violet-500">{info.title}</h2>

//           <div className="flex justify-between px-6 mt-2 text-sm text-gray-600">

//             <div className="flex flex-col items-center justify-center w-32 h-16 transition duration-300 ease-in-out bg-white rounded-lg shadow-md delay-50 hover:-translate-y-1 hover:scale-110">
//                  <p className="px-6 font-bold text-blue-700 rounded-lg">Ranking</p>
//                  <p>{info.ranking} ans</p>
//             </div>
//             <div className="flex flex-col items-center justify-center w-32 h-16 ml-5 transition duration-300 ease-in-out bg-white rounded-lg shadow-md delay-50 hover:-translate-y-1 hover:scale-110">
//                  <p className="px-6 font-bold text-blue-700 rounded-lg">Episodes</p>
//                  <p>{info.episodes}</p>
//             </div>
//           </div>
        

//           <div className="flex justify-between px-6 mt-2 text-sm text-gray-600">

//             <div className="flex flex-col items-center justify-center w-32 h-16 transition duration-300 ease-in-out bg-white rounded-lg shadow-md delay-50 hover:-translate-y-1 hover:scale-110">
//                  <p className="px-6 font-bold text-blue-700 rounded-lg">Status anime</p>
//                  <p>{info.status}</p>
//             </div>
//             <div className="flex flex-col items-center justify-center w-32 h-16 ml-5 transition duration-300 ease-in-out bg-white rounded-lg shadow-md delay-50 hover:-translate-y-1 hover:scale-110">
//                  <p className="px-6 font-bold text-blue-700 rounded-lg">Type</p>
//                  <p>{info.type}</p>
//             </div>
//           </div>
         
//           <div className="flex justify-between px-6 mt-2 text-sm text-gray-600">

//             <div className="flex flex-col items-center justify-center w-full h-16 transition duration-300 ease-in-out bg-white rounded-lg shadow-md delay-50 hover:-translate-y-1 hover:scale-110">
//                  <p className="px-6 font-bold text-blue-700 rounded-lg">Genres</p>
//                  <p>{info.genres}</p>
//             </div>
           
//           </div>
//           <br/>
//           <div className="flex justify-between px-6 mt-2 text-sm text-gray-600">

//             <div className="flex flex-col items-center justify-center w-full h-16 transition duration-300 ease-in-out bg-white rounded-lg shadow-md delay-50 hover:-translate-y-1 hover:scale-110">
//                  <p className="px-6 font-bold text-blue-700 rounded-lg">Has episode</p>
//                  <p>{info.hasEpisode}</p>
//             </div>
           
//           </div>
          
//         </div>
//         </>
    
//       );
//     })}
//   </div>
// );

// }

export default function PlayerProfile({ player }) {
  // Vérification que player est défini et est un tableau
  if (!player || !Array.isArray(player) || player.length === 0) {
    return <div>Aucun anime trouvé</div>;
  }

  return (
    <div className="grid grid-cols-1 gap-6 mt-8 sm:grid-cols-2 lg:grid-cols-3 w-full">
      {player.map((playerData) => {
        const info = playerData; // On n'a plus besoin de playerData.player ici
        return (
          <div key={info.id} className="w-[300px] p-4 mx-auto mt-5 text-center bg-white rounded-lg shadow-md">
            <img
              src={info.image}
              alt={info.title}
              className="w-[100px] h-[100px] mx-auto mb-3 border-4 rounded-full shadow-md border-violet-600"
            />
            <h2 className="font-bold text-white uppercase rounded-md bg-violet-500">{info.title}</h2>

            <div className="flex justify-between px-6 mt-2 text-sm text-gray-600">
              <div className="flex flex-col items-center justify-center w-32 h-16 transition duration-300 ease-in-out bg-white rounded-lg shadow-md delay-50 hover:-translate-y-1 hover:scale-110">
                <p className="px-6 font-bold text-blue-700 rounded-lg">Ranking</p>
                <p>{info.ranking} ans</p>
              </div>
              <div className="flex flex-col items-center justify-center w-32 h-16 ml-5 transition duration-300 ease-in-out bg-white rounded-lg shadow-md delay-50 hover:-translate-y-1 hover:scale-110">
                <p className="px-6 font-bold text-blue-700 rounded-lg">Episodes</p>
                <p>{info.episodes}</p>
              </div>
            </div>

            <div className="flex justify-between px-6 mt-2 text-sm text-gray-600">
              <div className="flex flex-col items-center justify-center w-32 h-16 transition duration-300 ease-in-out bg-white rounded-lg shadow-md delay-50 hover:-translate-y-1 hover:scale-110">
                <p className="px-6 font-bold text-blue-700 rounded-lg">Status anime</p>
                <p>{info.status}</p>
              </div>
              <div className="flex flex-col items-center justify-center w-32 h-16 ml-5 transition duration-300 ease-in-out bg-white rounded-lg shadow-md delay-50 hover:-translate-y-1 hover:scale-110">
                <p className="px-6 font-bold text-blue-700 rounded-lg">Type</p>
                <p>{info.type}</p>
              </div>
            </div>

            <div className="flex justify-between px-6 mt-2 text-sm text-gray-600">
              <div className="flex flex-col items-center justify-center w-full h-16 transition duration-300 ease-in-out bg-white rounded-lg shadow-md delay-50 hover:-translate-y-1 hover:scale-110">
                <p className="px-6 font-bold text-blue-700 rounded-lg">Genres</p>
                <p>{info.genres.join(', ')}</p> {/* Affichage des genres séparés par une virgule */}
              </div>
            </div>
            <br />
            <div className="flex justify-between px-6 mt-2 text-sm text-gray-600">
              <div className="flex flex-col items-center justify-center w-full h-16 transition duration-300 ease-in-out bg-white rounded-lg shadow-md delay-50 hover:-translate-y-1 hover:scale-110">
                <p className="px-6 font-bold text-blue-700 rounded-lg">Has episode</p>
                <p>{info.hasEpisode ? 'Yes' : 'No'}</p> {/* Vérifie si l'épisode existe */}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
