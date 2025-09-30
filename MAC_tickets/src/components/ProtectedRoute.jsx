import { Navigate } from 'react-router-dom'


const ProtectedRoute = ({children}) => {
    if(!localStorage.getItem('token')){
        //redirige al login
        return <Navigate to='/' />
    }
    return children

}

export default ProtectedRoute
