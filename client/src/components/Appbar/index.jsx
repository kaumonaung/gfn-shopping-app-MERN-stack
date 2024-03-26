import axios from 'axios';

import { Link } from 'react-router-dom';

import { useAuth } from '../../lib/AuthProvider';

function Appbar() {
  const { setUser } = useAuth();

  const handleLogout = async () => {
    console.log('Ausloggen');

    try {
      await axios.post('http://localhost:3000/auth/logout', null, {
        withCredentials: true, // Sonst wird der Cookie nicht entfernt vom Server
      });

      setUser(null);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <header>
      <nav>
        <div>
          <button onClick={handleLogout}>Logout</button>
        </div>

        <div>
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/dashboard/account">Account</Link>
          <Link to="/dashboard/new">Add List</Link>
        </div>
      </nav>
    </header>
  );
}

export default Appbar;
