import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Movies from './components/Movies'
import MovieByTitle from './components/MovieByTitle'
// import Books from './components/Books'
// import BooksByTitle from './components/BooksByTitle'
// import Hotels from './components/Hotels'
// import HotelsbyTitle from './components/HotelsByTitle'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
      <main>
        {/* <h1>All Books</h1> */}
        <Movies />
        {/* <MovieByTitle title='PK' /> */}
        {/* <Books />
       
        <BooksByTitle title='1984' /> */}
        {/* <Hotels />
        <HotelsbyTitle name='The Oberoi' /> */}
          </main>
    </>
  )
}

export default App
