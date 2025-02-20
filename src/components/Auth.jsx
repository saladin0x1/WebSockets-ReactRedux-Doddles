import React, { useState } from 'react';
import '../styles/Auth.css'; // Import CSS file
import PocketBase from 'pocketbase'; // Import the PocketBase SDK
import { useNavigate } from 'react-router-dom'; // Import useNavigate from React Router

const pb = new PocketBase('http://127.0.0.1:8090'); // Connect to your PocketBase instance

const Auth = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [username, setUsername] = useState('');
  const [firstName, setFirstName] = useState(''); // New state for firstName
  const [lastName, setLastName] = useState('');   // New state for lastName
  const [error, setError] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();
  const redirectUrl = '/Profile';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!isLogin && password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    if (email && password && (isLogin || (username && firstName && lastName))) { // Ensure new fields are checked for signup
      try {
        if (isLogin) {
          // Login logic
          const authData = await pb.collection('users').authWithPassword(email, password);

          if (pb.authStore.isValid) {
            console.log('Token:', pb.authStore.token);
            console.log('User ID:', pb.authStore.model.id);
            navigate(redirectUrl);
          }
        } else {
          // Signup logic - Include firstName and lastName from seeder example
          const data = {
            username: username,
            email: email,
            emailVisibility: true, // As in seeder example
            password: password,
            passwordConfirm: confirmPassword,
            firstName: firstName, // Added from seeder
            lastName: lastName,   // Added from seeder
            // bio: '', // You can add more fields here if you want to include them in signup, e.g., bio, profilePicture
          };

          try {
            const record = await pb.collection('users').create(data); // Capture the record if needed
            console.log('Signup Record:', record); // Log the created record for success feedback
            await pb.collection('users').requestVerification(email);
            setIsLogin(true);
            setError('Signup successful! Please check your email to verify your account.');
          } catch (signupErr) {
            console.error('Signup Error:', signupErr);
            if (signupErr instanceof Error) {
              setError(`Signup failed: ${signupErr.message}`); // Display detailed error message
            } else {
              setError('Signup failed. Please try again.');
            }
            return;
          }
        }
      } catch (err) {
        setError(isLogin ? 'Login failed. Please check your credentials.' : 'Signup failed. Please try again.');
        console.error('General Auth Error:', err);
      }
    } else {
      setError('Please fill in all fields.'); // Updated to reflect new required fields in signup
    }
  };

  return (
    <div className="auth-container">
      <h2>{isLogin ? 'Login' : 'Sign Up'}</h2>
      <form onSubmit={handleSubmit}>
        {!isLogin && (
          <>
            <div className="form-group">
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                placeholder="First Name" // Updated placeholder
                value={firstName}         // Bind to firstName state
                onChange={(e) => setFirstName(e.target.value)} // Update firstName state
                required
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                placeholder="Last Name"  // Updated placeholder
                value={lastName}          // Bind to lastName state
                onChange={(e) => setLastName(e.target.value)}    // Update lastName state
                required
              />
            </div>
          </>
        )}
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
        <button type="submit">{isLogin ? (error.startsWith('Signup successful') ? 'Login' : 'Login') : 'Sign Up'}</button>
      </form>
      <div className="auth-switch">
        <button
          onClick={() => {
            setIsLogin(!isLogin);
            setError('');
          }}
        >
          {isLogin ? "Don't have an account? Sign up" : 'Already have an account? Login'}
        </button>
      </div>
    </div>
  );
};

export default Auth;