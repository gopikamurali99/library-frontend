// routes/Book.jsx
import React from 'react';
import { useLoaderData } from 'react-router-dom';
import "../style.css"
const placeholderImages = [
    'https://m.media-amazon.com/images/I/91ofVlsNZZL._AC_UF894,1000_QL80_.jpg',
    'https://m.media-amazon.com/images/I/71ikWD9bxLL._AC_UF1000,1000_QL80_.jpg',
    'https://www.klickbooks.com/uploads/books/5688d4c9b19c2385019d133dad1c37c4.jpg',
    // Add more placeholder images as needed
  ];

export async function loader() {
  const response = await fetch(`https://library-backend-xnel.onrender.com/book`);
  const books = await response.json();
  console.log(books)
  return books;
}

const Book = () => {
  const books = useLoaderData();

  return (
    <section>
      <h2>Books</h2>
      <div className="book-container">
        {books.map((book,index) => (
          <div key={book._id} className="book-card">
            <img src={book.BookImage  || placeholderImages[index % placeholderImages.length]} alt={book.BookName} />
            <p>{book.BookName}</p>
            <p>Author: {book.AuthorName}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Book;