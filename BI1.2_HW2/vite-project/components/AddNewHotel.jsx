function AddNewHotel({ onHotelAdded }) {
  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = e.target;

    const newHotel = {
      name: form.name.value,
      category: form.category.value,
      location: form.location.value,
      rating: Number(form.rating.value),
      website: form.website.value,
      phoneNumber: form.phoneNumber.value,
      checkInTime: form.checkInTime.value,
      checkOutTime: form.checkOutTime.value,
      amenities: form.amenities.value,
      priceRange: form.priceRange.value,
      reservationsNeeded: form.reservationsNeeded.checked,
      isParkingAvailable: form.isParkingAvailable.checked,
      isWifiAvailable: form.isWifiAvailable.checked,
      isPoolAvailable: form.isPoolAvailable.checked,
      isSpaAvailable: form.isSpaAvailable.checked,
      isRestaurantAvailable: form.isRestaurantAvailable.checked,
      photos: form.photos.value,
    };

    try {
      const res = await fetch("http://localhost:3000/hotels", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newHotel),
      });

      if (!res.ok) throw new Error("Failed to add hotel");

      const data = await res.json();
      console.log("Hotel added:", data);
      onHotelAdded(data);
      form.reset();
    } catch (err) {
      console.error("Error:", err);
    }
  };

  return (
    <div>
      <h2>Add New Hotel</h2>
      <form onSubmit={handleSubmit}>
        <label>Name: </label>
        <input type="text" name="name" required /><br /><br />

        <label>Category: </label>
        <select name="category" required>
          <option value="Luxury">Luxury</option>
          <option value="Business">Business</option>
          <option value="Budget">Budget</option>
          <option value="Resort">Resort</option>
        </select><br /><br />

        <label>Location: </label>
        <input type="text" name="location" required /><br /><br />

        <label>Rating: </label>
        <input type="number" name="rating" min="1" max="5" /><br /><br />

        <label>Website: </label>
        <input type="text" name="website" /><br /><br />

        <label>Phone Number: </label>
        <input type="text" name="phoneNumber" /><br /><br />

        <label>Check-In Time: </label>
        <input type="text" name="checkInTime" /><br /><br />

        <label>Check-Out Time: </label>
        <input type="text" name="checkOutTime" /><br /><br />

        <label>Amenities: </label>
        <input type="text" name="amenities" /><br /><br />

        <label>Price Range: </label>
        <select name="priceRange">
          <option value="$">$</option>
          <option value="$$">$$</option>
          <option value="$$$">$$$</option>
          <option value="$$$$">$$$$</option>
        </select><br /><br />

        <label>
          <input type="checkbox" name="reservationsNeeded" /> Reservations Needed
        </label><br />

        <label>
          <input type="checkbox" name="isParkingAvailable" /> Parking Available
        </label><br />

        <label>
          <input type="checkbox" name="isWifiAvailable" /> Wifi Available
        </label><br />

        <label>
          <input type="checkbox" name="isPoolAvailable" /> Pool Available
        </label><br />

        <label>
          <input type="checkbox" name="isSpaAvailable" /> Spa Available
        </label><br />

        <label>
          <input type="checkbox" name="isRestaurantAvailable" /> Restaurant Available
        </label><br />

        <label>Photos (URL): </label>
        <input type="text" name="photos" /><br /><br />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default AddNewHotel;
