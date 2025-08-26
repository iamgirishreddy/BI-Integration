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

  const formatDateTime = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    }) + ' at ' + date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    })
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

  if (!event) {
    return (
      <div className="container mt-5">
        <div className="alert alert-warning text-center">
          Event not found
        </div>
      </div>
    )
  }

  return (
    <div className="container mt-4">
      <div className="row">
        {/* Left Column - Main Content */}
        <div className="col-lg-8">
          {/* Event Title */}
          <h1 className="fw-bold mb-2">{event.title}</h1>
          
          {/* Hosted By */}
          <p className="text-muted mb-4">
            Hosted By: <strong>Marketing Experts</strong>
          </p>
          
          {/* Event Image */}
          <img 
            src={event.thumbnail} 
            alt={event.title}
            className="img-fluid rounded mb-4"
            style={{ width: '100%', height: '300px', objectFit: 'cover' }}
          />
          
          {/* Details Section */}
          <h5 className="fw-bold mb-3">Details:</h5>
          <p className="mb-4" style={{ lineHeight: '1.6' }}>
            {event.description}
          </p>
          
          {/* Additional Information */}
          <h5 className="fw-bold mb-3">Additional Information:</h5>
          <div className="mb-4">
            <p className="mb-2">
              <strong>Dress Code:</strong> Smart casual
            </p>
            <p className="mb-2">
              <strong>Age Restrictions:</strong> 18 and above
            </p>
          </div>
          
          {/* Event Tags */}
          <h5 className="fw-bold mb-3">Event Tags:</h5>
          <div className="mb-4">
            {event.tags.map((tag, index) => (
              <span 
                key={index} 
                className="badge bg-danger me-2 px-3 py-2"
                style={{ fontSize: '14px' }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
        
        {/* Right Column - Event Info */}
        <div className="col-lg-4">
          {/* Date, Location, Price Box */}
          <div className="border rounded p-3 mb-4">
            {/* Date and Time */}
            <div className="d-flex align-items-start mb-3">
              <i className="bi bi-clock me-2 mt-1"></i>
              <div>
                <div>{formatDateTime(event.date)} to</div>
                <div>{formatDateTime(event.date)}</div>
              </div>
            </div>
            
            {/* Location */}
            {event.venue && (
              <div className="d-flex align-items-center mb-3">
                <i className="bi bi-geo-alt me-2"></i>
                <div>
                  <div>Marketing City</div>
                  <div>{event.venue}</div>
                </div>
              </div>
            )}
            
            {/* Price */}
            <div className="d-flex align-items-center">
              <i className="bi bi-currency-rupee me-2"></i>
              <div>
                {event.price === 0 ? 'Free' : `₹${event.price}`}
              </div>
            </div>
          </div>
          
          {/* Speakers Section */}
          <div className="mb-4">
            <h5 className="fw-bold mb-3">Speakers: ({event.speakers.length})</h5>
            <div className="row">
              {event.speakers.map((speaker, index) => (
                <div key={index} className="col-6 mb-3">
                  <div className="text-center">
                    <img 
  src={index === 0 ? 
    "https://images.unsplash.com/photo-1494790108755-2616b612b1bc?w=80&h=80&fit=crop&crop=face" : 
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face"
  }
  alt={speaker}
  className="rounded-circle mb-2"
  style={{ width: '60px', height: '60px' }}
/>
                    <div className="small">
                      <div className="fw-bold">{speaker}</div>
                      <div className="text-muted">Speaker</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* RSVP Button */}
          <button className="btn btn-danger w-100 py-2 fw-bold">
            RSVP
          </button>
        </div>
      </div>
    </div>
  )
}

export default EventDetails
