import viteLogo from '/vite.svg'

import { BrowserRouter, Routes, Route } from 'react-router-dom'

import LoginForm from './components/LoginForm.jsx'
import ProtectedRoute from './components/ProtectedRoute.jsx'
import Header from './components/Header.jsx'

function App() {

  return (
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<LoginForm />} />
            <Route path='/inicio' element={<ProtectedRoute><Header /></ProtectedRoute>} />
        </Routes>
      </BrowserRouter>
  )
}

export default App
