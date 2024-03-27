import Home from './home';
import About from './about';
import Login from './login';
import Register from './register';
import Dashboard from './dashboard';
import NewShoppingList from './new-shopping-list';

import { Outlet, Navigate } from 'react-router-dom';
import { useAuth } from '../lib/AuthProvider';

const ProtectedRoute = () => {
  const { user } = useAuth();

  // Überprüft ob user schon existiert
  if (!user) {
    // Zurück zur Login-Seite
    console.log('No user found');
    return <Navigate to="/login" replace={true} />;
  }

  return <Outlet />;
};

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

export const protectedRoutes = [
  {
    path: '/dashboard',
    element: <ProtectedRoute />,
    children: [
      {
        path: '',
        element: <Dashboard />,
      },
      {
        path: 'account',
        element: <h1>Account</h1>,
      },
      {
        path: 'new',
        element: <NewShoppingList />,
      },
      {
        path: 'edit/:id',
        element: <h1>Edit Shopping List</h1>,
      },
    ],
  },
];
