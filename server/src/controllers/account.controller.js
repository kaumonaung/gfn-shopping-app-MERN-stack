const User = require('../models/User.schema');

// PUT Request
const updateAccount = async (req, res) => {
  const { userId, updatePassword, newUsername, newPassword } = req.body;

  try {
    // User in der Datenbank suchen
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        message: 'User/Account wurde nicht gefunden',
      });
    }

    // Überprüfen ob das Passwort aktualisiert werden soll
    if (updatePassword) {
    } else {
      user.username = newUsername;
      await user.save();
    }
  } catch (error) {
    return res.status(500).json({
      message: 'Account konnte nicht aktualisiert werden',
    });
  }
};

// DELETE Request
const deleteAccount = async (req, res) => {};

module.exports = {
  updateAccount,
  deleteAccount,
};
