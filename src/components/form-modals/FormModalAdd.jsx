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
    const [addAdvText] = useAddAdvTextMutation();
    const [uploadImageAdv] = useUploadImageAdvMutation();
    const [image, setImage] = useState('');
    const [imagePreLoad, setImagePreLoad] = useState('');
    console.log(image);
    console.log(imagePreLoad);

    const submitAdv = () => {
        addAdvText({ title, description, price }).then((res) => {
            const formData = new FormData();
            if (!image) {
                return;
            }
            formData.append('file', image);
            uploadImageAdv({ id: res?.data?.id, formData });
        });
        navigate('/');
    };

    const changePreLoadImage = (selectedImage) => {
        const reader = new FileReader();
        reader.readAsDataURL(selectedImage);
        reader.onloadend = () => {
            setImagePreLoad(reader.result);
        };
    };

    const uploadAdvFoto = (event) => {
        event.preventDefault();
        const selectedFile = event.target.files[0];
        setImage(selectedFile);
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
                    onChange={(event) => setTitle(event.target.value)}
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
                            {imagePreLoad && (
                                <img
                                    src={imagePreLoad}
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
                            <div className={s.formNewArtImgCover} />
                        </label>
                    </div>
                    <div className={s.formNewArtImg}>
                        <img className={s.formNewArtImgCover} src="" alt="" />
                        <div className={s.formNewArtImgCover} />
                    </div>
                </div>
            </div>
            <div className={`${s.formNewArtBlock} ${s.blockPrice}`}>
                <label htmlFor="">Цена</label>
                <input
                    className={s.formNewArtInputPrice}
                    type="number"
                    defaultValue={price}
                    onChange={(event) => setPrice(Number(event.target.value))}
                />
                <div className={s.formNewArtInputPriceCover} />
            </div>
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