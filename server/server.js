const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
const { authenticate } = require("./auth");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));  // ให้บริการไฟล์ frontend

app.post("/login", (req, res) => {
    const { username, password } = req.body;
    const token = authenticate(username, password);
    if (token) {
        res.json({ success: true, token });
    } else {
        res.status(401).json({ success: false });
    }
});

// ป้องกันการเข้าถึงไฟล์ JSON โดยตรง
app.use((req, res, next) => {
    if (req.url.includes("users.json")) {
        res.status(403).send("Forbidden");
    } else {
        next();
    }
});

app.listen(3000, () => console.log("Server running on port 3000"));
