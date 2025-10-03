
import '../components_css/Header.css'
import macLogo from '../assets/Mac_logo.jpg'

const Header = (title) => {
    return(
        <section className='Header'>
            <div className='group1'>
                <img src={macLogo} alt='Logo Mac Computadoras' />
                <h1>Mac Computadoras</h1>
            </div>
            <h2>Vista {title.name}</h2>
        </section>
    )
}


export default Header