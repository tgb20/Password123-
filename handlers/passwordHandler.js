const HashedPassword = require('../models/passwordModel');

module.exports = {
    addPassword: ((req, res) => {

        let hash = req.body.hash;

        console.log(req.body);

        let passwordObj = JSON.parse('{"hash": "' + hash + '"}');

        HashedPassword.find({ hash: hash }, ((err, passwords) => {
            if (passwords.length > 0) {
                res.json({ success: false, hash: password.hash, error: "Password not unique" });
            } else {
                HashedPassword.create(passwordObj, (err, password) => {
                    if (err) {
                        console.log(password);
                        console.log('MONGO: Error adding password', err);
                        res.json({ success: false, error: err });
                    } else {
                        console.log(password);
                        res.json({ success: true, hash: password.hash });
                    }
                });
            }
        }));
    }),

    checkMatchingPassword: ((req, res) => {
        let hash = req.body.hash;

        if (hash == null) {
            res.json({ error: "No hash provided" });
        }

        HashedPassword.find({ hash: hash }, ((err, passwords) => {
            if (passwords.length > 0) {
                res.json({ unique: false });
            } else {
                res.json({ unique: true });
            }
        }));
    })
}