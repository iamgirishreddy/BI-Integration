import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <nav className="navbar navbar-light bg-white py-3 shadow-sm">
      <div className="container-fluid">
        {/* Logo */}
        <Link to="/" className="navbar-brand">
          <span style={{ 
            fontFamily: 'cursive', 
            fontSize: '24px', 
            color: '#e91e63', 
            fontWeight: 'bold' 
          }}>
            Meetup
          </span>
        </Link>
        
        {/* Search Bar */}
        {/* <div className="d-flex">
          <input 
            className="form-control" 
            type="search" 
            placeholder="Search by title and tags..." 
            style={{ width: '300px' }}
          />
        </div> */}
      </div>
    </nav>
  )
}

export default Navbar
