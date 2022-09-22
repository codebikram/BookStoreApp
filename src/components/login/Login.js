import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';

const Login = (props) => {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  let navigate = useNavigate();
  const onChangeText = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };
  const handleLogin = async (e) => {
    e.preventDefault();
    const response = await fetch(`http://localhost:5000/api/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password,
      }),
    });
    const json = await response.json();
    console.log(json);
    if (json.success) {
      //save the token in local storage
      localStorage.setItem('token', json.authtoken);
      toast.success('Logged in successfully', {
        position: toast.POSITION.TOP_CENTER,
      });
      navigate('/');
    } else {
      toast.error('Invalid credentials', {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  };
  return (
    <div className="signin-section">
      <h2 className="text-center">Login and Use</h2>
      <form className="input-section" onSubmit={handleLogin}>
        <div className="mb-3">
          <input
            type="email"
            className="form-control"
            placeholder="Email"
            name="email"
            value={credentials.email}
            onChange={onChangeText}
            required={true}
          />
        </div>
        <div className="mb-3">
          <input
            type="password"
            className="form-control"
            placeholder="Password"
            name="password"
            value={credentials.password}
            onChange={onChangeText}
            required={true}
          />
        </div>
        <p className="forget mb-1">Forget password?</p>
        <Link className="sign-link mb-3 text-right" to="/signup">
          Create New Account
        </Link>
        <div className="btn-section">
          <button type="submit" className="btn btn-dark btn-d">
            LOG IN
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
