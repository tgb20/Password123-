const mongoose = require('mongoose');

let PasswordSchema = new mongoose.Schema({
    hash: String
})

module.exports = mongoose.model('Password', PasswordSchema);