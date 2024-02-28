import { Link } from 'react-router-dom';
import s from './CardItem.module.css';
import changeDate from '../../../app/changeDate';

function CardItem({ ad }) {
    const { title, price, description, created_on: createdOn, images } = ad;
    function addToStoreSelectedAdv() {
        localStorage.setItem('advID', ad.id);
    }

    return (
        <div className={s.cardsItem}>
            <div className={s.cardsCard}>
                <div className={s.cardImage}>
                    <Link to="/" className="">
                        <img src={images?.url} alt="" />
                    </Link>
                </div>
                <div className={s.cardContent}>
                    <button type="button" onClick={addToStoreSelectedAdv}>
                        <Link to={`/adv-page/${ad.id}`} className="">
                            <h3 className={s.cardTitle}>{title}</h3>
                        </Link>
                    </button>
                    <p className={s.cardPrice}>{price} руб.</p>
                    <p className={s.cardPlace}>{description}</p>
                    <p className={s.cardDate}>{changeDate(createdOn)}</p>
                </div>
            </div>
        </div>
    );
}

export default CardItem;
