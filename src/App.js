import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BookCard from './components/BookCard';
import BookModal from './components/BookModal';
import './App.css';

function App() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState('javascript');
  const [page, setPage] = useState(1);
  const [selectedBook, setSelectedBook] = useState(null);
  const [sortOption, setSortOption] = useState('');

  // Define fetchBooks as a separate function
  const fetchBooks = async () => {
    setLoading(true);
    try {
     
      const response = await axios.get(
        `https://www.googleapis.com/books/v1/volumes?q=${query}&startIndex=${(page - 1) * 10}&maxResults=10`
      );
      const fetchedBooks = response.data.items.map((item) => ({
        id: item.id,
        cover: item.volumeInfo.imageLinks?.thumbnail || '',
        title: item.volumeInfo.title,
        author: item.volumeInfo.authors?.join(', ') || 'Unknown Author',
        description: item.volumeInfo.description || 'No description available.',
      }));
      setBooks((prevBooks) => (page === 1 ? fetchedBooks : [...prevBooks, ...fetchedBooks]));
    } catch (error) {
      console.error('Error fetching books:', error);
    }
    setLoading(false);
  };

  // Fetch books when query or page changes
  useEffect(() => {
    fetchBooks();
  }, [query, page]);

  // Handle search query submission
  const handleSearch = (e) => {
    e.preventDefault();
    if(!query){
      return;
    }else{

      setBooks([]);
      setPage(1);
      fetchBooks(); // Now we can call fetchBooks directly here
    }
  };

  // Handle sorting
  const handleSort = (option) => {
    setSortOption(option);
    const sortedBooks = [...books].sort((a, b) => {
      if (option === 'title') {
        return a.title.localeCompare(b.title);
      } else if (option === 'author') {
        return a.author.localeCompare(b.author);
      }
      return 0;
    });
    setBooks(sortedBooks);
  };

  // Load more books on scroll
  const loadMore = () => {
    if(!query){
      setQuery("javascript")
    }
    setPage((prevPage) => prevPage + 1);
  };

  return (
    <div className="App">
      <h1>Showcase Books</h1>

      {/* Search bar */}
      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search for books..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button type="submit" className={!query ? "no-click": ""} disabled={!query} >Search</button>
      </form>

      {/* Sorting options */}
      <select onChange={(e) => handleSort(e.target.value)} value={sortOption}>
        <option value="">Sort by</option>
        <option value="title">Title</option>
        <option value="author">Author</option>
      </select>

      {/* Book list */}
      <div className="book-list">
        {books.map((book) => (
          <BookCard key={book.id} book={book} onClick={() => setSelectedBook(book)} />
        ))}
      </div>

      {/* Load more button */}
      {loading ? <p>Loading...</p> : <button onClick={loadMore}>Load More</button>}

      {/* Book Modal */}
      {selectedBook && <BookModal book={selectedBook} onClose={() => setSelectedBook(null)} />}
    </div>
  );
}

export default App;
