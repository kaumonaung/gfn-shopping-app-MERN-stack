import axios from 'axios';

import { Link } from 'react-router-dom';

import { useState } from 'react';

function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleCreateAccount = async (event) => {
    event.preventDefault(); // Standardverhalten wollen wir vermeiden (Seite wird neu geladen)

    console.log(username);
    console.log(password);

    // POST Request zu unserem Server
    try {
      const data = {
        username: username,
        password: password,
      };

      const response = await axios.post(
        'http://localhost:3000/auth/register',
        data
      );

      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <main className="page-wrapper">
      <div className="sign-up-wrapper">
        <div className="sign-up-container">
          <div>
            <h2>Sign up for your account</h2>

            <p>
              Already a member? <Link to="/login">Login to your account</Link>
            </p>
          </div>

          <form onSubmit={(event) => handleCreateAccount(event)}>
            <div>
              <label htmlFor="username">Username</label>

              <div className="input-wrapper">
                <input
                  id="username"
                  type="text"
                  name="username"
                  autoComplete="username"
                  value={username}
                  onChange={(event) => setUsername(event.target.value)}
                />
              </div>
            </div>

            <div>
              <label htmlFor="password">Password</label>

              <div className="input-wrapper">
                <input
                  id="password"
                  type="password"
                  name="password"
                  autoComplete="current-password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                />
              </div>
            </div>

            <div>
              <button type="submit">Create Account</button>
            </div>
          </form>
        </div>

        <div className="home-link">
          <Link to="/">Back to Home</Link>
        </div>
      </div>
    </main>
  );
}

export default Register;