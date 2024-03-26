import { useState } from 'react';

import Appbar from '../../components/Appbar';

function Dashboard() {
  const [shoppingLists, setShoppingLists] = useState([]);

  return (
    <div>
      <Appbar />

      <h1>Dashboard</h1>

      {shoppingLists &&
        shoppingLists.map((list) => (
          <div>
            <h2>{list.title}</h2>
          </div>
        ))}
    </div>
  );
}

export default Dashboard;
