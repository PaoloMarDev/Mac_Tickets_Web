
import './Header.css'
import macLogo from '../assets/Mac_logo.jpg'

const Header = (Title) => {

    return(
        <section className='Header'>
            <img src={macLogo} alt='Logo Mac Computadoras' />
            <h1>Mac Computadoras</h1>
            <h2>Vista Técnico</h2>
        </section>
    )
}


export default Header