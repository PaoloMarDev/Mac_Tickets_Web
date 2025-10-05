import viteLogo from '/vite.svg'

import { BrowserRouter, Routes, Route } from 'react-router-dom'

import LoginForm from './components/LoginForm.jsx'
import ProtectedRoute from './components/ProtectedRoute.jsx'
import Tecnico from './components/Tecnico.jsx'



function App() {


  return (
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<LoginForm />} />
            <Route path='/inicio' element={<ProtectedRoute>
                <Tecnico />
              </ProtectedRoute>} />
        </Routes>
      </BrowserRouter>
  )
}

export default App
