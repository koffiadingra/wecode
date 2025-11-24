// import { useState } from "react"



// export default function PlayerForm(onChangePlayer){

//     const [search, setSearch] = useState(null);



    // function onChangeForm(e){
    //   const value = e.target.value;
    //     setSearch(value);
    //     if (value.length > 2) {
    //      onChangePlayer(value);
    //     }
    // }

//   function handleSubmit(e) {
//     e.preventDefault();
//     if (search === "") return;
//     onChangePlayer(search);
//   }

//     return(
//         <>
//         <form onSubmit={handleSubmit}>
//             <input className="border-black" placeholder="Enter name player" value={search} type="text" onChange={onChangeForm}/>
//             <button className="px-5 my-5 font-bold text-white bg-black rounded-md" onClick={handleSubmit} type="submit">Search Player</button>
//         </form>


//         </>
//     )
// }

import { useState } from "react";

export default function PlayerForm({ onChangePlayer }) {
  const [search, setSearch] = useState("");

   function onChangeForm(e){
      const value = e.target.value;
        setSearch(value);
        if (value.length > 2) {
         onChangePlayer(value);
        }
    }


  function handleSubmit(e) {
    e.preventDefault();
    if (search === "") return;
    onChangePlayer(search);
  }

  return (
    <form
      onSubmit={handleSubmit}
    >
      <input type="text" value={search} onChange={onChangeForm}

        placeholder="Rechercher un joueur"
        className="w-[250px] p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-violet-400"
      />
      <button
        type="submit"
        className="w-[70px] px-2 py-2 mx-2 font-bold text-white rounded-md bg-violet-500 my-50 hover:bg-blue-500" >
         Search
      </button>
    </form>
  );
}
