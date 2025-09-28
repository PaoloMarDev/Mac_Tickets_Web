
import './LoginForm.css'
import './LoginFormBackground.css'
import macLogo from '../assets/Mac_logo.jpg'
import emailIcon from '../assets/mail.png'
import passwordIcon from '../assets/contrasena.png'

const LoginForm = () => {


    return(
    <main>
        <div className='background'>
            <div className='circles'>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
        </div>
        
        <section className='LoginForms'>
            <section className="Titles">
                <img src={macLogo} alt='Logo Mac Computadoras' />
                <h1>MAC Service Desk</h1>
                <h2 className='subtitle'>Login</h2>
            </section>
            <section className="loginform">

                <div>
                    <p>Email</p>
                    <div className='loginGroup'>
                        <img src={emailIcon} alt="Email Icon" />
                        <div className='inputbox'>
                            <input type="text" placeholder='Email' />
                        </div>
                    </div>
                </div>

                <div>
                    <p>Password</p>
                    <div className='groupPassword'>
                        <img src={passwordIcon} alt="Email Icon" />
                        <div className='inputbox'>
                            <input type="password" placeholder='Password' />
                        </div>
                    </div>
                </div>

                <button type="button">Iniciar Sesión</button>
            </section>
        </section>
    </main>
    )
}

export default LoginForm