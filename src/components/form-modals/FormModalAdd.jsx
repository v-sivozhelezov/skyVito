/* eslint-disable jsx-a11y/label-has-associated-control */
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import s from '../../modals/add-new-adv/AddNewAdv.module.css';
import {
    useAddAdvTextMutation,
    useUploadImageAdvMutation,
} from '../../services/getAccessTokenService';

function FormModalAdd() {
    const navigate = useNavigate();

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [error, setError] = useState('');

    const [addAdvText] = useAddAdvTextMutation();
    const [uploadImageAdv] = useUploadImageAdvMutation();
    const [image, setImage] = useState([]);
    const [imagePreLoad, setImagePreLoad] = useState([]);
    console.log(image);
    console.log(imagePreLoad);

    const submitAdv = () => {
        if (!title) {
            setError('Введите название');
            return;
        }
        if (!price) {
            setError('Введите цену');
            return;
        }
        if (price < 0) {
            setError('Цена должна быть больше 0');
            return;
        }

        addAdvText({ title, description, price }).then((res) => {
            if (!image) {
                return;
            }
            // eslint-disable-next-line no-plusplus
            for (let i = 0; i < imagePreLoad.length; i++) {
                const formData = new FormData();
                formData.append('file', image[i]);
                uploadImageAdv({ id: res?.data?.id, formData });
            }
        });
        navigate('/');
    };

    const changePreLoadImage = (selectedImage) => {
        const reader = new FileReader();
        reader.readAsDataURL(selectedImage);
        reader.onloadend = () => {
            setImagePreLoad(() => [...imagePreLoad, reader.result]);
        };
    };

    const uploadAdvFoto = (event) => {
        event.preventDefault();
        const selectedFile = event.target.files[0];
        setImage(() => [...image, selectedFile]);
        changePreLoadImage(selectedFile);
    };

    return (
        <form className={`${s.modalFormNewArt} ${s.formNewArt}`} action="">
            <div className={s.formNewArtBlock}>
                <label htmlFor="">Название</label>
                <input
                    className={s.formNewArtInput}
                    type="text"
                    name="name"
                    value={title}
                    id="formName"
                    placeholder="Введите название"
                    onChange={(event) => {
                        setTitle(event.target.value);
                        setError('');
                    }}
                />
            </div>
            <div className={s.formNewArtBlock}>
                <label htmlFor="">Описание</label>
                <textarea
                    className={s.formNewArtArea}
                    name="text"
                    value={description}
                    id="formArea"
                    cols="auto"
                    rows="10"
                    placeholder="Введите описание"
                    onChange={(event) => setDescription(event.target.value)}
                />
            </div>
            <div className={s.formNewArtBlock}>
                <p className={s.formNewArtP}>
                    Фотографии товара
                    <span>не более 5 фотографий</span>
                </p>
                <div className={s.formNewArtBarImg}>
                    <div className={s.formNewArtImg}>
                        <input
                            id="changeImg"
                            className={s.settingsChangePhoto}
                            type="file"
                            accept=".jpg, .jpeg, .png"
                            onChange={uploadAdvFoto}
                        />
                        <label htmlFor="changeImg">
                            {imagePreLoad[0] && (
                                <img
                                    src={imagePreLoad[0]}
                                    alt="img"
                                    className={s.formNewArtImgCover}
                                />
                            )}
                            <div className={s.formNewArtImgCover} />
                        </label>
                    </div>
                    <div className={s.formNewArtImg}>
                        <input
                            id="changeImg"
                            className={s.settingsChangePhoto}
                            type="file"
                            accept=".jpg, .jpeg, .png"
                            onChange={uploadAdvFoto}
                        />
                        <label htmlFor="changeImg">
                            {imagePreLoad[1] && (
                                <img
                                    src={imagePreLoad[1]}
                                    alt="img"
                                    className={s.formNewArtImgCover}
                                />
                            )}
                            <div className={s.formNewArtImgCover} />
                        </label>
                    </div>
                    <div className={s.formNewArtImg}>
                        <input
                            id="changeImg"
                            className={s.settingsChangePhoto}
                            type="file"
                            accept=".jpg, .jpeg, .png"
                            onChange={uploadAdvFoto}
                        />
                        <label htmlFor="changeImg">
                            {imagePreLoad[2] && (
                                <img
                                    src={imagePreLoad[2]}
                                    alt="img"
                                    className={s.formNewArtImgCover}
                                />
                            )}
                            <div className={s.formNewArtImgCover} />
                        </label>
                    </div>
                    <div className={s.formNewArtImg}>
                        <input
                            id="changeImg"
                            className={s.settingsChangePhoto}
                            type="file"
                            accept=".jpg, .jpeg, .png"
                            onChange={uploadAdvFoto}
                        />
                        <label htmlFor="changeImg">
                            {imagePreLoad[3] && (
                                <img
                                    src={imagePreLoad[3]}
                                    alt="img"
                                    className={s.formNewArtImgCover}
                                />
                            )}
                            <div className={s.formNewArtImgCover} />
                        </label>
                    </div>
                    <div className={s.formNewArtImg}>
                        <input
                            id="changeImg"
                            className={s.settingsChangePhoto}
                            type="file"
                            accept=".jpg, .jpeg, .png"
                            onChange={uploadAdvFoto}
                        />
                        <label htmlFor="changeImg">
                            {imagePreLoad[4] && (
                                <img
                                    src={imagePreLoad[4]}
                                    alt="img"
                                    className={s.formNewArtImgCover}
                                />
                            )}
                            <div className={s.formNewArtImgCover} />
                        </label>
                    </div>
                </div>
            </div>
            <div className={`${s.formNewArtBlock} ${s.blockPrice}`}>
                <label htmlFor="">Цена</label>
                <input
                    className={s.formNewArtInputPrice}
                    type="number"
                    defaultValue={price}
                    onChange={(event) => {
                        setPrice(Number(event.target.value));
                        setError('');
                    }}
                />
                <div className={s.formNewArtInputPriceCover} />
            </div>
            {error ? <span className={s.error}>{error}</span> : ''}
            <button
                type="button"
                className={`${s.formNewArtBtnPub} ${s.btnHov02}`}
                onClick={submitAdv}
            >
                Опубликовать
            </button>
        </form>
    );
}

export default FormModalAdd;
