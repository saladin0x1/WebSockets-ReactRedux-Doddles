import React, { useState } from 'react';
import '../styles/AdminPage.css'; // Admin specific styles
import * as XLSX from 'xlsx'; // Import the xlsx library

const AdminPage = () => {
  const [gameStarted, setGameStarted] = useState(false);
  const [users, setUsers] = useState([]);
  const [gameMessages, setGameMessages] = useState('Waiting for users to join...');

  // Simulate user join logic
  const simulateUserJoin = () => {
    if (!gameStarted) return; // Only simulate user join if the game has started
    const newUser = {
      id: `user_${users.length + 1}`,
      answerStatus: null,
      responseTime: null,
    };
    setUsers((prevUsers) => [...prevUsers, newUser]);

    // Update the game message
    setGameMessages(`${users.length + 1} user${users.length + 1 > 1 ? 's' : ''} joined`);
  };

  // Simulate user answering
  const simulateUserAnswer = () => {
    const updatedUsers = users.map((user, index) => {
      if (!user.answerStatus) {
        const randomResponseTime = Math.floor(Math.random() * 30) + 1; // Random response time between 1 and 30 seconds
        user.answerStatus = Math.random() > 0.5 ? '✅' : '❌'; // Random answer status
        user.responseTime = randomResponseTime;
      }
      return user;
    });
    setUsers(updatedUsers);
  };

  // Start the game
  const startGame = () => {
    setGameStarted(true);
    setGameMessages('Waiting for users to join...');
  };

  // Download results as Excel
  const downloadExcel = () => {
    const tableData = users.map((user) => ({
      UserID: user.id,
      AnswerStatus: user.answerStatus || 'N/A',
      ResponseTime: user.responseTime || 'N/A',
    }));

    const ws = XLSX.utils.json_to_sheet(tableData); // Use xlsx utils to convert json to sheet
    const wb = XLSX.utils.book_new(); // Create a new workbook
    XLSX.utils.book_append_sheet(wb, ws, 'Game Results'); // Add the sheet to the workbook

    // Save the file
    XLSX.writeFile(wb, 'game_results.xlsx');
  };

  return (
    <div className="admin-page">
      <h1>Admin Panel</h1>
      <p>Welcome to the Admin Dashboard</p>

      {!gameStarted && (
        <button className="start-game-btn" onClick={startGame}>
          Start A Game
        </button>
      )}

      {gameStarted && (
        <div className="game-table">
          <h3 className="users-count-message">{gameMessages}</h3>

          {/* Game Table */}
          <table>
            <thead>
              <tr>
                <th>User ID</th>
                <th>Answer Status</th>
                <th>Response Time (seconds)</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={index}>
                  <td>{user.id}</td>
                  <td>{user.answerStatus || 'N/A'}</td>
                  <td>{user.responseTime || 'N/A'}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Buttons */}
          <div className="button-group">
            <button className="start-game-btn" onClick={simulateUserJoin}>
              Simulate User Join
            </button>
            <button className="start-game-btn" onClick={simulateUserAnswer}>
              Simulate User Answer
            </button>
            <button className="start-game-btn" onClick={downloadExcel}>
              Download Results as Excel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPage;
