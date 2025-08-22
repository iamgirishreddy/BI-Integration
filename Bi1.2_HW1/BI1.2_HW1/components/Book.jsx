function Book({ book, onDelete }) {
  if (!book || !book.title) {
    return <p>Book data missing</p>;
  }

  return (
    <div style={{ border: "1px solid gray", margin: "10px", padding: "10px" }}>
      <h3>{book.title}</h3>
      <p><b>Author:</b> {book.author}</p>
      <p><b>Year:</b> {book.publishedYear}</p>
      <p><b>Genre:</b> {book.genre}</p>
      <p><b>Language:</b> {book.language}</p>
      <p><b>Country:</b> {book.country}</p>
      <p><b>Rating:</b> {book.rating}</p>
      <p><b>Summary:</b> {book.summary}</p>
      {book.coverImageUrl && (
        <img src={book.coverImageUrl} alt={book.title} width="120" />
      )}
      <br /><br />
      <button onClick={() => onDelete(book.id)}>Delete</button>
    </div>
  );
}

export default Book;
