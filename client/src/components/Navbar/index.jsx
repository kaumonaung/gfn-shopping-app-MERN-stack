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
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
