
async function getSecurePassword(text) {
    let link = "https://password123cs326.herokuapp.com/api/addPassword";
    let password = "";

    do {
        password = await generateSecurePassword(text);
        hash = { hash: sha256(password) }
    } while ($.ajax({ type: "post", url: link, data: hash, dataType: "json" }).success);
    return password;
}

async function generateSecurePassword(text) {

    return new Promise(resolve => {
        fetch('https://password123cs326.herokuapp.com/api/getRandomWords').then((resp) => resp.json()).then(data => {

            let random1 = data["words"].random();
            let random2 = data["words"].random();

            let v = Math.floor(Math.random() * 3);

            if (v == 0) {
                text = text + random1 + random2;
            } else if (v == 1) {
                text = random1 + text + random2;
            } else {
                text = random1 + random2 + text;
            }

            let chars = "23456789!@#$%^*";
            // Randomly capitalize characters of text.
            for (let i = 0; i < 2; i++) {
                let idx = Math.floor(Math.random() * text.length);
                text = text.substr(0, idx) + text[idx].toUpperCase() + text.substr(idx + 1, text.length);
            }
            // Randomly add padding characters on either side of text.
            for (let i = 0; i < 2; i++) {
                let char = chars[Math.floor(Math.random() * chars.length)];
                if (Math.floor(Math.random() * 2) == 0) text = text.concat(char);
                else text = char.concat(text);
            }
            resolve(text);
        });
    });
}

Array.prototype.random = function () {
    return this[Math.floor((Math.random() * this.length))];
}