import { useState ,useEffect } from "react"
import PlayerForm from "./PlayerForm"
import PlayerProfile from "./PlayerProfile"
import PlayerLoader from "./PlayerLoader"


const PLAYERSAPI_KEY="72cdba13725183cb7b40f3f7ee6aa21c"
const PLAYERSAPI_URL="https://v3.football.api-sports.io/players/profiles"


export default function Player({onClose}){

    const [player, setPlayer] = useState(null)

    useEffect(()=>{
        loaderinfo();
    }, [])


    async function loaderinfo(search="Cristiano Ronaldo") {
    try {
    const url = `${PLAYERSAPI_URL}?search=${search}`;
    const options = {
      method: "GET",
      headers: {
        "x-apisports-key": PLAYERSAPI_KEY,
      },
    };

    const response = await fetch(url, options);
    const data = await response.json();

    setTimeout(() => {
      setPlayer(data);
    }, 2000);

    console.log("Résultat API :", data);
  } catch (error) {
    console.error("Erreur durant la requête :", error);
  }
}


    function handleChange(search){
        setPlayer(null)
        loaderinfo(search)
    }


    return(
        <>
        <div className="container block text-center p-5 my-5 ml-5 px-auto  bg-white shadow-lg w-[380px] rounded-xl">
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
        <PlayerForm  onChangePlayer={handleChange}/> <br/>
        {player ? <PlayerProfile player={player}/> : <PlayerLoader/>}
        </div>


        </>
    )
}
