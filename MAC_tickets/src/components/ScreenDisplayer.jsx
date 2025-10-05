import { useEffect, useState } from "react"
import Tecnico from "./Tecnico"

import Footer from '../components/Footer.jsx'
import Header from '../components/Header.jsx'

const ScreenDisplayer = () =>{
    const [accountRole, setAccountRole] = useState("")

    useEffect(() => {
        setAccountRole(localStorage.getItem("role"))
    })


    if(accountRole == "TECNICO"){
        return(
            <div>
                <Header name={accountRole}/>
                <Tecnico />
                <Footer />
            </div> 
        )
    }
    if(accountRole == "MESA"){
        return(
            <div>
                <Header name={accountRole}/>
                <h1>No hay vista de Mesa</h1>
                <Footer />
            </div> 
        )
    }
    if(accountRole == "ADMIN"){
        return(
            <div>
                <Header name={accountRole}/>
                <h1>No hay vista de Administrador</h1>            
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