/* eslint-disable jsx-a11y/label-has-associated-control */
import { useState } from 'react';
import s from '../../modals/add-new-adv/AddNewAdv.module.css';
import {
    useDeleteImageAdvMutation,
    useEditAdvMutation,
    useUploadImageAdvMutation,
} from '../../services/getAccessTokenService';

function FormModal(props) {
    const adv = props.getChoseAdv;
    console.log(adv);

    const [title, setTitle] = useState(adv?.title);
    const [description, setDescription] = useState(adv?.description);
    const [price, setPrice] = useState(adv?.price);
    const [error, setError] = useState('');
    const [editAdv] = useEditAdvMutation();
    const [uploadImageAdv] = useUploadImageAdvMutation();
    const image = adv?.images;
    const [newImage, setNewImage] = useState([]);
    const [imagePreLoad, setImagePreLoad] = useState([]);
    console.log(newImage);
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

        editAdv({ id: adv.id, data: { title, description, price } }).then(
            () => {
                if (!newImage) {
                    return;
                }
                // eslint-disable-next-line no-plusplus
                for (let i = 0; i < imagePreLoad.length; i++) {
                    const formData = new FormData();
                    formData.append('file', newImage[i]);
                    uploadImageAdv({ id: adv.id, formData });
                }
            },
        );
        props.handlePopUp(false);
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
        setNewImage(() => [...newImage, selectedFile]);
        changePreLoadImage(selectedFile);
    };

    const [deleteImg] = useDeleteImageAdvMutation();

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
                        <div
                            className={(s.modalBtnClose, s.modalBtnCloseDelete)}
                        >
                            <button
                                type="button"
                                onClick={() => {
                                    deleteImg({
                                        id: adv.id,
                                        url: image[0]?.url,
                                    });
                                }}
                            >
                                {' '}
                                <div className={s.modalBtnCloseLine} />
                            </button>
                        </div>
                        <input
                            id="changeImg"
                            className={s.settingsChangePhoto}
                            type="file"
                            accept=".jpg, .jpeg, .png"
                            onChange={uploadAdvFoto}
                        />
                        <label htmlFor="changeImg">
                            {image[0].url && (
                                <div className={s.modalBtnCloseLine}>
                                    <img
                                        src={`http://localhost:8090/${image[0]?.url}`}
                                        alt="img"
                                        className={s.formNewArtImgCover}
                                    />
                                </div>
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
                            {image[1]?.url && (
                                <img
                                    src={`http://localhost:8090/${image[1]?.url}`}
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
                            {image[2]?.url && (
                                <img
                                    src={`http://localhost:8090/${image[2]?.url}`}
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

export default FormModal;
