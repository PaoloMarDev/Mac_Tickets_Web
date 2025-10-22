
import '../../components_css/AvisoEliminar.css'

const AvisoDeEliminacion = ({onExit, disable}) => {
    return(
        <section className="AvistoContent">
            <h1>¿Estás seguro de esto?</h1>
            <p>¿Seguro que quieres deshabilitar al usuario?</p>
            <div className='Eliminacion Botones'>
                <button type='button' onClick={() => disable()}>Aceptar</button>
                <button type='button' onClick={() => onExit()}>Cancelar</button>
            </div>
        </section>
    )
}

export default AvisoDeEliminacion
