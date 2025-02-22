import React, { useState } from 'react';
import '../styles/ProfilePanel.css'; // Import the CSS
import PocketBase from 'pocketbase';
import { useNavigate } from 'react-router-dom';

const pb = new PocketBase('http://127.0.0.1:8090'); // Connect to your PocketBase instance

const ProfilePanel = () => {
  const [user, setUser] = useState({
    firstName: 'Salah-Eddine',
    lastName: 'El Ouali',
    email: 'saladin0x1@wesmarter.org',
    phone: '+212627343287',
    country: 'Morocco',
    city: 'Tangier',
    zip: '90090',
  });

  const [sidebarItems, setSidebarItems] = useState([
    { id: 1, title: 'Personal Info', active: true, underConstruction: false },
    { id: 2, title: 'Emails & Password', active: false, underConstruction: true },
    { id: 3, title: 'Notifications', active: false, underConstruction: true },
    { id: 4, title: 'Businesses', active: false, underConstruction: true },
    { id: 5, title: 'Integration', active: false, underConstruction: true },
  ]);

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleLogout = () => {
    pb.authStore.clear(); // Clear the authentication store
    navigate('/auth'); // Redirect to the login page
  };

  const handleHome = () => {
    navigate('/'); // Redirect to the home page
  };

  return (
    <div className="profile-panel">
      <aside className="sidebar">
        <h3>User Profile Management</h3>
        <ul>
          {sidebarItems.map((item) => (
            <li
              key={item.id}
              className={`sidebar-item ${item.active ? 'active' : ''} ${
                item.underConstruction ? 'under-construction' : ''
              }`}
            >
              <span className="item-title">{item.title}</span>
              {item.underConstruction && (
                <span className="coming-soon-badge">Coming Soon</span>
              )}
            </li>
          ))}
        </ul>
      </aside>
      <main className="profile-container">
        <header className="profile-header">
          <div className="profile-photo-container">
            <img
              src="https://placehold.jp/150x150.png"
              alt="Profile"
              className="profile-photo"
            />
            <button className="change-photo">+</button>
          </div>
          <h2>Personal Information</h2>
          <div className="header-buttons">
            <button className="home-btn" onClick={handleHome}>
              Home
            </button>
            <button className="logout-btn" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </header>
        <section className="profile-details">
          <div className="form-group">
            <label>First Name</label>
            <input
              type="text"
              name="firstName"
              value={user.firstName}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label>Last Name</label>
            <input
              type="text"
              name="lastName"
              value={user.lastName}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label>Email Address</label>
            <input
              type="email"
              name="email"
              value={user.email}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label>Phone Number</label>
            <input
              type="text"
              name="phone"
              value={user.phone}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label>Country</label>
            <input
              type="text"
              name="country"
              value={user.country}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label>City</label>
            <input
              type="text"
              name="city"
              value={user.city}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label>Zip Code</label>
            <input
              type="text"
              name="zip"
              value={user.zip}
              onChange={handleInputChange}
            />
          </div>
        </section>
        <button className="save-changes-btn">Save Changes</button>
      </main>
    </div>
  );
};

export default ProfilePanel;