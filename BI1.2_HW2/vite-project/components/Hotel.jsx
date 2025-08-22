function Hotel({ hotel, onDelete }) {
  if (!hotel || !hotel.name) return <p>Hotel data missing</p>;

  return ( 
    <div style={{ border: "1px solid gray", padding: "10px", margin: "10px" }}>
      <h3>{hotel.name}</h3>
      <p><b>Category:</b> {hotel.category}</p>
      <p><b>Location:</b> {hotel.location}</p>
      <p><b>Rating:</b> {hotel.rating}</p>
      <p><b>Website:</b> {hotel.website}</p>
      <p><b>Phone:</b> {hotel.phoneNumber}</p>
      <p><b>Check-In:</b> {hotel.checkInTime} | <b>Check-Out:</b> {hotel.checkOutTime}</p>
      <p><b>Amenities:</b> {hotel.amenities}</p>
      <p><b>Price Range:</b> {hotel.priceRange}</p>
      <p><b>Reservations Needed:</b> {hotel.reservationsNeeded ? "Yes" : "No"}</p>
      <p><b>Parking:</b> {hotel.isParkingAvailable ? "Yes" : "No"}</p>
      <p><b>Wifi:</b> {hotel.isWifiAvailable ? "Yes" : "No"}</p>
      <p><b>Pool:</b> {hotel.isPoolAvailable ? "Yes" : "No"}</p>
      <p><b>Spa:</b> {hotel.isSpaAvailable ? "Yes" : "No"}</p>
      <p><b>Restaurant:</b> {hotel.isRestaurantAvailable ? "Yes" : "No"}</p>
      {hotel.photos && <img src={hotel.photos} alt={hotel.name} width="120" />}
      <br /><br />
      <button onClick={() => onDelete(hotel.id)}>Delete</button>
    </div>
  );
}

export default Hotel;
