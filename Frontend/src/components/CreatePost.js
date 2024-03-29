import React, { useState } from 'react';
import { postService } from "@/_services/post.service";
import { accountService } from "@/_services/account.service";

import reactImageSize from 'react-image-size';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUpload } from '@fortawesome/free-solid-svg-icons'

const CreatePost = () => {

    const [open, setOpen] = useState(false);
    const [text, setText] = useState('');

    const [msg, setMsg] = useState('');
    const [file, setFile] = useState();
    const [ImagePreview, setImagePreview] = useState();
    const [ImagePreviewName, setImagePreviewName] = useState("");

    const close = () => {
        setOpen(false)
        setText('')
        setFile('')
        setImagePreview('')
        setImagePreviewName('')
    }

    const validatePost = () => {
        if (text) {
            const profil = accountService.tokenDecode(accountService.getToken())

            const formData = new FormData();
            formData.append('file', file);
            formData.append('text', text);
            formData.append('userId', profil.userId);

            postService.createPost(formData)
                .then(response => {
                    alert(response.data.msg)
                    close()
                    window.location.reload()
                })
        } else {
            alert('Veuillez entrer un message')
        }
    }

    const onImageChange = async (event) => {

        setImagePreviewName(event.target.files[0].name)
        if (event.target.files && event.target.files[0]) {
            setImagePreview(URL.createObjectURL(event.target.files[0]));
        }
        try {
            const { width, height } = await reactImageSize(URL.createObjectURL(event.target.files[0]));
            if (width <= 10000 && height <= 10000) {
                setMsg();
                setFile(event.target.files[0]);
            } else {
                setMsg("Veuillez sélectionner une image dont les dimensions n'excédent pas 250x250");
            }
        } catch (error) {
            if (error.response) {
                setMsg(error.response.data.msg);
            }
        }
    };

    return (
        <>
            <button className="js-modal-trigger button is-danger" data-target="modal-js-example" onClick={() => setOpen(true)}>
                Créer un post
            </button>
            <div className={open ? 'modal is-active' : 'modal'} >
                <div className="modal-background" onClick={() => close()}></div>
                <div className="modal-card">
                    <section className="modal-card-head">
                        <p className="modal-card-title">Créer une publication</p>
                        <button className="delete" aria-label="close" onClick={() => close()}></button>
                    </section>
                    <section className="modal-card-body">
                        <div><textarea rows="4" cols="50" onChange={(e) => setText(e.target.value)} value={text} /></div>
                        <div className="field">
                            <label htmlFor='image' className="label">Image du Post:</label>
                            <div className="file is-danger fileBtnAddPost">
                                <label className="file-label">
                                    <input className="file-input" type="file" name="resume" onChange={onImageChange} />
                                    <span className="file-cta">
                                        <span className="file-icon">
                                            <FontAwesomeIcon icon={faUpload} />
                                        </span>
                                        <span className="file-label">
                                            Choisir un fichier…
                                        </span>
                                        <span className="file-labelName">
                                            {ImagePreviewName}
                                        </span>
                                    </span>
                                </label>
                            </div>
                            <figure className="image is-square">
                                <img className="image-sze" key={ImagePreview} src={ImagePreview} alt="aperçu" />
                            </figure>
                        </div>
                        <div>{msg}</div>
                    </section>
                    <section className="modal-card-foot">
                        <button className="button is-success" onClick={() => validatePost()}>Valider</button>
                        <button className="button" onClick={() => close()}>Retour</button>
                    </section>
                </div>
            </div>
        </>
    );
};

export default CreatePost;