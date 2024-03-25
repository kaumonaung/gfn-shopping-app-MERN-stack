import { Link } from 'react-router-dom';

function Login() {
  return (
    <main>
      <h1>Sign in to your account!</h1>

      <div className="card-wrapper">
        <div className="card">
          <form>
            <div>
              <label htmlFor="username">Username</label>

              <div className="input-wrapper">
                <input
                  id="username"
                  type="text"
                  name="username"
                  autoComplete="username"
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
                />
              </div>
            </div>
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
