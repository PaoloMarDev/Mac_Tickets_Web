import { BrowserRouter, Routes, Route } from 'react-router-dom'

import LoginForm from './components/PestanasPrincipales/LoginForm.jsx'
import ProtectedRoute from './components/Otros/ProtectedRoute.jsx'
import ScreeDisplayer from './components/PestanasPrincipales/ScreenDisplayer.jsx'


import Asig from './components/PestanasPequenas/AsignarTecnico.jsx' // Falta añadir esta funcionalidad
import Mta from './components/PestanasPequenas/MenuTicketAdmin.jsx'

function App() {


  return (
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Mta />} />
            <Route path='/inicio' element={<ProtectedRoute>
                <ScreeDisplayer />
              </ProtectedRoute>} />
        </Routes>
      </BrowserRouter>
  )
}

export default App
