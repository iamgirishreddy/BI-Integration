import { useState } from "react";

function AddMovieForm() {
  const [movies, setMovies] = useState([]); // store multiple movies
  const [message, setMessage] = useState(""); // success message

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/movies", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: event.target.title.value,
          releaseYear: event.target.releaseYear.value,
          genre: event.target.genre.value,
          director: event.target.director.value,
          actors: event.target.actors.value,
          language: event.target.language.value,
          country: event.target.country.value,
          rating: event.target.rating.value,
          plot: event.target.plot.value,
          awards: event.target.awards.value,
          posterUrl: event.target.posterUrl.value,
          trailerUrl: event.target.trailerUrl.value,
        }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      console.log("Movie added successfully:", data);

      // Add new movie to list
      setMovies((prev) => [...prev, data]);

      // Clear message and reset form
      setMessage("");
      event.target.reset();
    } catch (error) {
      console.error("Error adding movie:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/movies/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete movie");
      }

      // Remove deleted movie from state
      setMovies((prev) => prev.filter((movie) => movie.id !== id));

      // Show success message
      setMessage("Deleted successfully");
    } catch (error) {
      console.error("Error deleting movie:", error);
    }
  };

  return (
    <div>
      <h2>Add New Movie</h2>
      <form onSubmit={handleSubmit}>
        <label>Title: </label>
        <input type="text" name="title" /><br /><br />

        <label>Release Year: </label>
        <input type="text" name="releaseYear" /><br /><br />

        <label>Genre: </label>
        <input type="text" name="genre" /><br /><br />

        <label>Director: </label>
        <input type="text" name="director" /><br /><br />

        <label>Actors: </label>
        <input type="text" name="actors" /><br /><br />

        <label>Language: </label>
        <input type="text" name="language" /><br /><br />

        <label>Country: </label>
        <input type="text" name="country" /><br /><br />

        <label>Rating: </label>
        <input type="text" name="rating" /><br /><br />

        <label>Plot: </label>
        <input type="text" name="plot" /><br /><br />

        <label>Awards: </label>
        <input type="text" name="awards" /><br /><br />

        <label>Poster URL: </label>
        <input type="text" name="posterUrl" /><br /><br />

        <label>Trailer URL: </label>
        <input type="text" name="trailerUrl" /><br /><br />

        <button type="submit">Submit</button>
      </form>

      <h3>Movies Added:</h3>
      {movies.map((movie) => (
        <div key={movie.id}>
          <p><b>Title:</b> {movie.title} | <b>Director:</b> {movie.director} | <b>Year:</b> {movie.releaseYear}</p>
          <button onClick={() => handleDelete(movie.id)}>Delete</button>
        </div>
      ))}

      {message && <p>{message}</p>}
    </div>
  );
}

export default AddMovieForm;
