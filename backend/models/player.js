const mongoose = require('mongoose');

const PlayersSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  }
});

module.exports = Players = mongoose.model('players', PlayersSchema);