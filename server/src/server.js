require('dotenv').config();

const cors = require('cors');

const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

const mongoose = require('mongoose');

// Hier wird JSON als Dateiformat akzeptiert
app.use(express.json());

// Hier erlauben wir CORS (Cross Origin Resource Sharing), d.h. andere Domains können auf unser Server zugreifen
app.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true,
  })
);

// Auth Router
const authRouter = require('./routes/auth.routes');
app.use('/auth', authRouter);

// Shopping List Router
const shoppingListRouter = require('./routes/shoppingList.routes');
app.use('/shopping-list', shoppingListRouter);

// Verbindung zu MongoDB
mongoose
  .connect(process.env.MONGODB_CONNECTION_STRING, {
    dbName: 'shopping-list-app',
  })
  .then(() => {
    console.log('Erfolgreich mit MongoDB verbunden');
  });

// Server wird gestartet
app.listen(PORT);
