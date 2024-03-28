import axios from 'axios';

import Appbar from '../../components/Appbar';

import { useState } from 'react';
import { useAuth } from '../../lib/AuthProvider';
import { useNavigate } from 'react-router-dom';

function Account() {
  const { user, setUser } = useAuth();
  const navigate = useNavigate();

  const usernameFromHook = user.user.username;

  const [username, setUsername] = useState(usernameFromHook);
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');

  const [message, setMessage] = useState('');

  const handleSaveAccount = async (e) => {
    e.preventDefault();

    let hasUpdatedPassword = false;

    if (password !== passwordConfirmation) {
      return setMessage('Passwords do not match');
    }

    if (password === passwordConfirmation) {
      hasUpdatedPassword = true;
      setMessage('');
    }

    if (password === '' && passwordConfirmation === '') {
      hasUpdatedPassword = false;
    }

    try {
      const data = {
        hasUpdatedPassword: hasUpdatedPassword,
        newUsername: username,
        newPassword: password,
      };

      const response = await axios.put(
        'http://localhost:3000/account/update',
        data,
        {
          withCredentials: true,
        }
      );

      const updatedAccount = response.data;

      setUser({
        user: {
          id: user.id,
          username: updatedAccount.username,
        },
      });
      navigate('/dashboard');
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteAccount = async () => {
    try {
      const response = await axios.delete(
        'http://localhost:3000/account/delete',
        {
          withCredentials: true,
        }
      );

      const data = response.data;
      console.log(data);

      if (!data) {
        return setMessage('Etwas ist schief gelaufen');
      }

      if (data.error) {
        return setMessage(data.message);
      }

      setMessage(data.message);

      setTimeout(() => {
        setUser(null);
      }, 5000);
    } catch (error) {
      console.error(error);
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

        <button type="button" onClick={handleDeleteAccount}>
          Delete Account
        </button>

        {message && <p>{message}</p>}
      </main>
    </div>
  );
}

export default Account;
