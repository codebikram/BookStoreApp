import './App.css';
import { Routes, Route } from 'react-router-dom';
import NavBar from './components/nav/NavBar';
import SignUp from './components/signup/SignUp';
import LogIn from './components/login/Login';
import BookList from './components/booklist/BookList';
import { toast, ToastContainer, Zoom } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import FavBookList from './components/booklist/FavBookList';
import CategoryList from './components/booklist/CategoryList';

function App() {
  const handleAddFav = async (book) => {
    try {
      console.log('add to fav' + book);
      const res = await fetch('http://localhost:5000/api/books/addfavbooks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': localStorage.getItem('token'),
        },
        body: JSON.stringify({
          title: book.volumeInfo.title,
          authors: book.volumeInfo.authors,
          description: book.volumeInfo.description,
          image: book.volumeInfo.imageLinks
            ? book.volumeInfo.imageLinks.thumbnail
            : 'https://www.generazionecritica.it/www-gc/wp-content/uploads/2019/04/PRIX-DU-LIVRE2040.jpg',
          infoLink: book.volumeInfo.infoLink,
          language: book.volumeInfo.language,
        }),
      });
      const data = await res.json();
      console.log(data);
      if (data.success) {
        toast.success('Added', {
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

  return (
    <>
      <NavBar title="Book Store App" />
      <div className="main-container">
        <Routes>
          <Route path="/" element={<BookList handleClick={handleAddFav} />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<LogIn />} />
          <Route path="/fav-books" element={<FavBookList />} />
          <Route path="/recommended-books" element={<FavBookList />} />
          <Route
            path="/horror"
            element={
              <CategoryList category="horror" handleClick={handleAddFav} />
            }
          />
          <Route
            path="/fiction"
            element={
              <CategoryList category="fiction" handleClick={handleAddFav} />
            }
          />
          <Route
            path="/drama"
            element={
              <CategoryList category="drama" handleClick={handleAddFav} />
            }
          />
          <Route
            path="/thriller"
            element={
              <CategoryList category="thriller" handleClick={handleAddFav} />
            }
          />
          <Route
            path="/art"
            element={<CategoryList category="art" handleClick={handleAddFav} />}
          />
          <Route
            path="/science"
            element={
              <CategoryList category="science" handleClick={handleAddFav} />
            }
          />
          <Route
            path="/philosophy"
            element={
              <CategoryList category="philosophy" handleClick={handleAddFav} />
            }
          />
        </Routes>
      </div>
      <ToastContainer transition={Zoom} autoClose={2000} />
    </>
  );
}

export default App;
