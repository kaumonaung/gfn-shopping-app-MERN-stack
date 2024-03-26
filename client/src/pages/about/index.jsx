import { Link } from 'react-router-dom';
import Navbar from '../../components/Navbar';

function About() {
  return (
    <div>
      <Navbar />

      <main>
        <h1>About us!</h1>

        <p>
          Welcome to our about us page! Here, you can learn more about our team,
          our mission, and how we aim to enhance your shopping experience
          through our innovative app.
        </p>

        <div>
          <Link to="/register">Get started</Link>
        </div>
      </main>
    </div>
  );
}

export default About;
