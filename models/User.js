class User {
    constructor(email, hash, salt) {
        this.email = email;
        this.hash = hash;
        this.salt = salt;
    }
}

module.exports = User;