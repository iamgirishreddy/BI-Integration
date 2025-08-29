import { useState, useEffect } from 'react'
import EventCard from '../components/EventCard'

function EventList() {
  const [events, setEvents] = useState([])
  const [filteredEvents, setFilteredEvents] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [typeFilter, setTypeFilter] = useState('both')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)


  useEffect(() => {
    fetchEvents()
  }, [])

  useEffect(() => {
    filterEvents()
  }, [events, searchTerm, typeFilter])

  const fetchEvents = async () => {
    try {
      const response = await fetch('https://bi-integration.onrender.com/api/events')
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
        <div className="text-center">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="container mt-5">
        <div className="alert alert-danger text-center">
          Error: {error}
        </div>
      </div>
    )
  }

  return (
    <div className="container mt-4">
      {/* Header with Title and Filter */}
      <div className="row align-items-center mb-4">
        <div className="col-md-6">
          <h2 className="fw-bold mb-0">Meetup Events</h2>
        </div>
        <div className="col-md-6">
          <div className="d-flex justify-content-end">
            <select
              className="form-select"
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              style={{ width: '200px' }}
            >
              <option value="both">Select Event Type</option>
              <option value="online">Online Events</option>
              <option value="offline">Offline Events</option>
            </select>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="row mb-4">
        <div className="col-md-6">
          <input
            type="text"
            className="form-control"
            placeholder="Search events by title or tags..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Events Grid */}
      <div className="row">
        {filteredEvents.map(event => (
          <EventCard key={event._id} event={event} />
        ))}
      </div>

      {filteredEvents.length === 0 && (
        <div className="text-center py-5">
          <p className="text-muted">No events found matching your criteria.</p>
        </div>
      )}
    </div>
  )
}

export default EventList
