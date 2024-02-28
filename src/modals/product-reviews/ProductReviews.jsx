/* eslint-disable jsx-a11y/label-has-associated-control */
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import HeadingH3 from '../../components/heading-h3/HeadingH3';
import Reviewer from '../../components/reviewer/Reviewer';
import s from './ProductReviews.module.css';
import { selectChosenAdv } from '../../redux/slices/adsSlice';
import { adsAPI } from '../../services/getAccessTokenService';
import changeDate from '../../app/changeDate';

function ProductReviews() {
    const choseAdvId = useSelector(selectChosenAdv);
    const { data: getReviewsForAdv } =
        adsAPI.useGetReviewsForAdvQuery(choseAdvId);
    return (
        <div className={s.wrapper}>
            <div className={s.containerBg}>
                <div className={s.modalBlock}>
                    <div className={s.modalContent}>
                        <HeadingH3>Отзывы о товаре</HeadingH3>
                        <div className={s.modalBtnClose}>
                            <Link to={`/adv-page/${choseAdvId}`}>
                                <div className={s.modalBtnCloseLine} />
                            </Link>
                        </div>
                        <div className={s.modalScroll}>
                            <form
                                className={`${s.modalFormNewArt} ${s.formNewArt}`}
                                action="#"
                            >
                                <div className={s.formNewArtBlock}>
                                    <label htmlFor="">Добавить отзыв</label>
                                    <textarea
                                        className={s.formNewArtArea}
                                        name="text"
                                        id="formArea"
                                        cols="auto"
                                        rows="5"
                                        placeholder="Введите описание"
                                    />
                                </div>
                                <button
                                    type="button"
                                    className={`${s.formNewArtBtnPub} ${s.btnHov02}`}
                                >
                                    Опубликовать
                                </button>
                            </form>
                            <div className={s.modalReviews}>
                                {getReviewsForAdv?.map((comment) => {
                                    return (
                                        <Reviewer
                                            reviewName={comment.author.name}
                                            reviewText={comment.text}
                                            reviewDate={changeDate(
                                                comment.created_on,
                                            )}
                                            reviewTitle="Комментарий"
                                        />
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductReviews;
