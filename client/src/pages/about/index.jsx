import { Link } from 'react-router-dom';

function About() {
  return (
    <div>
      <h1>About us!</h1>

      <p>
        Welcome to our about us page! Here, you can learn more about our team,
        our mission, and how we aim to enhance your shopping experience through
        our innovative app.
      </p>

      <div>
        <Link to="/register">Get started</Link>
      </div>
    </div>
  );
}

export default About;
