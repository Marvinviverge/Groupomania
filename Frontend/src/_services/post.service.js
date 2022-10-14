/** Import des modules nécessaires */
import Axios from './caller.service'

// appel service de l'api

// fonction recuperation tout les post
let getAllPosts = () => {
    return Axios.get('/api/post/')
}

// fonction recuperation d'un post
let getPost = (post) => {
    return Axios.get('/api/post/', post)
}

// fonction creation d'un post
let createPost = (formData) => {
    return Axios.post('/api/post', formData)
}

// fonction suppression d'un post
let deletePost = (data) => {
    return Axios.delete('/api/post/' + data)
}

// fonction like d'un post
let likedPost = (post) => {
    return Axios.post('/api/post/like', post)
}

// fonction modifier un post
let modifyPost = (formData) => {
    return Axios.put('/api/post/', formData)
}

// export des fonction pour les utiliser dans les pages
export const postService = {
    getAllPosts,
    getPost,
    createPost,
    likedPost,
    deletePost,
    modifyPost
}

