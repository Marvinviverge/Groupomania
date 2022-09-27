/* Import des modules necessaires */
const mongoose = require("mongoose");

/* Schema Sauce */
const ModelPost = mongoose.Schema({

    userId: { type: String, required: true },
    text: { type: String, required: true },
    imageUrl: { type: String, allowNull: true },
    likes: { type: Number, defaut: 0 },
    usersLiked: { type: [String] },
},
    { timestamps: true });

module.exports = mongoose.model("Post", ModelPost);