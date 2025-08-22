import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import EventList from './pages/EventList'
import EventDetails from './pages/EventDetails'
import './App.css'

function App() {
  return (
    <div className="App">
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<EventList />} />
          <Route path="/event/:id" element={<EventDetails />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
