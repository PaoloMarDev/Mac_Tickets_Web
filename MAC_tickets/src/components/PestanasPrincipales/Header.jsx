
import '../../components_css/Header.css'
import macLogo from '../../assets/Mac_logo.jpg'

import { useNavigate } from "react-router-dom"

const Header = (title) => {

    const navigate = useNavigate()

    return(
        <section className='Header'>
            <div className='group1'>
                <img src={macLogo} alt='Logo Mac Computadoras' onClick={()=>{
                    navigate('/inicio')
                    }
                }/>
                <h1>Mac Computadoras</h1>
            </div>
            <h2>Vista {title.name || "Archivados"}</h2>
        </section>
    )
}


export default Header