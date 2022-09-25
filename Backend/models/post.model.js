/* Import des modules necessaires */
const mongoose = require("mongoose");

/* Schema Sauce */
const ModelPost = mongoose.Schema({

    userId: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    imageUrl: { type: String },
    likes: { type: Number, defaut: 0 },
    usersLiked: { type: [String] },

});

module.exports = mongoose.model("Post", ModelPost);