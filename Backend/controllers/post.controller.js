const Post = require("../models/post.model");
const fs = require('fs');

// Création de fonctionnalité pour créer un post
exports.createPost = (req, res, next) => {

}

// Création de fonctionnalité pour afficher tous les posts
exports.getAllPost = (req, res, next) => {
    Post.find()
        .then((posts) => res.status(200).json(posts))
        .catch((error) => res.status(400).json({ error: error }));
}

// Création de fonctionnalité pour accéder à un seul post
exports.getOnePost = (req, res, next) => {
    Post.findOne({ _id: req.params.id })
        .then((post) => res.status(200).json(post))
        .catch((error) => res.status(400).json({ error: error }));
}

// Création de fonctionnalité permettant de modifier un post existant
exports.modifyPost = async (req, res, next) => {

}

// Création de fonctionnalité pour supprimer un post
exports.deletePost = async (req, res, next) => {

}

// Création de fonctionnalité permettant de Like un post
exports.likePost = async (req, res, next) => {

    try {
        let post = await Post.findOne({ _id: req.params.id })

        // Si l'utilisateur aime il mets un like
        if (!post.usersLiked.includes(req.body.userId) && req.body.like === 1) {
            post.likes++;
            post.usersLiked.push(req.body.userId);
            post.save();
            res.status(200).json({ message: "J'aime" });
        }

        // Si l'utilisateur change d'avis il peut enlever son like
        if (req.body.like === 0 && post.usersLiked.includes(req.body.userId)) {
            post.likes--;
            post.usersLiked.splice(post.usersLiked.indexOf(req.body.userId), 1);
            post.save();
            res.status(200).json({ message: "Unliked" });
        }
    }

    catch (err) {
        res.status(400).json({ err });
    };
}