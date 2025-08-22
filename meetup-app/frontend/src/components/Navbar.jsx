import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <nav className="bg-blue-600 text-white p-4">
      <div className="container mx-auto">
        <Link to="/" className="text-xl font-bold">
          Meetup App
        </Link>
      </div>
    </nav>
  )
}

export default Navbar
