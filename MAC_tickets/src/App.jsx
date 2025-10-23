import { BrowserRouter, Routes, Route } from 'react-router-dom'

import LoginForm from './components/PestanasPrincipales/LoginForm.jsx'
import ProtectedRoute from './components/Otros/ProtectedRoute.jsx'
import ScreeDisplayer from './components/PestanasPrincipales/ScreenDisplayer.jsx'

import ElementosArchivados from './components/PestanasPrincipales/ElementosArchivados.jsx'

function App() {


  return (
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<LoginForm />} />
          <Route path='/inicio' element={<ProtectedRoute> <ScreeDisplayer /> </ProtectedRoute>} />
          <Route path='/archivado' element={<ProtectedRoute> <ElementosArchivados /> </ProtectedRoute>} />
        </Routes>
      </BrowserRouter>
  )
}

export default App
