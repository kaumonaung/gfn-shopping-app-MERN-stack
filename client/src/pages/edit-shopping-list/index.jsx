import axios from 'axios';

import Appbar from '../../components/Appbar';

import { useState, useEffect } from 'react';
import { resolvePath, useNavigate, useParams } from 'react-router-dom';

function EditShoppingList() {
  const [shoppingListName, setShoppingListName] = useState('');
  const [items, setItems] = useState([]);
  const [itemName, setItemName] = useState('');

  const [loading, setLoading] = useState(true);

  const { shoppingListId } = useParams();
  const navigate = useNavigate();

  const addItem = (e) => {
    e.preventDefault();

    if (itemName.trim() !== '') {
      setItems([...items, itemName.trim()]);
      return setItemName('');
    }
  };

  // Item im Array "items" aktualisieren
  const editItem = (index, newItemName) => {
    const itemsCopy = [...items]; // Kopie von items Array
    itemsCopy[index] = newItemName; // Text von dem Item in dem "items" Array zu neuem Wert setzen
    return setItems(itemsCopy); // setItems aufrufen um das Original mit der aktualisierten Kopie zu ersetzen
  };

  // Item aus dem Array "items" löschen mit splice
  const deleteItem = (index) => {
    const itemsCopy = [...items]; // Kopie von items Array
    itemsCopy.splice(index, 1); // "items" Array mit dem übergebenen index löschen
    setItems(itemsCopy); // setItems aufrufen um das Original mit der aktualisierten Kopie zu ersetzen
  };

  //  Shopping Liste laden
  const fetchShoppingList = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/shopping-list/${shoppingListId}`,
        {
          withCredentials: true,
        }
      );

      const data = response.data;
      setShoppingListName(data.name);
      setItems(data.items);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  // Ruft die Funktion "fetchShoppingList" 1x auf, wenn die Seite geladen wird
  useEffect(() => {
    fetchShoppingList();
  }, []);

  // Shopping List speichern
  const saveShoppingList = async (e) => {
    e.preventDefault();
    console.log('Liste wird gespeichert');

    const shoppingListData = {
      name: shoppingListName,
      items: items,
      id: shoppingListId,
    };

    try {
      const response = await axios.put(
        `http://localhost:3000/shopping-list/${shoppingListId}`,
        shoppingListData,
        {
          withCredentials: true,
        }
      );

      const data = response.data;
      console.log(data);

      navigate('/dashboard');
    } catch (error) {
      console.error(error);
    }
  };

  // Shopping List löschen
  const deleteShoppingList = async (e) => {
    e.preventDefault();

    try {
      await axios.delete(
        `http://localhost:3000/shopping-list/${shoppingListId}`,
        {
          withCredentials: true,
        }
      );

      navigate('/dashboard');
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) {
    return (
      <div>
        <h1>Wird geladen...</h1>
      </div>
    );
  }

  return (
    <div>
      <Appbar />

      <h1>Edit Shopping List</h1>

      <form onSubmit={saveShoppingList}>
        <div>
          <label htmlFor="shoppingListName">Shopping List Name</label>
          <div>
            <input
              type="text"
              id="shoppingListName"
              value={shoppingListName}
              onChange={(e) => setShoppingListName(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                }
              }}
            />
          </div>
        </div>

        <div>
          <h2>Add items</h2>

          <ul>
            {items.map((item, index) => (
              <li key={index}>
                <input
                  type="text"
                  value={item}
                  onChange={(e) => editItem(index, e.target.value)}
                />
                <button type="button" onClick={() => deleteItem(index)}>
                  Delete
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <div>
            <div>
              <label htmlFor="itemName">Item Name</label>
              <div>
                <input
                  type="text"
                  id="itemName"
                  value={itemName}
                  onChange={(e) => setItemName(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      addItem(e);
                    }
                  }}
                />
              </div>
            </div>
          </div>

          <button type="button" onClick={addItem}>
            Add Item
          </button>
        </div>

        <div>
          <button type="button" onClick={deleteShoppingList}>
            Delete List
          </button>
          <button type="submit">Save List</button>
        </div>
      </form>
    </div>
  );
}

export default EditShoppingList;