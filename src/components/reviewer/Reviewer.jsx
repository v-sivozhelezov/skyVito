import s from '../../modals/product-reviews/ProductReviews.module.css';

function Reviewer(props) {
    console.log(props);

    return (
        <div className={s.reviewsReview}>
            <div className={s.reviewItem}>
                <div className={s.reviewLeft}>
                    <div className={s.reviewImg}>
                        <img
                            src={`http://localhost:8090/${props?.reviewAuthor?.avatar}`}
                            alt="avatar"
                        />
                    </div>
                </div>
                <div className={s.reviewRight}>
                    <p className={`${s.reviewName} ${s.fontT}`}>
                        {props?.reviewAuthor?.name}{' '}
                        <span>{props.reviewDate}</span>
                    </p>
                    <h5 className={`${s.reviewTitle} ${s.fontT}`}>
                        Коментарий
                    </h5>
                    <p className={`${s.reviewText} ${s.fontT}`}>
                        {props.reviewText}
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Reviewer;
