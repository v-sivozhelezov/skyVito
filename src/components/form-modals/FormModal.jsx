/* eslint-disable jsx-a11y/label-has-associated-control */
import s from '../../modals/add-new-adv/AddNewAdv.module.css';

function FormModal(props) {
    return (
        <form className={`${s.modalFormNewArt} ${s.formNewArt}`} action="">
            <div className={s.formNewArtBlock}>
                <label htmlFor="">Название</label>
                <input
                    className={s.formNewArtInput}
                    type="text"
                    name="name"
                    value={props.newArtInput}
                    id="formName"
                    placeholder="Введите название"
                />
            </div>
            <div className={s.formNewArtBlock}>
                <label htmlFor="">Описание</label>
                <textarea
                    className={s.formNewArtArea}
                    name="text"
                    value={props.newArtArea}
                    id="formArea"
                    cols="auto"
                    rows="10"
                    placeholder="Введите описание"
                />
            </div>
            <div className={s.formNewArtBlock}>
                <p className={s.formNewArtP}>
                    Фотографии товара
                    <span>не более 5 фотографий</span>
                </p>
                <div className={s.formNewArtBarImg}>
                    <div className={s.formNewArtImg}>
                        <img className={s.formNewArtImgCover} src="" alt="" />
                        <div className={s.formNewArtImgCover} />
                    </div>
                    <div className={s.formNewArtImg}>
                        <img className={s.formNewArtImgCover} src="" alt="" />
                        <div className={s.formNewArtImgCover} />
                    </div>
                    <div className={s.formNewArtImg}>
                        <img className={s.formNewArtImgCover} src="" alt="" />
                        <div className={s.formNewArtImgCover} />
                    </div>
                    <div className={s.formNewArtImg}>
                        <img className={s.formNewArtImgCover} src="" alt="" />
                        <div className={s.formNewArtImgCover} />
                    </div>
                    <div className={s.formNewArtImg}>
                        <img className={s.formNewArtImgCover} src="" alt="" />
                        <div className={s.formNewArtImgCover} />
                    </div>
                </div>
            </div>
            <div className={`${s.formNewArtBlock} ${s.blockPrice}`}>
                <label htmlFor="">Цена</label>
                <input className={s.formNewArtInputPrice} type="text" />
                <div className={s.formNewArtInputPriceCover} />
            </div>
            <button
                type="button"
                className={`${s.formNewArtBtnPub} ${s.btnHov02}`}
            >
                Опубликовать
            </button>
        </form>
    );
}

export default FormModal;
