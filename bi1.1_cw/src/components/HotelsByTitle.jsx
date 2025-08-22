import useFetch from '../useFetch';

const HotelsByTitle = ({ name }) => {
  // fetch single hotel by name from backend
 const { data, loading, error } = useFetch(`http://localhost:3000/hotels?name=${name}`, []);


  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  // since backend returns an array with one hotel
  const hotel = data?.[0];

  if (!hotel) return <div>No hotel found</div>;

  return (
    <div>
      <h1>{hotel.name}</h1>
      <p>City: {hotel.city}</p>
      <p>Rating: {hotel.rating}</p>
    </div>
  );
};

export default HotelsByTitle;
