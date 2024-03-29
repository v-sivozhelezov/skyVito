import { useState } from 'react';
import { Link } from 'react-router-dom';
import HeadingH3 from '../heading-h3/HeadingH3';
import s from './MainAdv.module.css';
import ButtonShowNum from '../button-show-num/ButtonShowNum';
import ButtonChangeAdv from '../button-change-adv/ButtonChangeAdv';
import changeDate from '../../app/changeDate';
import { useGetReviewsForAdvQuery } from '../../services/getAccessTokenService';
import ProductReviews from '../../modals/product-reviews/ProductReviews';
import AddNewAdv from '../../modals/add-new-adv/AddNewAdv';

function MainAdv({ getChoseAdv }) {
    const compareIDUsers = () => {
        const userInfoData = JSON.parse(localStorage.getItem('userInfoData'));
        return getChoseAdv?.user?.id === userInfoData.id;
    };

    const [isPopUpActive, setPopUpActive] = useState(false);

    const [defaultUrlImg, setDefaultUrlImg] = useState(
        getChoseAdv?.images[0]?.url,
    );

    const handlePopUp = (e) => {
        setPopUpActive(e);
    };

    const { data: reviews, isLoading } = useGetReviewsForAdvQuery(
        getChoseAdv?.id,
    );

    if (isLoading) {
        return 'Идет загрузка...';
    }

    return (
        <div>
            {isPopUpActive === 'reviews' ? (
                <ProductReviews
                    reviews={reviews}
                    handlePopUp={handlePopUp}
                    id={getChoseAdv?.id}
                />
            ) : (
                ''
            )}
            {isPopUpActive === 'editAdv' ? (
                <AddNewAdv
                    heading="Изменить объявление"
                    handlePopUp={handlePopUp}
                    getChoseAdv={getChoseAdv}
                />
            ) : (
                ''
            )}
            <div className={s.mainArtic}>
                <div className={s.mainContent}>
                    <div className={s.articleLeft}>
                        <div className={s.articleFillImg}>
                            <div className={s.articleImg}>
                                <img
                                    src={`http://localhost:8090/${defaultUrlImg ?? getChoseAdv?.images[0]?.url}`}
                                    alt="img"
                                />
                            </div>
                            <ul className={s.articleImgBar}>
                                {getChoseAdv?.images?.map((img, index) => {
                                    return (
                                        <li
                                            className={s.articleImgList}
                                            key={index}
                                        >
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    setDefaultUrlImg(img.url)
                                                }
                                            >
                                                <div
                                                    className={
                                                        s.articleImgBarDiv
                                                    }
                                                >
                                                    <img
                                                        src={`http://localhost:8090/${img.url}`}
                                                        alt="img"
                                                    />
                                                </div>
                                            </button>
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>
                    </div>
                </div>
                <div className={s.articleRight}>
                    <div className={s.articleBlock}>
                        <HeadingH3>{getChoseAdv?.title}</HeadingH3>
                        <div className={s.articleInfo}>
                            <p className={s.articleDate}>
                                {changeDate(getChoseAdv?.created_on)}
                            </p>
                            <p className={s.articleCity}>
                                {getChoseAdv?.user?.city}
                            </p>
                            <button
                                type="button"
                                className={s.articleLink}
                                onClick={() => setPopUpActive('reviews')}
                            >
                                {`${reviews ? reviews.length : ''} отзывов`}
                            </button>
                        </div>
                        <p className={s.articlePrice}>
                            {getChoseAdv?.price} рублей.
                        </p>
                        {compareIDUsers() ? (
                            <ButtonChangeAdv
                                handlePopUp={handlePopUp}
                                id={getChoseAdv?.id}
                            />
                        ) : (
                            <ButtonShowNum
                                phoneNumber={getChoseAdv?.user?.phone}
                            />
                        )}

                        <div className={s.articleAuthor}>
                            <div className={s.authorImg}>
                                <img
                                    src={`http://localhost:8090/${getChoseAdv?.user?.avatar}`}
                                    alt="avatar"
                                />
                            </div>
                            <div className={s.authorCont}>
                                <button type="button">
                                    <Link
                                        to="/seller-profile"
                                        className={s.authorName}
                                    >
                                        {getChoseAdv?.user?.name}
                                    </Link>
                                </button>
                                <p className={s.authorAbout}>
                                    Продаёт товары с{' '}
                                    {changeDate(getChoseAdv?.user?.sells_from)}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={s.mainContainer}>
                <HeadingH3>Описание товара</HeadingH3>
                <div className={s.mainContent}>
                    <p className={s.mainText}>{getChoseAdv?.description}</p>
                </div>
            </div>
        </div>
    );
}

export default MainAdv;
