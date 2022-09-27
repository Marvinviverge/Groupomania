const Post = require("../models/post.model");
const fs = require('fs');

// Création de fonctionnalité pour créer un post
exports.createPost = (req, res, next) => {
    const postObject = JSON.parse(req.body.post);
    delete postObject._id;
    delete postObject._userId;
    const post = new Post({
        ...postObject,
        userId: req.auth.userId,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
        likes: 0,
        usersLiked: [""],
    });
    post.save()
        .then(() => res.status(201).json({ message: 'Post enregistré!' }))
        .catch(error => res.status(400).json({ error }))

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
    const postObject = req.file ? {
        ...JSON.parse(req.body.post),
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : { ...req.body };

    delete postObject._userId;

    try {
        let post = await Post.findOne({ _id: req.params.id })

        // Si le post n'existe pas
        if (post === null) {
            return res.status(404).json({ message: "Ce post n'existe pas" })
        }

        // Si l'utilisateur n'est pas le créateur du post
        if (post.userId != req.auth.userId) {
            return res.status(401).json({ message: 'Non autorisé' });
        } else { // Si l'utilisateur est le créateur du post
            if (req.file) { // Modification de l'image dans la base de donnée si besoin
                const filename = post.imageUrl.split('/images/')[1];
                fs.unlink(`images/${filename}`, () => {
                    Post.updateOne({ _id: req.params.id }, { ...postObject, _id: req.params.id })
                        .then(() => { res.status(200).json({ message: 'Post modifié !' }) })
                        .catch(error => res.status(401).json({ error }));
                });
            } else { // Modification seulement des informations du post
                Post.updateOne({ _id: req.params.id }, { ...postObject, _id: req.params.id })
                    .then(() => { res.status(200).json({ message: 'Post modifié !' }) })
                    .catch(error => res.status(401).json({ error }));
            }
        }
    }

    catch (err) {
        res.status(400).json({ err });
    };
}

// Création de fonctionnalité pour supprimer un post
exports.deletePost = async (req, res, next) => {
    try {
        let post = await Post.findOne({ _id: req.params.id })

        if (post.userId != req.auth.userId) { // Si l'utilisateur n'est pas le créateur du post ou administrateur
            return res.status(401).json({ message: 'Non autorisé' });
        } else { // Si l'utilisateur est le créateur du post
            const filename = post.imageUrl.split('/images/')[1];
            fs.unlink(`images/${filename}`, () => { // Suppression de l'image du post dans la base de donnée
                Post.deleteOne({ _id: req.params.id })
                    .then(() => { res.status(200).json({ message: 'Objet supprimé !' }) })
                    .catch(error => res.status(401).json({ error }));
            });
        }
    }

    catch (err) {
        res.status(400).json({ err });
    };
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