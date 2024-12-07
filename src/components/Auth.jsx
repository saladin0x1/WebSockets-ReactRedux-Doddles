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

    // Check for matching passwords if signing up
    if (!isLogin && password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    if (email && password) {
      try {
        if (isLogin) {
          // Login logic
          const authData = await pb.collection('users').authWithPassword(email, password);

          if (pb.authStore.isValid) {
            console.log('Token:', pb.authStore.token);
            console.log('User ID:', pb.authStore.model.id);
            onAuthSuccess(authData); // Handle auth success and pass the auth data
          }
        } else {
          // Signup logic
          const data = {
            email,
            password,
            passwordConfirm: confirmPassword,
            emailVisibility: true, // Optional: Ensure email is visible if required
          };

          await pb.collection('users').create(data);
          await pb.collection('users').requestVerification(email); // Send a verification email
          setIsLogin(true); // Switch to login view
        }
      } catch (err) {
        setError(isLogin ? 'Login failed. Please check your credentials.' : 'Signup failed. Please try again.');
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
        <button
          onClick={() => {
            setIsLogin(!isLogin); // Toggle between login and signup
            setError(''); // Clear any existing errors
          }}
        >
          {isLogin ? "Don't have an account? Sign up" : 'Already have an account? Login'}
        </button>
      </div>
    </div>
  );
};

export default Auth;
