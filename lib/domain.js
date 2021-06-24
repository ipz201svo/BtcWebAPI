const fs = require('fs');
const path = require('path');

const pathToData = path.join(__dirname, '..', 'data.json');

function findUser(parameter, value) {
    return getAllUsers().find(u => u[parameter] === value);
}

function getAllUsers() {
    return JSON.parse(fs.readFileSync(pathToData));
}

function addUser(user) {
    const users = getAllUsers();
    users.push(user);
    fs.writeFileSync(pathToData, JSON.stringify(users));
}

module.exports.findUser = findUser;
module.exports.addUser = addUser;