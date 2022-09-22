import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const NavBar = (props) => {
  let location = useLocation();
  let navigate = useNavigate();

  const handleLogOut = () => {
    localStorage.removeItem('token');
    navigate('/login');
    toast.success('User Logged out successfully', {
      position: toast.POSITION.TOP_CENTER,
    });
  };
  return (
    <nav className="navbar fixed-top navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <Link className="navbar-brand" to="/">
          {props.title}
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse  navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav" style={{ marginLeft: 'auto' }}>
            <li className="nav-item ">
              <Link
                className={`nav-link ${
                  location.pathname === '/' ? 'active' : ''
                }`}
                to="/"
              >
                Search
              </Link>
            </li>
            <li className="nav-item ">
              <Link
                className={`nav-link ${
                  location.pathname === '/horror' ? 'active' : ''
                }`}
                to="/horror"
              >
                Horror
              </Link>
            </li>
            <li className="nav-item ">
              <Link
                className={`nav-link ${
                  location.pathname === '/art' ? 'active' : ''
                }`}
                to="/art"
              >
                Art
              </Link>
            </li>
            <li className="nav-item ">
              <Link
                className={`nav-link ${
                  location.pathname === '/fiction' ? 'active' : ''
                }`}
                to="/fiction"
              >
                Fiction
              </Link>
            </li>
            <li className="nav-item ">
              <Link
                className={`nav-link ${
                  location.pathname === '/science' ? 'active' : ''
                }`}
                to="/science"
              >
                Science
              </Link>
            </li>
            <li className="nav-item ">
              <Link
                className={`nav-link ${
                  location.pathname === '/drama' ? 'active' : ''
                }`}
                to="/drama"
              >
                Drama
              </Link>
            </li>
            <li className="nav-item ">
              <Link
                className={`nav-link ${
                  location.pathname === '/thriller' ? 'active' : ''
                }`}
                to="/thriller"
              >
                Thiriller
              </Link>
            </li>
            <li className="nav-item ">
              <Link
                className={`nav-link ${
                  location.pathname === '/philosophy' ? 'active' : ''
                }`}
                to="/philosophy"
              >
                Philosophy
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link ${
                  location.pathname === '/fav-books' ? 'active' : ''
                }`}
                to="/fav-books"
              >
                Favourite
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link ${
                  location.pathname === '/recommended-books' ? 'active' : ''
                }`}
                to="/recommended-books"
              >
                Recommended
              </Link>
            </li>
          </ul>
          {!localStorage.getItem('token') ? (
            <form className="form-inline my-2 my-lg-0">
              <Link
                className="btn btn-primary btn-d mx-1 my-2"
                role="button"
                to="/login"
              >
                Log in
              </Link>
              <Link
                className="btn btn-success btn-d mx-1 my-2"
                role="button"
                to="/signup"
              >
                Sign up
              </Link>
            </form>
          ) : (
            <button
              className="btn btn-danger btn-d text-white my-2"
              onClick={handleLogOut}
            >
              Log Out
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
