
import './LoginForm.css'
import beluga from '../assets/BelugaMeme.png'
import emailIcon from '../assets/mail.png'

const LoginForm = () => {


    return(
    <main>
        <section className="Titles">
            <img src={beluga} alt='Logo Mac Computadoras' />
            <h1>MAC Computadoras</h1>
            <h1>Login</h1>
        </section>
        <section className="loginform">
            <div class="group">
                <input type="text" class="input" />
                <span class="highlight"></span>
                <span class="bar"></span>
                <label>Email</label>
            </div>
            <br />
            <div>
                <input type="password" name="" id="" />
            </div>
            <br />
            <button type="button">Iniciar Sesión</button>
        </section>
    </main>
    )
}

export default LoginForm