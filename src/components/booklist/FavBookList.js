import React, { useState, useEffect } from 'react';
import Card from '../card/Card';
import { toast } from 'react-toastify';
import { useNavigate, useLocation } from 'react-router-dom';

const FavBookList = () => {
  const [favBooks, setFavBooks] = useState([]);
  const navigate = useNavigate();
  let location = useLocation();

  useEffect(() => {
    if (localStorage.getItem('token')) {
      getFavBooks();
    } else {
      navigate('/login');
    }
    // eslint-disable-next-line
  }, []);

  const getFavBooks = async () => {
    const res = await fetch('http://localhost:5000/api/books/fetchbooks', {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        'auth-token': localStorage.getItem('token'),
      },
    });
    const data = await res.json();
    setFavBooks(data);
  };
  const handleRemove = async ({ _id }) => {
    try {
      const res = await fetch(
        `http://localhost:5000/api/books/deletebooks/${_id}`,
        {
          method: 'DELETE',
          headers: {
            'content-type': 'application/json',
            'auth-token': localStorage.getItem('token'),
          },
        }
      );
      const data = await res.json();
      const newFavBook = favBooks.filter((book) => {
        return book._id !== _id;
      });
      setFavBooks(newFavBook);
      if (data.success) {
        toast.success('Removed', {
          position: toast.POSITION.TOP_CENTER,
        });
      } else {
        toast.error(data.error, {
          position: toast.POSITION.TOP_CENTER,
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  const headingValue =
    location.pathname === '/fav-books' ? 'Favourite' : 'Recommended';
  return (
    <div className="container">
      <h3 className="heading-text text-center mb-5">
        Your {headingValue} Books
      </h3>
      <div className="row">
        {favBooks.map((book) => {
          // console.log(book);
          return (
            <Card
              key={book._id}
              book={book}
              title={book.title ? book.title.slice(0, 25) : ''}
              authors={book.authors ? book.authors.join(', ') : ''}
              description={
                book.description ? book.description.slice(0, 120) : ''
              }
              imgLink={
                book.image
                  ? book.image
                  : 'https://www.generazionecritica.it/www-gc/wp-content/uploads/2019/04/PRIX-DU-LIVRE2040.jpg'
              }
              language={book.language ? book.language : ''}
              viewLink={book.infoLink ? book.infoLink : ''}
              handleClick={handleRemove}
              buttonText="Remove"
            />
          );
        })}
      </div>
    </div>
  );
};

export default FavBookList;
