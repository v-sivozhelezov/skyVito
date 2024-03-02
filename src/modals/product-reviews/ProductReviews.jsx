/* eslint-disable jsx-a11y/label-has-associated-control */
import { useState } from 'react';

import HeadingH3 from '../../components/heading-h3/HeadingH3';
import Reviewer from '../../components/reviewer/Reviewer';
import s from './ProductReviews.module.css';
import changeDate from '../../app/changeDate';
import { useAddReviewForAdvMutation } from '../../services/getAccessTokenService';

function ProductReviews(props) {
    const { reviews, handlePopUp, id } = props;
    const [comment, setComment] = useState('');

    const [addComment] = useAddReviewForAdvMutation();

    return (
        <div className={s.modalBlock}>
            <div className={s.modalContent}>
                <HeadingH3>Отзывы о товаре</HeadingH3>
                <div className={s.modalBtnClose}>
                    <button type="button" onClick={handlePopUp}>
                        {' '}
                        <div className={s.modalBtnCloseLine} />
                    </button>
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
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                                placeholder="Введите комментарий"
                            />
                        </div>
                        <button
                            type="button"
                            className={`${s.formNewArtBtnPub} ${s.btnHov02}`}
                            onClick={() => {
                                setComment('');
                                addComment({ id, comment });
                            }}
                        >
                            Опубликовать
                        </button>
                    </form>
                    <div className={s.modalReviews}>
                        {reviews?.map((review) => {
                            return (
                                <Reviewer
                                    key={review.author.id}
                                    reviewName={review.author.name}
                                    reviewText={review.text}
                                    reviewDate={changeDate(review.created_on)}
                                    reviewTitle="Комментарий"
                                />
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductReviews;
