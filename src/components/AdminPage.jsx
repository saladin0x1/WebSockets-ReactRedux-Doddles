import React, { useState } from 'react';
import '../styles/AdminPage.css'; // Admin specific styles

const AdminPage = () => {
  const [gameStarted, setGameStarted] = useState(false);
  const [users, setUsers] = useState([]);

  const startGame = () => {
    setGameStarted(true);
    // Simulate user joining with a delay (for demo purposes)
    setTimeout(() => {
      setUsers([{ id: 'User 1' }, { id: 'User 2' }]); // Example of users joining
    }, 2000); // Simulate users joining after 2 seconds
  };

  return (
    <div className="admin-page">
      <h1>Admin Panel</h1>
      <p>Welcome to the Admin Dashboard</p>

      {/* Start Game Button */}
      {!gameStarted && (
        <button className="start-game-btn" onClick={startGame}>
          Start A Game
        </button>
      )}

      {/* Game Table: Visible after game is started */}
      {gameStarted && (
        <div className="game-table">
          <table>
            <thead>
              <tr>
                <th>{users.length === 0 ? 'Waiting for Users...' : 'Users Joined'}</th>
              </tr>
            </thead>
            <tbody>
              {users.length === 0 ? (
                <tr>
                  <td>Loading...</td>
                </tr>
              ) : (
                users.map((user, index) => (
                  <tr key={index}>
                    <td>{user.id}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminPage;
