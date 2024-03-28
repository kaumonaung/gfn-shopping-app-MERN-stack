const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User.schema');

const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    // Überprüfen ob der User schon existiert mit dem "username"
    const user = await User.findOne({ username: username });

    if (!user) {
      return res.status(404).json({
        message: 'Der User konnte nicht gefunden werden',
        error: true,
      });
    }

    // Wir vergleichen das Passwort über unser Schema
    const hasCorrectPassword = await bcrypt.compare(password, user.password);

    if (!hasCorrectPassword) {
      return res.status(401).json({
        message: 'Falsche Login-Daten',
        error: true,
      });
    }

    // Wir erstellen einen JWT Token
    const userData = {
      id: user._id,
      username: user.username,
    };

    const accessToken = jwt.sign(userData, process.env.ACCESS_TOKEN_SECRET);

    // Sende den Token als Cookie zurück
    res.cookie('token', accessToken, {
      httpOnly: true,
    });

    res.status(200).json({
      user: userData,
      error: false,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'Etwas ist schief gelaufen',
      error: true,
    });
  }
};

const register = async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      username: username,
      password: hashedPassword,
    });

    res.json(user); // MongoDB ObjectId wird zurückgeschickt
  } catch (error) {
    res.status(500).send(error);
  }
};

const logout = (req, res) => {
  res.clearCookie('token').send('Logged out');
};

module.exports = { login, register, logout };
