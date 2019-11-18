const mongoose = require('mongoose');

let HashedPasswordSchema = new mongoose.Schema({
    hash: String
})

module.exports = mongoose.model('HashedPassword', HashedPasswordSchema);