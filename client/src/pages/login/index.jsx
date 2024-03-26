import axios from 'axios';

import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../lib/AuthProvider';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const { setUser } = useAuth();

  const handleLogin = async (event) => {
    event.preventDefault();

    console.log(username);
    console.log(password);

    try {
      const data = {
        username: username,
        password: password,
      };

      const response = await axios.post(
        'http://localhost:3000/auth/login',
        data,
        {
          withCredentials: true, // Sonst wird der Cookie nicht gesetzt
        }
      );

      const user = response.data;

      if (!user) {
        return; // Hier wird die Funktion abgebrochen/beendet
      }

      // Weiterleiten zur Dashboard-Seite, wenn ein User sich erfolgreich einloggt
      setUser(user);
      navigate('/dashboard');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <main>
      <h1>Sign in to your account!</h1>

      <div className="card-wrapper">
        <div className="card">
          <form onSubmit={(event) => handleLogin(event)}>
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

            <button type="submit">Sign In</button>
          </form>
        </div>

        <div>
          <p>
            Not a member? <Link to="/register">Register</Link>
          </p>

          <p>
            Going back? <Link to="/">Homepage</Link>
          </p>
        </div>
      </div>
    </main>
  );
}

export default Login;
