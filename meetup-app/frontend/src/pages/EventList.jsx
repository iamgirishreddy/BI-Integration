import { useState, useEffect } from 'react'
import EventCard from '../components/EventCard'

const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:10000'

function EventList() {
  const [events, setEvents] = useState([])
  const [filteredEvents, setFilteredEvents] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [typeFilter, setTypeFilter] = useState('both')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Fetch events from backend
  useEffect(() => {
    fetchEvents()
  }, [])

  // Filter events when search or filter changes
  useEffect(() => {
    filterEvents()
  }, [events, searchTerm, typeFilter])

  const fetchEvents = async () => {
    try {
      const response = await fetch(`${API_BASE}/api/events`)
      if (!response.ok) {
        throw new Error('Failed to fetch events')
      }
      const data = await response.json()
      setEvents(data)
      setLoading(false)
    } catch (error) {
      setError(error.message)
      setLoading(false)
    }
  }

  const filterEvents = () => {
    let filtered = [...events] // Create a copy to avoid mutation

    // Filter by type
    if (typeFilter !== 'both') {
      filtered = filtered.filter(event => event.type === typeFilter)
    }

    // Filter by search term (title and tags)
    if (searchTerm.trim()) {
      filtered = filtered.filter(event =>
        event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (event.tags && event.tags.some(tag => 
          tag.toLowerCase().includes(searchTerm.toLowerCase())
        ))
      )
    }

    setFilteredEvents(filtered)
  }

  if (loading) {
    return (
      <div className="container mt-5">
        <div className="text-center py-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-3 text-muted">Loading...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="container mt-5">
        <div className="alert alert-danger text-center">
          <h5>Oops! Something went wrong</h5>
          <p className="mb-0">Error: {error}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container-fluid mt-4 px-3 px-md-4">
      {/* Header Section - Left Aligned */}
      <div className="row mb-4">
        <div className="col-12 col-lg-8 mb-3 mb-lg-0">
          <div className="text-start">
            <h2 className="fw-bold mb-2" style={{ fontSize: '2.5rem', color: '#333' }}>
              Meetup Events
            </h2>
            {/* <p className="text-muted mb-0" style={{ fontSize: '1.1rem' }}>
              Discover amazing events happening around you
            </p> */}
          </div>
        </div>
        <div className="col-12 col-lg-4">
          <div className="d-flex justify-content-start justify-content-lg-end">
            <select
              className="form-select"
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              style={{ maxWidth: '250px' }}
            >
              <option value="both">Both (All Events)</option>
              <option value="online">Online Events</option>
              <option value="offline">Offline Events</option>
            </select>
          </div>
        </div>
      </div>

      {/* Search Bar - Left Aligned */}
      <div className="row mb-4">
        <div className="col-12 col-md-8 col-lg-6">
          <div className="input-group shadow-sm">
            <span className="input-group-text bg-white border-end-0">
              <i className="bi bi-search text-muted"></i>
            </span>
            <input
              type="text"
              className="form-control border-start-0 ps-2"
              placeholder="Search events by title or tags..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ boxShadow: 'none' }}
            />
            {searchTerm && (
              <button 
                className="btn btn-outline-secondary border-start-0"
                type="button"
                onClick={() => setSearchTerm('')}
                style={{ borderLeft: 'none' }}
              >
                <i className="bi bi-x"></i>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Events Count - Left Aligned */}
   <div className="row mb-4">
  <div className="col-12">
    <div className="text-start">
      <p 
        className="text-muted mb-0 d-flex align-items-center flex-wrap" 
        style={{ fontSize: '0.95rem', gap: '12px' }}
      >
        <strong>{filteredEvents.length}</strong> event{filteredEvents.length !== 1 ? 's' : ''}
        
        {typeFilter !== 'both' && (
          <span className="ms-2 badge bg-light text-dark">
            {typeFilter} events
          </span>
        )}

        {searchTerm && (
          <span 
            className="ms-2 badge bg-light text-dark text-truncate" 
            style={{ maxWidth: '200px' }}
          >
            matching "{searchTerm}"
          </span>
        )}
      </p>
    </div>
  </div>
</div>



    {/* Events Grid - Uniform and Responsive */}
<div
  className="row g-4"
  style={{ minHeight: '250px', transition: 'min-height 0.3s' }}
>
  {filteredEvents.map(event => (
    <EventCard key={event._id} event={event} />
  ))}
</div>


      {/* No Events Message */}
      {filteredEvents.length === 0 && !loading && (
  <div className="text-center py-5" style={{ minHeight: '250px' }}>
    <div className="mb-3">
      <i className="bi bi-calendar-x" style={{ fontSize: '3rem', color: '#6c757d' }}></i>
    </div>
    <h5 className="text-muted">No events found</h5>
    <p className="text-muted mb-3">
      {searchTerm ? 
        `No events match your search "${searchTerm}"` : 
        'Try adjusting your filter criteria'
      }
    </p>
    {searchTerm && (
      <button 
        className="btn btn-outline-primary"
        onClick={() => setSearchTerm('')}
      >
        Clear Search
      </button>
    )}
  </div>
)}

    </div>
  )
}

export default EventList
