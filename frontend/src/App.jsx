import React from 'react'
import './App.css'
import AppRoutes from './routes/AppRoutes'
import BottomNav from './components/BottomNav'
import { BrowserRouter as Router } from 'react-router-dom'

function App() {
 

  return (
    <Router>
      <AppRoutes/>
      <BottomNav />
    </Router>
  )
}

export default App
