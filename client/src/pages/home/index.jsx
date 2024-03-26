import { Link } from 'react-router-dom';
import Navbar from '../../components/Navbar';

function Home() {
  return (
    <div>
      <Navbar />

      <main>
        <h1>Welcome to our Shopping List Manager!</h1>

        <p>
          Welcome to our shopping list app! Here, you can easily create and edit
          your shopping lists to streamline your grocery shopping experience.
        </p>

        <div>
          <Link to="/register">Get started</Link>
        </div>
      </main>
    </div>
  );
}

export default Home;
