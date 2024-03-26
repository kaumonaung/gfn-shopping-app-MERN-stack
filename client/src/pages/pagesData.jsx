import Home from './home';
import About from './about';
import Login from './login';
import Register from './register';

export const publicRoutes = [
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/about-us',
    element: <About />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/register',
    element: <Register />,
  },
];

export const protectedRoutes = [];
