import { Link } from 'react-router-dom'

function EventCard({ event }) {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <img 
        src={event.thumbnail} 
        alt={event.title}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-xl font-semibold mb-2">{event.title}</h3>
        <p className="text-gray-600 mb-2">{formatDate(event.date)}</p>
        <span className={`inline-block px-2 py-1 rounded text-xs font-medium ${
          event.type === 'online' 
            ? 'bg-green-100 text-green-800' 
            : 'bg-blue-100 text-blue-800'
        }`}>
          {event.type === 'online' ? '🌐 Online' : '📍 In-Person'}
        </span>
        <p className="text-gray-700 mt-2 line-clamp-2">{event.description}</p>
        <div className="mt-4">
          <Link 
            to={`/event/${event._id}`}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  )
}

export default EventCard
