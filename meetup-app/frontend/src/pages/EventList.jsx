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
      // const response = await fetch('http://localhost:10000/api/events')
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
    let filtered = events

    // Filter by type
    if (typeFilter !== 'both') {
      filtered = filtered.filter(event => event.type === typeFilter)
    }

    // Filter by search term (title and tags)
    if (searchTerm) {
      filtered = filtered.filter(event =>
        event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.tags.some(tag => 
          tag.toLowerCase().includes(searchTerm.toLowerCase())
        )
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
          <p className="mt-3 text-muted">Loading amazing events...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="container mt-5">
        <div className="alert alert-danger text-center">
          <h5>Oops! Something went wrong</h5>
          <p className="mb-0">Error: {error}  </p>
        </div>
      </div>
    )
  }

  return (
    <div className="container mt-4 px-3 px-md-4">
      {/* Header Section */}
      <div className="row align-items-center mb-4">
        <div className="col-12 col-md-6 mb-3 mb-md-0">
          <h2 className="fw-bold mb-1" style={{ fontSize: '2rem' }}>Meetup Events</h2>
          <p className="text-muted mb-0">Discover amazing events happening around you</p>
        </div>
        <div className="col-12 col-md-6">
          <div className="d-flex justify-content-md-end">
            <select
              className="form-select"
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              style={{ maxWidth: '220px' }}
            >
              <option value="both">Both (All Events)</option>
              <option value="online">Online Events</option>
              <option value="offline">Offline Events</option>
            </select>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="row mb-4">
        <div className="col-12 col-md-8 col-lg-6">
          <div className="input-group">
            <span className="input-group-text bg-white border-end-0">
              <i className="bi bi-search text-muted"></i>
            </span>
            <input
              type="text"
              className="form-control border-start-0 ps-0"
              placeholder="Search events by title or tags..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Events Count */}
      <div className="row mb-3">
        <div className="col-12">
          <p className="text-muted small mb-0">
            {filteredEvents.length} event{filteredEvents.length !== 1 ? 's' : ''} found
            {typeFilter !== 'both' && ` (${typeFilter})`}
          </p>
        </div>
      </div>

      {/* Events Grid - Mobile Responsive */}
      <div className="row g-3 g-md-4">
        {filteredEvents.map(event => (
          <EventCard key={event._id} event={event} />
        ))}
      </div>

      {/* No Events Message */}
      {filteredEvents.length === 0 && (
        <div className="text-center py-5">
          <div className="mb-3">
            <i className="bi bi-calendar-x" style={{ fontSize: '3rem', color: '#6c757d' }}></i>
          </div>
          <h5 className="text-muted">No events found</h5>
          <p className="text-muted mb-0">
            Try adjusting your search or filter criteria
          </p>
        </div>
      )}
    </div>
  )
}

export default EventList
