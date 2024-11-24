import React, { useState } from 'react';
import '../styles/Auth.css'; // Import CSS file
import PocketBase from 'pocketbase'; // Import the PocketBase SDK

const pb = new PocketBase('http://127.0.0.1:8090'); // Connect to your PocketBase instance

const Auth = ({ onAuthSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [isLogin, setIsLogin] = useState(true); // Toggle between login and signup

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Check for matching passwords if signup
    if (!isLogin && password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    if (email && password) {
      try {
        if (isLogin) {
          // Login
          try {
            const authData = await pb.collection('users').authWithPassword(email, password);
            onAuthSuccess(authData); // Handle the auth success, pass the auth data
          } catch (error) {
            setError('Login failed. Please check your credentials.');
          }
        } else {
          // Signup
          const data = {
            email,
            password,
            passwordConfirm: confirmPassword, // Password confirmation required for signup
          };
          try {
            const record = await pb.collection('users').create(data);
            // Optionally send verification email
            await pb.collection('users').requestVerification(email);
            setIsLogin(true); // Switch to login view after successful signup
          } catch (error) {
            setError('Signup failed. Please try again.');
          }
        }
      } catch (err) {
        setError('Server error, please try again later.');
      }
    } else {
      setError('Please fill in all fields.');
    }
  };

  return (
    <div className="auth-container">
      <h2>{isLogin ? 'Login' : 'Sign Up'}</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {!isLogin && (
          <div className="form-group">
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
        )}
        {error && <p className="error">{error}</p>}
        <button type="submit">{isLogin ? 'Login' : 'Sign Up'}</button>
      </form>
      <div className="auth-switch">
        <a
          href="#"
          onClick={() => {
            setIsLogin(!isLogin); // Toggle between login and signup
          }}
        >
          {isLogin ? "Don't have an account? Sign up" : 'Already have an account? Login'}
        </a>
      </div>
    </div>
  );
};

export default Auth;
