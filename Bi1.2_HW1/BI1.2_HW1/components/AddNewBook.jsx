function AddNewBook({ onBookAdded }) {
  const handleSubmit = async (event) => {
    event.preventDefault();

    const newBook = {
      title: event.target.title.value,
      author: event.target.author.value,
      publishedYear: event.target.publishedYear.value,
      genre: event.target.genre.value,
      language: event.target.language.value,
      country: event.target.country.value,
      rating: event.target.rating.value,
      summary: event.target.summary.value,
      coverImageUrl: event.target.coverImageUrl.value,
    };

    try {
      const response = await fetch("http://localhost:3000/books", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newBook),
      });

      if (!response.ok) {
        throw new Error("Failed to add book");
      }

      const data = await response.json();
      console.log("Book added:", data);

      // update parent
      onBookAdded(data);

      // reset form
      event.target.reset();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div>
      <h2>Add New Book</h2>
      <form onSubmit={handleSubmit}>
        <label>Title: </label>
        <input type="text" name="title" required /><br /><br />

        <label>Author: </label>
        <input type="text" name="author" required /><br /><br />

        <label>Published Year: </label>
        <input type="text" name="publishedYear" required /><br /><br />

        <label>Genre: </label>
        <input type="text" name="genre" /><br /><br />

        <label>Language: </label>
        <input type="text" name="language" /><br /><br />

        <label>Country: </label>
        <input type="text" name="country" /><br /><br />

        <label>Rating: </label>
        <input type="number" name="rating" step="0.1" /><br /><br />

        <label>Summary: </label>
        <textarea name="summary"></textarea><br /><br />

        <label>Cover Image URL: </label>
        <input type="text" name="coverImageUrl" /><br /><br />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default AddNewBook;
