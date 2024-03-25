const bcrypt = require('bcrypt');
const User = require('../models/User.schema');

const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    // Überprüfen ob der User schon existiert mit dem "username"
    const user = await User.findOne({ username: username });

    if (!user) {
      return res.status(404).send('User nicht gefunden');
    }

    // Wir vergleichen das Passwort über unser Schema

    // Wir erstellen einen JWT Token

    // Senden den Token zurück als Cookie und die Userdaten
  } catch (error) {
    console.log(error);
    res.status(500).send('Etwas ist schief gelaufen');
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

    res.json(user);
  } catch (error) {
    res.status(500).send(error);
  }
};

const logout = async () => {};

module.exports = { login, register, logout };
