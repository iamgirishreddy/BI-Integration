import { useEffect, useState } from "react";
import AddNewHotel from "../components/AddNewHotel";
import Hotel from "../components/Hotel";

function App() {
  const [hotels, setHotels] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/hotels")
      .then((res) => res.json())
      .then((data) => setHotels(data))
      .catch((err) => console.error("Error fetching hotels:", err));
  }, []);

  const handleHotelAdded = (hotel) => {
    setHotels((prev) => [...prev, hotel]);
  };

  const handleHotelDelete = async (id) => {
    try {
      const res = await fetch(`http://localhost:3000/hotels/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Failed to delete hotel");

      alert("Hotel deleted successfully!");
      setHotels((prev) => prev.filter((hotel) => hotel.id !== id));
    } catch (err) {
      console.error("Error deleting hotel:", err);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Hotel Management</h1>

      <AddNewHotel onHotelAdded={handleHotelAdded} />

      <h2>Hotels List</h2>
      {hotels.length === 0 ? (
        <p>No hotels found.</p>
      ) : (
        hotels.map((hotel) => (
          <Hotel key={hotel.id} hotel={hotel} onDelete={handleHotelDelete} />
        ))
      )}
    </div>
  );
}

export default App;
