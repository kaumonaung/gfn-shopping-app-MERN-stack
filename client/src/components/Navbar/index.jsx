import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <header>
      <nav>
        <div>
          <Link to="/">Homepage</Link>
          <Link to="/about-us">About Us</Link>
        </div>

        <div>
          <Link to="/register">Register</Link>
          <Link to="/dashboard">Dashboard</Link>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
