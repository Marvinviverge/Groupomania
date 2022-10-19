import React, { useEffect, useState, } from 'react';

import './home.css'
import moment from 'moment';
import 'moment/locale/fr';

import { accountService } from "@/_services/account.service"
import { postService } from '@/_services/post.service';

import { FaTrashAlt, FaHeart, FaRegHeart } from 'react-icons/fa'
import { MdLocalPolice } from "react-icons/md";
import ModifyPost from '@/components/ModifyPost';

// fonction home
const Home = () => {
    moment.locale('fr')

    const [users, setUsers] = useState([]);
    const [profil, setProfil] = useState([]);
    const [allpost, setAllpost] = useState([]);
    const [load, setLoad] = useState(false)

    const functionGetAllUsers = async () => {
        const getAllUsers = await accountService.getAllUsers();
        setUsers(getAllUsers.data);
    }

    const functionGetProfil = async () => {
        const getProfil = await accountService.tokenDecode(accountService.getToken());
        setProfil(getProfil);
    }

    const functionAllPosts = async () => {
        let GetallPosts = await postService.getAllPosts();
        setAllpost(GetallPosts.data);
    }

    const deletePost = (data) => {
        postService.deletePost(data)
            .then(() => {
                setLoad(l => !l)
            })
            .catch((error) => {
                console.log(error);
            })
    };

    const likedPost = (postId, likes) => {
        postService.likedPost(postId, likes)
            .then(() => {
                setLoad(l => !l)
            })
            .catch((error) => {
                console.log(error);
            })
    };

    useEffect(() => {
        functionGetProfil();
        functionAllPosts();
        functionGetAllUsers();

        return
    }, [load])

    // affichage de tout les user
    const allusers = users.map((user) => {
        return (
            <li className="user" key={user._id}>
                <div style={{ display: 'flex', alignItems: 'center', width: "100%" }}>
                    <img src={user.imageUrl} alt="profil avatar" />
                    {user.role === 1 ? <MdLocalPolice className="badge" /> : null}
                    <span className="nom">
                        {user.nom} {user.prenom}
                    </span>
                </div>

            </li>
        );

    });

    const ProfilUser = () => {
        return (
            <div className="card card-contentleft" >
                <div className="card-content ">
                    <div className="content BoxInfo">
                        <h2 className="name is-size-5" key={profil.nom}>{profil.nom} {profil.prenom}</h2>
                        <div className="centerImageprofil">
                            <figure className="image is-128x128">
                                <img className="is-rounded" key={profil.imageUrl} alt="profil avatar" src={profil.imageUrl} />
                            </figure>
                            <br />
                        </div>

                        <div className="renseignement">
                            <h3 className="bio is-size-5">Biographie</h3>
                            <span className="is-divider"></span>
                            <p key={profil.presentation}>{profil.presentation} </p>
                            <br />

                            <h3 className="email is-size-5">email</h3>
                            <span className="is-divider"></span>
                            <p className=" is-size-6" key={profil.email}>{profil.email}</p>
                            <br />

                            <h3 className="inscription is-size-5">Inscription</h3>
                            <span className="is-divider"></span>
                            <p className=" is-size-6" key={profil.createdAt}>{moment(profil.createdAt).fromNow()}</p>
                            <br />

                        </div>
                    </div>
                </div>
            </div >
        );
    }

    const allposts = allpost.map((post, index) => {
        return (
            <li className="post" id={post.post._id} key={post.post._id}>

                <div className="card">

                    <div className="card-content">
                        <div className="media">
                            <div className="media-left">
                                <figure className="image is-48x48">
                                    <img src={post.user.imageUrl} alt="ImageUser" />
                                </figure>
                            </div>
                            <div className="media-content">
                                <div className="title is-4">{post.user.nom} {post.user.prenom}
                                    {post.post.userId === profil.userId || profil.role === 1 ? (
                                        <span className="IconAction">
                                            <ModifyPost setLoad={setLoad} post={post.post} />
                                            <span className="iconDelete"><FaTrashAlt
                                                onClick={() => {
                                                    if (window.confirm("Voulez-vous supprimer ce post?")) {
                                                        deletePost(post.post._id);
                                                    }
                                                }} /></span>
                                        </span>
                                    ) : ('')}
                                </div>
                            </div>
                        </div>
                        <div className="card-image">
                            {post.post.imageUrl !== undefined ? (
                                <img src={"http://localhost:3000/images/postImg/" + post.post.imageUrl} crossOrigin="anonymous" alt="ImagePoste" />
                            ) : ("")}
                        </div>
                        <span className="is-divider2"></span>
                        <div className="content">
                            <br />
                            {post.post.text}
                            <br />
                            <br />
                            <span className="is-divider2"></span>
                            <span className="likeOrNot">Posté {moment(post.post.createdAt).fromNow()}
                                <span className="iconModify" onClick={() => {
                                    let likes = 1
                                    if (post.post.usersLiked.includes(profil.userId) === true) {
                                        likes = -1
                                    }
                                    likedPost(post.post._id, likes)
                                }}>
                                    {
                                        (post.post.usersLiked.includes(profil.userId) === true) ? <FaHeart className='heartstyle' /> : <FaRegHeart className='heartstyle' />
                                    }
                                    {post.post.likes}
                                </span>
                            </span>
                        </div>
                    </div>
                </div>
            </li >
        );
    });

    return (
        <>
            <div className="columns">
                <section className="column mrgin">{ProfilUser()}</section>
                <section className="column is-half mrgin">
                    <ul className="eachPost">
                        {allposts}
                    </ul>
                </section>
                <section className="column mrgin">
                    <div className="card ">
                        <div className="card-content">
                            <div className="content" style={{ padding: 5 }}>
                                <aside className="asideHome">
                                    <div className="divContainer">
                                        <h2 className="h2user">Utilisateurs</h2>
                                        <span className="is-divider"></span>
                                        <br />
                                        <ul className="eachUser">{allusers}</ul>
                                    </div>
                                </aside>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </>
    );

};
export default Home;