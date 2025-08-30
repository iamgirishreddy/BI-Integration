import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:10000'

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
      const response = await fetch(`${API_BASE}/api/events/${id}`)
      // const response = await fetch(`http://localhost:10000/api/events/${id}`)
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
    const startTime = date.toLocaleDateString('en-US', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    }) + ' at ' + date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    })
    
    // For end time, add 2 hours (example)
    const endDate = new Date(date.getTime() + (2 * 60 * 60 * 1000))
    const endTime = endDate.toLocaleDateString('en-US', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    }) + ' at ' + endDate.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    })
    
    return { startTime, endTime }
  }

  if (loading) {
    return (
      <div className="container mt-5">
        <div className="text-center py-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-3 text-muted">Loading event details...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="container mt-5">
        <div className="alert alert-danger text-center">
          <h5>Event Not Found</h5>
          <p className="mb-3">Error: {error}</p>
          <Link to="/" className="btn btn-primary">
            ← Back to Events
          </Link>
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

  const { startTime, endTime } = formatDateTime(event.date)

  return (
    <div className="container mt-4 px-3 px-md-4">
      {/* Back Button */}
      <div className="mb-4">
        <Link to="/" className="btn btn-outline-secondary btn-sm">
          <i className="bi bi-arrow-left me-2"></i>
          Back to Events
        </Link>
      </div>

      <div className="row">
        {/* Left Column - Main Content */}
        <div className="col-lg-8 mb-4">
          {/* Event Title */}
          <h1 className="fw-bold mb-2 text-start">{event.title}</h1>
          
          {/* Hosted By */}
          <p className="text-muted mb-4 text-start">
            Hosted By: <strong>Marketing Experts</strong>
          </p>
          
          {/* Event Image */}
          <img 
            src={event.thumbnail} 
            alt={event.title}
            className="img-fluid rounded mb-4 w-100"
            style={{ height: '350px', objectFit: 'cover' }}
          />
          
          {/* Details Section */}
          <h5 className="fw-bold mb-3 text-start">Details:</h5>
          <p className="mb-4 text-start" style={{ lineHeight: '1.7', fontSize: '15px' }}>
            {event.description}
          </p>
          
          {/* Additional Information */}
          <h5 className="fw-bold mb-3 text-start">Additional Information:</h5>
          <div className="mb-4 text-start">
            <div className="row">
              <div className="col-md-6 mb-2">
                <p className="mb-2">
                  <strong>Dress Code:</strong> Smart casual
                </p>
              </div>
              <div className="col-md-6 mb-2">
                <p className="mb-2">
                  <strong>Age Restrictions:</strong> 18 and above
                </p>
              </div>
            </div>
          </div>
          
          {/* Event Tags - Mobile Responsive Spacing */}
          <h5 className="fw-bold mb-3 text-start">Event Tags:</h5>
          <div className="mb-4 text-start">
            <div className="d-flex flex-wrap gap-2">
              {event.tags.map((tag, index) => (
                <span 
                  key={index} 
                  className="badge bg-danger px-3 py-2 mb-2 mb-md-0"
                  style={{ fontSize: '14px', fontWeight: '500' }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
        
        {/* Right Column - Event Info */}
        <div className="col-lg-4">
          {/* Date, Location, Price Box */}
          <div className="card border-0 shadow-sm mb-4">
            <div className="card-body p-4">
              {/* Date and Time */}
              <div className="mb-3">
                <div className="d-flex align-items-start mb-2">
                  <i className="bi bi-calendar-event me-3 mt-1 text-primary"></i>
                  <div className="text-start">
                    <div className="fw-semibold">{startTime} to {endTime}</div>
                    {/* <div className="text-muted">to</div> */}
                    {/* <div className="fw-semibold">{endTime}</div> */}
                  </div>
                </div>
              </div>
              
              {/* Venue - Always show */}
              <div className="mb-3 text-start">
                <div className="d-flex align-items-start">
                  <i className="bi bi-geo-alt me-3 mt-1 text-success"></i>
                  <div>
                    <div className="fw-semibold">
                      {event.venue || (event.type === 'online' ? 'Online Event' : 'Venue TBD')}
                    </div>
                    {event.venue && event.type === 'offline' && (
                      <div className="text-muted small">In-person event</div>
                    )}
                  </div>
                </div>
              </div>
              
              {/* Price */}
              <div className="mb-0 text-start">
                <div className="d-flex align-items-center">
                  <i className="bi bi-currency-rupee me-3 text-warning"></i>
                  <div>
                    <div className="fw-semibold">
                      {event.price === 0 ? 'Free' : `₹${event.price.toLocaleString()}`}
                    </div>
                    <div className="text-muted small">Registration fee</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Speakers Section */}
          <div className="card border-0 shadow-sm mb-4">
            <div className="card-body p-4">
              <h5 className="fw-bold mb-3">Speakers ({event.speakers.length})</h5>
              <div className="row g-3">
                {event.speakers.map((speaker, index) => (
                  <div key={index} className="col-6">
                    <div className="text-center">
                      <img 
                        src={index === 0 ? 
                          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face" : 
                          "https://images.unsplash.com/photo-1511367461989-f85a21fda167?w=80&h=80&fit=crop&crop=face"
                        }
                        alt={speaker}
                        className="rounded-circle mb-2"
                        width="60"
                        height="60"
                        style={{ objectFit: 'cover' }}
                      />
                      <div className="fw-semibold small">{speaker}</div>
                      <div className="text-muted" style={{ fontSize: '12px' }}>
                        {index === 0 ? 'Marketing Manager' : 'SEO Specialist'}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* RSVP Button */}
          <button className="btn btn-danger w-100 py-3 fw-bold" style={{ fontSize: '16px' }}>
            RSVP
          </button>
        </div>
      </div>
    </div>
  )
}

export default EventDetails
