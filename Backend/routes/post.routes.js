/* Import des modules necessaires */
const express = require("express");
const router = express.Router();

const Guardauth = require("../middleware/Guardauth.js");
const Guardmulter = require("../middleware/Guardmulter");

const PostCtrl = require("../controllers/post.controller");

/* Routage Sauce */
router.get("/", Guardauth, PostCtrl.getAllPost);
router.get("/:id", Guardauth, PostCtrl.getOnePost);
router.post("/", Guardauth, Guardmulter, PostCtrl.createPost);
router.put("/:id", Guardauth, Guardmulter, PostCtrl.modifyPost);
router.delete("/:id", Guardauth, PostCtrl.deletePost);
router.post("/:id/like", Guardauth, PostCtrl.likePost);

module.exports = router;