import { Link } from 'react-router-dom'

function EventCard({ event }) {
  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    }) + ' • ' + date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    }) + ' IST'
  }

  return (
    <div className="col-12 col-md-6 col-lg-4 mb-4">
      <Link to={`/event/${event._id}`} className="text-decoration-none">
        <div 
          className="card h-100 border-0 shadow-sm" 
          style={{ 
            cursor: 'pointer',
            transition: 'transform 0.2s ease, box-shadow 0.2s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-4px)';
            e.currentTarget.style.boxShadow = '0 8px 25px rgba(0,0,0,0.15)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)';
          }}
        >
          <div className="position-relative">
            {/* Event Type Badge */}
            <span className={`position-absolute badge ${
              event.type === 'online' ? 'bg-success' : 'bg-primary'
            }`} style={{ 
              top: '10px', 
              left: '10px', 
              zIndex: 10,
              fontSize: '11px',
              fontWeight: '500'
            }}>
              {event.type === 'online' ? 'Online Event' : 'Offline Event'}
            </span>
            
            {/* Event Image */}
            <img 
              src={event.thumbnail} 
              className="card-img-top" 
              alt={event.title}
              style={{ height: '200px', objectFit: 'cover' }}
            />
          </div>
          
          <div className="card-body p-3">
            {/* Date */}
            <p className="text-muted small mb-2" style={{ fontSize: '13px' }}>
              {formatDate(event.date)}
            </p>
            
            {/* Title */}
            <h6 className="card-title fw-bold mb-0 text-dark" style={{ fontSize: '16px' }}>
              {event.title}
            </h6>
            
            {/* Venue for offline events */}
            {event.venue && (
              <p className="text-muted small mt-2 mb-0" style={{ fontSize: '12px' }}>
                📍 {event.venue}
              </p>
            )}
          </div>
        </div>
      </Link>
    </div>
  )
}

export default EventCard
