import axios from 'axios';

import { useState } from 'react';

import Appbar from '../../components/Appbar';
import ShoppingListCard from '../../components/ShoppingListCard';

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
        <ShoppingListCard key={list._id} {...list} />
      ))}
    </div>
  );
}

export default Dashboard;
