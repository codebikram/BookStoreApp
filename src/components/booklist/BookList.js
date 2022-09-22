import React, { useEffect, useState } from 'react';
import Card from '../card/Card';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const BookList = (props) => {
  const [books, setBooks] = useState([]);
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem('token')) {
      navigate('/login');
    }
    // eslint-disable-next-line
  }, []);

  const getBooks = async (query) => {
    const res = await fetch(
      `https://www.googleapis.com/books/v1/volumes?q=${query}&maxResults=18`
    );
    const data = await res.json();
    // console.log(data);
    setBooks(data.items);
  };
  const handleSearch = (e) => {
    e.preventDefault();
    console.log(query);
    if (query) {
      getBooks(query);
    } else {
      toast.error('Missing search parameter', {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  };

  return (
    <>
      <div className="container">
        <h3 className="heading-text text-center mb-3">Book Finder</h3>
        <form className="search mb-5" onSubmit={handleSearch}>
          <input
            type="text"
            className="form-control"
            placeholder="Enter book or author or category name"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button type="submit" className="btn btn-dark">
            <i class="bi bi-search"></i>
          </button>
        </form>
        <div className="row">
          {books.map((book) => {
            // console.log(book);
            return (
              <Card
                key={book.id}
                book={book}
                title={
                  book.volumeInfo.title
                    ? book.volumeInfo.title.slice(0, 25)
                    : ''
                }
                authors={
                  book.volumeInfo.authors
                    ? book.volumeInfo.authors.join(', ')
                    : ''
                }
                description={
                  book.volumeInfo.description
                    ? book.volumeInfo.description.slice(0, 120)
                    : ''
                }
                imgLink={
                  book.volumeInfo.imageLinks
                    ? book.volumeInfo.imageLinks.thumbnail
                    : 'https://www.generazionecritica.it/www-gc/wp-content/uploads/2019/04/PRIX-DU-LIVRE2040.jpg'
                }
                language={
                  book.volumeInfo.language ? book.volumeInfo.language : ''
                }
                viewLink={
                  book.volumeInfo.infoLink ? book.volumeInfo.infoLink : ''
                }
                handleClick={props.handleClick}
                buttonText="Add to favourite"
              />
            );
          })}
        </div>
      </div>
    </>
  );
};

export default BookList;
