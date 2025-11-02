
import { CalendarSync, LetterText, Paintbrush, Section } from "lucide-react"
import Titre from "./Titre"
const aboutSection = [
    {
        id:1,
        title:"developpeur Frontend",
        description:"je maitrise les base du developpement frontend et possede une bonne experience. ",
        icon:<LetterText className="text-accent scale-150"/>
    },
     {
        id:2,
        title:"developpeur Backend",
        description:"je suis un developpeur backend avec une bonne maitrise dans la conception d'API  et possede une très bonne experience. ",
        icon:<CalendarSync className="text-accent scale-150"/>
    },
    //  {
    //     id:3,
    //     title:"developpeur Frontend",
    //     description:"je maitrise les base du developpement frontend et possede une bonne experience. ",
    //     icon:<Paintbrush className="text-accent scale-150"/>
    // }
]
const About = () => {
    return (
        <>
        <div className="bg-base-300 p-10 mb-10 md:mb-40">
            <Titre titre="A propos"/>
            <div className="md:h-screen flex justify-center items-center">
              <div className="hidden md:block">
                <img src="src\assets\moi.jpg" alt="moi" className="w-96 object-cover rounded-xl"/>
            </div>
                <div className="md:ml-4 space-y-4">
                    {aboutSection.map((section) => (
                        <div key={section.id}
                        className="flex flx-col md:flex-row items-center bg-base-100 p-5 rounded-xl md:w-96 shadow-xl"
                        >
                            <div className="md:mb-0 mb:2">
                                {section.icon}
                            </div>
                            <div className="md:ml-4 text-center md:text-left">
                                 <h2 className="text-xl font-bold mb-1">
                                    {section.title}
                                 </h2>
                                 <p className="text-sm">
                                    {section.description }
                                 </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
        </>
    )
}

export default About