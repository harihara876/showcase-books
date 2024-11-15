import React from 'react';

function BookCard({ book, onClick }) {
  return (
    <div className="book-card" onClick={onClick}>
      <img
        src={book.cover}
        alt={book.title}
        className="book-cover"
        style={{ width: '100px', height: '150px' }}
      />
      <h3>{book.title}</h3>
      <p>{book.author}</p>
    </div>
  );
}

export default BookCard;
