
import '../components_css/LoginFormBackground.css'
import '../components_css/LoginForm.css'
import macLogo from '../assets/Mac_logo.jpg'
import emailIcon from '../assets/mail.png'
import passwordIcon from '../assets/contrasena.png'
import { useRef } from "react"
import { useNavigate } from "react-router-dom"




const LoginForm = () => {
const formulario = useRef(null)

     const navigate = useNavigate()
     
     // Dentro de LoginForm.jsx
     const login = async (evt) => {
     evt.preventDefault();
     
     // 1. Obtener los datos del formulario (Mejor usar un objeto JavaScript)
     const form = new FormData(formulario.current);
     const dataToSend = Object.fromEntries(form.entries()); // Convierte FormData a un objeto JS: { email: '...', password: '...' }
     
     // 2. Realizar la petición fetch
     try {
         const response = await fetch('http://localhost:3000/login', {
             method: "POST",
             // IMPORTANTE: Especificar Content-Type y convertir el cuerpo a JSON
             headers: {
                'Content-Type': 'application/json'
             },
             body: JSON.stringify(dataToSend) // Envía el objeto JS como una cadena JSON
         });
         const data = await response.json();
         // Manejo de la respuesta
         if (response.ok && data.token && data.id) { // Mejor verificar response.ok para estados HTTP 2xx
            localStorage.setItem('token', data.token);
            localStorage.setItem('id', data.id);
            localStorage.setItem('role', data.role);

            navigate('/inicio');
         } else {
            // Maneja errores de negocio (e.g., credenciales incorrectas)
            const errorMessage = 'Error en el login. Inténtalo de nuevo.';
            alert(errorMessage);
         }
     } catch (error) {
        // Maneja errores de red o del fetch (e.g., el servidor no está disponible)
        console.error('Error al conectar con el servidor:', error);
        alert('No se pudo conectar con el servidor de autenticación.');
        }
     }

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
                
                <form ref={formulario}>
                    <div>
                        <p>Email</p>
                        <div className='loginGroup'>
                            <img src={emailIcon} alt="Email Icon" />
                            <div className='inputbox'>
                                <input type="text" name='email' placeholder='Email' />
                            </div>
                        </div>
                    </div>

                    <div>
                        <p>Password</p>
                        <div className='groupPassword'>
                            <img src={passwordIcon} alt="Email Icon" />
                            <div className='inputbox'>
                                <input type="password" name='password' placeholder='Password' />
                            </div>
                        </div>
                    </div>
                </form>
                <button type="button" onClick={login}>Iniciar Sesión</button>
            </section>
        </section>
    </main>
    )
}

export default LoginForm