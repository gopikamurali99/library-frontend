// src/routes/SignIn.jsx
import React, { useState } from 'react';
import { Link, useNavigate, useLoaderData } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

export async function loader() {
  // Fetch any necessary data for the Sign In page
  const response = await fetch(`https://library-backend-xnel.onrender.com/user`);
  const data = await response.json();
  return data;
}

const SignIn = () => {
  const data = useLoaderData();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch('https://library-backend-xnel.onrender.com/user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error('Sign In failed. Please check your credentials.');
      }

      const data = await response.json();
      // Handle successful sign in (e.g., store token, redirect)
      console.log(data);
      navigate('/'); // Redirect to home or another page
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="container">
      <h2>Sign In</h2>
      {error && <p className="text-danger">{error}</p>}
      <form onSubmit={handleSubmit}>
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
        <button type="submit" className="btn btn-primary">Sign In</button>
      </form>
      <p className="mt-3">Don't have an account? <Link to="/signup">Sign Up</Link></p>
    </div>
  );
};

export default SignIn;