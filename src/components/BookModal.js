import React, { useState } from 'react';
import './BookModal.css';

function BookModal({ book, onClose }) {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleDescription = () => {
    setIsExpanded((prevState) => !prevState);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-button" onClick={onClose}>X</button>
        <img src={book.cover} alt={book.title} />
        <h2>{book.title}</h2>
        <p><strong>Author(s):</strong> {book.author}</p>
        <p>
          <strong>Description:</strong> 
          {isExpanded ? book.description : `${book.description.substring(0, 200)}...`} {/* Truncate the description */}
        </p>

        {/* Toggle button to show more or less */}
        <button onClick={toggleDescription} className="toggle-description-btn">
          {isExpanded ? 'Show Less' : 'Load More'}
        </button>
      </div>
    </div>
  );
}

export default BookModal;
