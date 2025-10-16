import { useEffect, useState } from "react"

import Tecnico from "./Tecnico.jsx"
import Administrador from "./Administrador"
import MesaDeTrabajo from "./MesaDeTrabajo.jsx"



import Footer from './Footer.jsx'
import Header from './Header.jsx'

const ScreenDisplayer = () =>{
    const [accountRole, setAccountRole] = useState("")

    useEffect(() => {
        setAccountRole(localStorage.getItem("role"))
    })


    if(accountRole == "TECNICO"){
        return(
            <div>
                <Header name={"Técnico"}/>
                <Tecnico />
                <Footer />
            </div> 
        )
    }
    if(accountRole == "MESA"){
        return(
            <div>
                <Header name={"Mesa De Trabajo"}/>
                <MesaDeTrabajo />
                <Footer />
            </div> 
        )
    }
    if(accountRole == "ADMIN"){
        return(
            <div>
                <Header name={"Administrador"}/>
                <Administrador />
                <Footer />
            </div> 
        )
    }

    return(
        <div>
            <h1>Algo salió mal jijijijij</h1>
        </div>
    )
}

export default ScreenDisplayer