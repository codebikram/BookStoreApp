import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const SignUp = (props) => {
  const [credentials, setCredentials] = useState({
    name: '',
    email: '',
    password: '',
    cpassword: '',
  });
  const navigate = useNavigate();

  const onChangeText = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };
  const handleSignUp = async (e) => {
    e.preventDefault();
    console.log('sign up clicked');
    const { name, email, password, cpassword } = credentials;
    if (password !== cpassword) {
      toast.warning('Confirm your password correctly', {
        position: toast.POSITION.TOP_CENTER,
      });
    } else {
      const response = await fetch(
        `http://localhost:5000/api/auth/createuser`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ name, email, password }),
        }
      );
      const json = await response.json();
      console.log(json);
      if (json.success) {
        toast.success('User Registered successfully', {
          position: toast.POSITION.TOP_CENTER,
        });
        navigate('/login');
      } else {
        toast.error('Invaild details', {
          position: toast.POSITION.TOP_CENTER,
        });
      }
    }
  };

  return (
    <div className="signin-section">
      <h2 className="text-center">Sign Up</h2>
      <form className="input-section" onSubmit={handleSignUp}>
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Name"
            name="name"
            value={credentials.name}
            onChange={onChangeText}
            required={true}
          />
        </div>
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
        <div className="mb-3">
          <input
            type="password"
            name="cpassword"
            className="form-control"
            placeholder="Confirm Password"
            value={credentials.cpassword}
            onChange={onChangeText}
            required={true}
          />
        </div>
        <div className="btn-section">
          <button type="submit" className="btn btn-dark btn-d">
            SIGN UP
          </button>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
