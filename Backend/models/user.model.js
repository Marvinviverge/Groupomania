/* Import des modules necessaires */
const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

/* Schema User */
const ModelUser = mongoose.Schema({
    nom: { type: String, required: true },
    prenom: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    presentation: { type: String, required: true, default: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s" },
    imageUrl: { type: String, required: true, default: "https://cdn.iconscout.com/icon/free/png-256/avatar-370-456322.png" },
    role: { type: Number, required: true, default: 0 },
},
    { timestamps: true });

/* Verification email unique */
ModelUser.plugin(uniqueValidator);

module.exports = mongoose.model("User", ModelUser);
