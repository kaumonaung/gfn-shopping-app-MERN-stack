/*
CRUD Operationen (Create, Read, Update, Delete)
*/

const express = require('express');
const router = express.Router();

const { verifyToken } = require('../middlewares/verifyToken.middleware');

const {
  getShoppingLists,
  getShoppingListsById,
  createShoppingList,
  updateShoppingList,
  deleteShoppingList,
} = require('../controllers/shoppingList.controller');

router.get('/', verifyToken, getShoppingLists);
router.get('/:id', verifyToken, getShoppingListsById);

router.post('/create', verifyToken, createShoppingList);

router.put('/:id', verifyToken, updateShoppingList);

router.delete('/:id', verifyToken, deleteShoppingList);

module.exports = router;
