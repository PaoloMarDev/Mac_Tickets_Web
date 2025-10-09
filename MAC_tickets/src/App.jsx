import { BrowserRouter, Routes, Route } from 'react-router-dom'

import LoginForm from './components/LoginForm.jsx'
import ProtectedRoute from './components/ProtectedRoute.jsx'
import ScreeDisplayer from './components/ScreenDisplayer.jsx'


import Usuario from './components/Usuario.jsx'

function App() {


  return (
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<LoginForm />} />
            <Route path='/inicio' element={<ProtectedRoute>
                <ScreeDisplayer />
              </ProtectedRoute>} />
        </Routes>
      </BrowserRouter>
  )
}

export default App
