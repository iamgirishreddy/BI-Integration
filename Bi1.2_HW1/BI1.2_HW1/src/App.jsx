import { useEffect, useState } from "react";
import "./App.css";
import AddNewBook from "../components/AddNewBook";
import Book from "../components/Book";

function App() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/books")
      .then((res) => res.json())
      .then((data) => setBooks(data))
      .catch((err) => console.error("Error fetching books:", err));
  }, []);

  // Add a new book and update state
  const handleBookAdded = (newBook) => {
    setBooks([...books, newBook]);
  };

  // Delete a book and update state
  const handleDeleteBook = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/books/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete book");
      }

      alert("Book deleted successfully!");

      // remove deleted book from state
      setBooks(books.filter((book) => book.id !== id));
    } catch (error) {
      console.error("Error deleting book:", error);
    }
  };

  return (
    <div>
      <h1>Book Library</h1>
      <AddNewBook onBookAdded={handleBookAdded} />
      <h2>All Books</h2>
      {books.map((book) => (
        <Book key={book.id} book={book} onDelete={handleDeleteBook} />
      ))}
    </div>
  );
}

export default App;
