import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AppProvider } from './context/AppContext'
import Header from './components/layout/Header'
import Footer from './components/layout/Footer'
import MusicButton from './components/common/MusicButton'
import Home from './pages/Home'
import Discussions from './pages/Discussions'
import MoodTracker from './pages/MoodTracker'
import Resources from './pages/Resources'
import CrisisSupport from './pages/CrisisSupport'
import Professionals from './pages/Professionals'
import './App.css'

function App() {
  return (
    <AppProvider>
      <Router>
        <div className="app">
          <Header />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/discussions" element={<Discussions />} />
              <Route path="/mood-tracker" element={<MoodTracker />} />
              <Route path="/resources" element={<Resources />} />
              <Route path="/crisis-support" element={<CrisisSupport />} />
              <Route path="/professionals" element={<Professionals />} />
            </Routes>
          </main>
          <Footer />
          <MusicButton />
        </div>
      </Router>
    </AppProvider>
  )
}

export default App
