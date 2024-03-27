import axios from 'axios';

import { useState } from 'react';

import Appbar from '../../components/Appbar';

import { useEffect } from 'react';

function Dashboard() {
  const [shoppingLists, setShoppingLists] = useState([]);

  // GET Request zu 'http://localhost:3000/shopping-list'
  const fetchShoppingLists = async () => {
    try {
      const response = await axios.get('http://localhost:3000/shopping-list', {
        withCredentials: true, // Unser token Cookie wird mitgeschickt
      });

      const data = response.data;

      console.log(data);

      setShoppingLists(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchShoppingLists();
  }, []);

  return (
    <div>
      <Appbar />

      <h1>Dashboard</h1>

      {shoppingLists.map((list) => (
        <div>
          <h2>{list.name}</h2>
          <p>{list.items[0]}</p>
        </div>
      ))}
    </div>
  );
}

export default Dashboard;
