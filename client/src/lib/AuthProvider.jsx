import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // useState wird entweder den user Objekt von localStorage.getItem('user') sein ODER null, wenn es keinen user in localStorage gibt
  const [user, setUser] = useState(() => {
    const localStorageUser = localStorage.getItem('user');

    if (localStorageUser) {
      return JSON.parse(localStorageUser);
    } else {
      return null;
    }
  });

  // Jedes Mal wenn der Wert von "user" sich ändert, soll localStorage aktualisiert/geupdatet werden
  // z.B. setUser(null) wenn wir uns ausloggen, dann wird localStorage.removeItem('user') aufgerufen
  useEffect(() => {
    console.log('useEffect wird aufgerufen');

    if (user !== null || user !== undefined) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
  }, [user]);

  const contextValue = {
    user,
    setUser,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

// Eigenen Hook
export const useAuth = () => {
  return useContext(AuthContext);
};
