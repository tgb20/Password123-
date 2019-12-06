
function getSecurePassword(text) {
    let link = "https://password123cs326.herokuapp.com/api/addPassword";
    let password = "";
    
    do {
        password = generateSecurePassword(text);
        hash = { hash: sha256(password) }
    } while ($.ajax({ type: "post", url: link, data: hash, dataType: "json" }).success);
    return password;
}

function generateSecurePassword(text) {
    let chance = new Chance();
    let random = chance.first();
    text = random + text;
    
    let chars = "1234567890!@#$%^&*~";
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
    return text;
}
