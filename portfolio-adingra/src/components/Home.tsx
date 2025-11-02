import {Mail} from "lucide-react"

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
            </div>
            
            <div>

            </div>
        </div>
        </>
    )
}
export default Home