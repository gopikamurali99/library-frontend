// src/routes/SignUp.jsx
import React, { useState } from 'react';
import { Link, useLoaderData } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

export async function loader() {
  
  const response = await fetch('https://library-backend-xnel.onrender.com/user');
  const data = await response.json();
  return data;
}

const SignUp = () => {
  const data = useLoaderData();
  const [name, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
    
      const checkResponse = await fetch('https://library-backend-xnel.onrender.com/user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const checkData = await checkResponse.json();
      if (!checkResponse.ok) {
        throw new Error(checkData.message || 'User check failed.');
      }

      if (checkData.exists) {
        setError('User already exists. Please sign in.');
        return;
      }

      // Create new user
      const response = await fetch(`https://library-backend-xnel.onrender.com/user`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
      });

      if (!response.ok) {
        throw new Error('Sign Up failed. Please try again.');
      }

      setSuccess('Sign Up successful! You can now sign in.');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="container">
      <h2>Sign Up</h2>
      {error && <p className="text-danger">{error}</p>}
      {success && <p className="text-success">{success}</p>}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Username</label>
          <input
            type="text"
            className="form-control"
            id="name"
            value={name}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email address</label>
          <input
            type="email"
            className="form-control"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input
            type="password"
            className="form-control"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Sign Up</button>
      </form>
      <p className="mt-3">Already have an account? <Link to="/signin">Sign In</Link></p>
    </div>
  );
};

export default SignUp;