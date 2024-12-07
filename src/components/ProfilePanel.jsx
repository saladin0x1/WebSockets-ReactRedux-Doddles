import React, { useState } from 'react';
import '../styles/ProfilePanel.css'; // Import the CSS

const ProfilePanel = () => {
  const [user, setUser] = useState({
    firstName: 'Salah-Eddine',
    lastName: 'El Ouali',
    email: 'Saladin0x1@wesmarter.org',
    phone: '+212627343287',
    country: 'Morocco',
    city: 'Tangier',
    zip: '90090',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  return (
    <div className="profile-panel">
      <aside className="sidebar">
        <h3>User Profile Management</h3>
        <ul>
          <li className="active">Personal Info</li>
          <li>Emails & Password</li>
          <li>Notifications</li>
          <li>Businesses</li>
          <li>Integration</li>
        </ul>
      </aside>
      <main className="profile-container">
        <header className="profile-header">
          <div className="profile-photo-container">
            <img
              src="https://via.placeholder.com/150"
              alt="Profile"
              className="profile-photo"
            />
            <button className="change-photo">+</button>
          </div>
          <h2>Personal Information</h2>
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
