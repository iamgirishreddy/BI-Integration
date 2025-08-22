import { useState, useEffect } from 'react'
import EventCard from '../components/EventCard'

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
      const response = await fetch('http://localhost:5000/api/events')
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

  if (loading) return <div className="text-center py-8">Loading events...</div>
  if (error) return <div className="text-center py-8 text-red-600">Error: {error}</div>

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Upcoming Events</h1>
      
      {/* Search and Filter Section */}
      <div className="mb-8 flex flex-col md:flex-row gap-4 justify-center">
        <input
          type="text"
          placeholder="Search events by title or tags..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        
        <select
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="both">All Events</option>
          <option value="online">Online Only</option>
          <option value="offline">In-Person Only</option>
        </select>
      </div>

      {/* Events Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredEvents.map(event => (
          <EventCard key={event._id} event={event} />
        ))}
      </div>

      {filteredEvents.length === 0 && (
        <div className="text-center py-8 text-gray-600">
          No events found matching your criteria.
        </div>
      )}
    </div>
  )
}

export default EventList
