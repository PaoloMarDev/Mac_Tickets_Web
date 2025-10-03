import { Navigate } from 'react-router-dom'
import { useState } from 'react'
import '../components_css/Footer.css'
import logoutLogo from '../assets/logout.png'
import Beluga from '../assets/BelugaMeme.png'

const Footer = () => {
    const [redirect, setRedirect] = useState(false)

    const logout = () => {
        setRedirect(true)
    }

    if (redirect) {
        return <Navigate to='/' />
    }

    return (
        <section className='Footer'>
            <div className='footerbox'>
                <button type="button" onClick={logout}>
                    <img src={logoutLogo} alt="Logout Logo" />
                </button>
                <button>
                    <img src={Beluga} alt="Logout Logo" />
                </button>
            </div>
        </section>
    )
}

export default Footer