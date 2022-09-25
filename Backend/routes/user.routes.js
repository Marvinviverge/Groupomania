const express = require("express");
const router = express.Router();

const userCtrl = require("../controllers/user.controller");

/* Routage User */
router.post("/signup", userCtrl.signup);
router.post("/login", userCtrl.login);
router.get("/", userCtrl.getAllUser);

module.exports = router;