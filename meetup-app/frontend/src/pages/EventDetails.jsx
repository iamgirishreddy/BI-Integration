import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'

function EventDetails() {
  const { id } = useParams()
  const [event, setEvent] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchEvent()
  }, [id])

  const fetchEvent = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/events/${id}`)
      if (!response.ok) {
        throw new Error('Event not found')
      }
      const data = await response.json()
      setEvent(data)
      setLoading(false)
    } catch (error) {
      setError(error.message)
      setLoading(false)
    }
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  if (loading) return <div className="text-center py-8">Loading event...</div>
  if (error) return <div className="text-center py-8 text-red-600">Error: {error}</div>
  if (!event) return <div className="text-center py-8">Event not found</div>

  return (
    <div className="container mx-auto px-4 py-8">
      <Link 
        to="/" 
        className="inline-block mb-6 text-blue-600 hover:text-blue-800"
      >
        ← Back to Events
      </Link>
      
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <img 
          src={event.thumbnail} 
          alt={event.title}
          className="w-full h-64 object-cover"
        />
        
        <div className="p-6">
          <h1 className="text-3xl font-bold mb-4">{event.title}</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <h3 className="font-semibold text-gray-700 mb-2">Event Details</h3>
              <p className="mb-2"><strong>Date:</strong> {formatDate(event.date)}</p>
              <p className="mb-2"><strong>Time:</strong> {event.sessionTimings}</p>
              <p className="mb-2">
                <strong>Type:</strong> 
                <span className={`ml-2 px-2 py-1 rounded text-xs ${
                  event.type === 'online' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-blue-100 text-blue-800'
                }`}>
                  {event.type === 'online' ? '🌐 Online' : '📍 In-Person'}
                </span>
              </p>
              {event.venue && (
                <p className="mb-2"><strong>Venue:</strong> {event.venue}</p>
              )}
              <p className="mb-2">
                <strong>Price:</strong> {event.price === 0 ? 'Free' : `$${event.price}`}
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold text-gray-700 mb-2">Speakers</h3>
              <ul className="mb-4">
                {event.speakers.map((speaker, index) => (
                  <li key={index} className="text-gray-600">• {speaker}</li>
                ))}
              </ul>
              
              <h3 className="font-semibold text-gray-700 mb-2">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {event.tags.map((tag, index) => (
                  <span 
                    key={index}
                    className="bg-gray-100 text-gray-800 px-2 py-1 rounded text-sm"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold text-gray-700 mb-2">Description</h3>
            <p className="text-gray-600 leading-relaxed">{event.description}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EventDetails
