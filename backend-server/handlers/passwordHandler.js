const Password = require('../models/passwordModel');

module.exports = {
    addPassword: ((req, res) => {
        newPassword = req.body;
        if (Password.create(newPassword, (err, password) => {
            if (err) {
                console.log('MONGO: Error adding password', err);
                res.json({ success: false, error: err });
            } else {
                res.json({ success: true });
            }
        }) == null) {
            res.json({ success: false, error: 'Failed to connect to MongoDB' });
        };
    })
}