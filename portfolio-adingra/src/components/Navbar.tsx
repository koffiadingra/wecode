import { Container } from "lucide-react"

const Navbar = () => {
    return (
        <div className="flex justify-center md:justify-between items-center p-4">
            <a href="#"
            className="flex items-center font-bold text-3xl md:text-xl"
            >
                <Container className="mr-2" />
                <span className="text-accent">koffi jean emmanuel martial ADINGRA</span>
            </a>
            <ul className="hidden md:flex space-x-4">
                <li>
                    <a href=""
                    className="btn btn-sm btn-ghost"
                    >
                        Acceuil
                    </a>
                </li>
                <li>
                    <a href=""
                    className="btn btn-sm btn-ghost"
                    >
                        A propos
                    </a>
                </li>
                <li>
                    <a href=""
                    className="btn btn-sm btn-ghost"
                    >
                        Mes compétences
                    </a>
                </li>
                <li>
                    <a href=""
                    className="btn btn-sm btn-ghost"
                    >
                        Mes experiences
                    </a>
                </li>
                <li>
                    <a href=""
                    className="btn btn-sm btn-ghost"
                    >
                        Mes projets
                    </a>
                </li>
                <li>
                    <a href=""
                    className="btn btn-sm btn-ghost"
                    >
                        mes contacts
                    </a>
                </li>
            </ul>
        </div>
    )
}

export default Navbar