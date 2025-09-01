import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'

const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:10000'

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
      minute: '2-digit',
      hour12: true
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
      minute: '2-digit',
      hour12: true
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
    <div className="container-fluid mt-4 px-3 px-md-4">
      {/* Back Button - Left Aligned */}
      <div className="row mb-4">
        <div className="col-12">
          <Link to="/" className="btn btn-outline-secondary btn-sm">
            <i className="bi bi-arrow-left me-2"></i>
            Back to Events
          </Link>
        </div>
      </div>

      <div className="row">
        {/* Left Column - Main Content */}
        <div className="col-lg-8 mb-4">
          {/* Event Title - Left Aligned */}
          <div className="text-start mb-4">
            <h1 className="fw-bold mb-3" style={{ fontSize: '2.5rem', color: '#333' }}>
              {event.title}
            </h1>
            
            {/* Hosted By - Left Aligned */}
            <p className="text-muted mb-0" style={{ fontSize: '1.1rem' }}>
              Hosted By: <strong className="text-dark">Marketing Experts</strong>
            </p>
          </div>
          
          {/* Event Image */}
          <img 
            src={event.thumbnail} 
            alt={event.title}
            className="img-fluid rounded mb-4 w-100"
            style={{ 
              height: '400px', 
              objectFit: 'cover',
              borderRadius: '12px'
            }}
          />
          
          {/* Details Section - Left Aligned */}
          <div className="text-start mb-4">
            <h5 className="fw-bold mb-3" style={{ fontSize: '1.4rem', color: '#333' }}>
              Details:
            </h5>
            <p className="mb-0" style={{ 
              lineHeight: '1.8', 
              fontSize: '16px',
              color: '#555'
            }}>
              {event.description}
            </p>
          </div>
          
          {/* Additional Information - Left Aligned */}
          <div className="text-start mb-4">
            <h5 className="fw-bold mb-3" style={{ fontSize: '1.4rem', color: '#333' }}>
              Additional Information:
            </h5>
            <div className="row">
              <div className="col-md-6 mb-3">
                <p className="mb-2" style={{ fontSize: '15px' }}>
                  <strong>Dress Code:</strong> <span className="text-muted">Smart casual</span>
                </p>
              </div>
              <div className="col-md-6 mb-3">
                <p className="mb-2" style={{ fontSize: '15px' }}>
                  <strong>Age Restrictions:</strong> <span className="text-muted">18 and above</span>
                </p>
              </div>
            </div>
          </div>
          
          {/* Event Tags - Left Aligned with Mobile Spacing */}
          <div className="text-start">
            <h5 className="fw-bold mb-3" style={{ fontSize: '1.4rem', color: '#333' }}>
              Event Tags:
            </h5>
            <div className="d-flex flex-wrap gap-2">
              {event.tags && event.tags.map((tag, index) => (
                <span 
                  key={index} 
                  className="badge bg-danger px-3 py-2 mb-2"
                  style={{ 
                    fontSize: '14px', 
                    fontWeight: '500',
                    borderRadius: '20px'
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
        
        {/* Right Column - Event Info */}
        <div className="col-lg-4">
          {/* Date, Location, Price Box - Left Aligned Content */}
          <div className="card border-0 shadow-sm mb-4" style={{ borderRadius: '12px' }}>
  <div className="card-body ps-0 pe-4 pt-4 pb-4">
    
    {/* Date and Time */}
    <div className="mb-4">
      <div className="d-flex align-items-start">
        <i className="bi bi-calendar-event me-3 mt-1 text-primary" style={{ fontSize: '18px' }}></i>
        {/* <div> */}
          <div className="fw-semibold" style={{ fontSize: '15px', color: '#333' }}>
          📅 : {startTime} to {endTime}
          </div>
          {/* <div className="text-muted small">to</div>
          <div className="fw-semibold" style={{ fontSize: '15px', color: '#333' }}>
            {endTime}
          </div> */}
        {/* </div> */}
      </div>
    </div>

    {/* Venue */}
    <div className="mb-4">
      <div className="d-flex align-items-start">
        <i className="bi bi-geo-alt me-3 mt-1 text-success" style={{ fontSize: '18px' }}></i>
        <div>
          <div className="fw-semibold" style={{ fontSize: '15px', color: '#333' }}>
            📍: {event.venue || (event.type === 'online' ? 'Online Event' : 'Venue TBD')}
          </div>
          {/* {event.venue && event.type === 'offline' && (
            <div className="text-muted small">In-person event</div>
          )} */}
        </div>
      </div>
    </div>

    {/* Price */}
    <div>
      <div className="d-flex align-items-start">
        <i className="bi bi-currency-rupee me-3 mt-1 text-warning" style={{ fontSize: '18px' }}></i>
        <div>
          <div className="fw-semibold" style={{ fontSize: '15px', color: '#333' }}>
            💰: {event.price === 0 ? 'Free' : `₹${event.price.toLocaleString()}`}
          </div>
          {/* <div className="text-muted small">Registration fee</div> */}
        </div>
      </div>
    </div>

  </div>
</div>

          
          {/* Speakers Section */}
          <div className="card border-0 shadow-sm mb-4" style={{ borderRadius: '12px' }}>
            <div className="card-body p-4">
              <h5 className="fw-bold mb-4 text-start" style={{ fontSize: '1.3rem', color: '#333' }}>
                Speakers ({event.speakers ? event.speakers.length : 0})
              </h5>
              <div className="row g-3">
                {event.speakers && event.speakers.map((speaker, index) => (
                  <div key={index} className="col-6">
                    <div className="text-center">
                      <img 
                        src={index === 0 ? 
                          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face" : 
                          "https://images.unsplash.com/photo-1511367461989-f85a21fda167?w=80&h=80&fit=crop&crop=face"
                        }
                        alt={speaker}
                        className="rounded-circle mb-2"
                        width="70"
                        height="70"
                        style={{ objectFit: 'cover' }}
                      />
                      <div className="fw-semibold small mb-1" style={{ fontSize: '14px' }}>
                        {speaker}
                      </div>
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
          <button className="btn btn-danger w-100 py-3 fw-bold" style={{ 
            fontSize: '16px',
            borderRadius: '8px',
            transition: 'all 0.3s ease'
          }}>
            RSVP
          </button>
        </div>
      </div>
    </div>
  )
}

export default EventDetails
