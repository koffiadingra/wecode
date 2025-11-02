import {Mail} from "lucide-react"
// import moi from "src\assets\moi.jpg";
const Home = () => {
    return (
        <>
        <div className="flex flex-col-reverse md:flex-row justify-center items-center  md: my-32 my-10">
            <div className="flex flex-col justify-end md:justify-center">    
                <h1 className=" text-5xl md:text-6xl font-bold text-center md:text-left mt-4 md::mt-0">
                    hello, i'am <span className="text-accent">koffi ADINGRA</span>
                </h1>
                <p className="my-4 text-md text-center md:text-left">developpeur fullstack</p>
                <a href="" className="btn btn-accent md:w-fit">
                    <Mail />
                    contactez-moi
                </a>
                <p className="btn btn-accent md:w-fit ">telechearger un resumé cv</p>
            </div>
            
            <div>
                <img src="src\assets\moi.jpg" alt="moi" className="w-96 h-96 object-cover border-8 border-accent shadow-xl"
                style={{
                    borderRadius : "30%"
                }}/>
            </div>
        </div>
        </>
    )
}
export default Home