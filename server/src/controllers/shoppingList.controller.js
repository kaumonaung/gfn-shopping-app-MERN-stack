const ShoppingList = require('../models/ShoppingList.schema');

// GET (alle Shopping Listen für den User)
const getShoppingLists = async (req, res) => {
  const { id } = req.authenticatedUser;

  console.log(id);

  try {
    const lists = await ShoppingList.find({ userId: id });

    console.log(lists);

    res.status(200).json(lists);
  } catch (error) {
    res.status(500).json({
      message: 'Error: Shopping Listen konnten nicht gefunden werden',
    });
  }
};

// GET by ID (eine bestimmte Shopping Liste für den User)
const getShoppingListsById = async (req, res) => {
  const shoppingListId = req.params.id;

  try {
    const list = await ShoppingList.findById(shoppingListId);

    if (!list) {
      return res.status(404).json({
        message: 'Shopping Liste konnte nicht gefunden werden',
      });
    }

    res.status(200).json(list);
  } catch (error) {
    res.status(500).json({
      message: 'Etwas ist schief gelaufen bei der Abfrage einer Shopping-Liste',
    });
  }
};

// POST (neue Shopping Liste erstellen)
const createShoppingList = async (req, res) => {
  const { name, items } = req.body;
  const { username, id } = req.authenticatedUser;

  try {
    const newShoppingList = await ShoppingList.create({
      name,
      items,
      username,
      userId: id,
    });

    res.json(newShoppingList);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message:
        'Etwas ist schief gelaufen bei der Erstellung einer Shopping-Liste',
    });
  }
};

// PUT (eine Shopping Liste updaten)
const updateShoppingList = async (req, res) => {};

// DELETE (eine Shopping Liste löschen)
const deleteShoppingList = async (req, res) => {};

module.exports = {
  getShoppingLists,
  getShoppingListsById,
  createShoppingList,
  updateShoppingList,
  deleteShoppingList,
};
