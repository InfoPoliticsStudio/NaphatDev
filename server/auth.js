const fs = require("fs");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const users = JSON.parse(fs.readFileSync("server/users.json", "utf8"));
const secretKey = process.env.JWT_SECRET || "your_secret_key"; 

const authenticate = (username, password) => {
    const user = users.find(u => u.username === username);
    if (user && bcrypt.compareSync(password, user.password)) {
        return jwt.sign({ username: user.username }, secretKey, { expiresIn: "1h" });
    }
    return null;
};

module.exports = { authenticate };
