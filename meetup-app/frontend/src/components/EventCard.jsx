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
    <div className="col-md-4 mb-4">
      <div className="card h-100 border-0 shadow-sm">
        <div className="position-relative">
          {/* Event Type Badge */}
          <span className={`position-absolute badge ${
            event.type === 'online' ? 'bg-primary' : 'bg-secondary'
          }`} style={{ 
            top: '10px', 
            left: '10px', 
            zIndex: 10,
            fontSize: '12px'
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
          <p className="text-muted small mb-2">
            {formatDate(event.date)}
          </p>
          
          {/* Title */}
          <h6 className="card-title fw-bold mb-3">
            <Link 
              to={`/event/${event._id}`} 
              className="text-decoration-none text-dark"
            >
              {event.title}
            </Link>
          </h6>
        </div>
      </div>
    </div>
  )
}

export default EventCard
