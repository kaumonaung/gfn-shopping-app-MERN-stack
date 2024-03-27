import Appbar from '../../components/Appbar';

import { useState } from 'react';
import { useAuth } from '../../lib/AuthProvider';

function Account() {
  const { user } = useAuth();

  const usernameFromHook = user.user.username;

  const [username, setUsername] = useState(usernameFromHook);
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');

  const [message, setMessage] = useState('');

  const handleSaveAccount = async (e) => {
    e.preventDefault();

    if (password !== passwordConfirmation) {
      return setMessage('Passwords do not match');
    }
  };

  return (
    <div>
      <Appbar />

      <main>
        <h1>Your Account</h1>

        <form onSubmit={handleSaveAccount}>
          <div>
            <label htmlFor="username">Username</label>

            <div className="input-wrapper">
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
          </div>

          <div>
            <label htmlFor="password">New Password</label>

            <div className="input-wrapper">
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <div>
            <label htmlFor="password-confirmation">Confirm new password</label>

            <div className="input-wrapper">
              <input
                type="password"
                id="password-confirmation"
                value={passwordConfirmation}
                onChange={(e) => setPasswordConfirmation(e.target.value)}
              />
            </div>
          </div>

          <button type="submit">Save Account</button>
        </form>

        <button type="button">Delete Account</button>

        <p>{message}</p>
      </main>
    </div>
  );
}

export default Account;
