var randomWords = require('random-words');

module.exports = {
    getRandomWords: ((req, res) => {
        res.json({words: randomWords({exactly: 5, maxLength: 5})});
    })
}