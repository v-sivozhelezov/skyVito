import CardItem from '../UI/card-item/CardItem';
import s from './ProfileContentCards.module.css';
import { adsAPI } from '../../services/getAccessTokenService';

function ProfileContentCards(props) {
    const { data: allAds } = adsAPI.useGetAllAdsQuery();
    const filteredAds = allAds?.filter((ads) => ads.user_id === props.userId);

    return (
        <div className={s.mainWrapper}>
            <div className={s.mainContent}>
                <ul className={s.cards}>
                    {filteredAds?.map((ad, index) => {
                        return (
                            <li className={s.listContent} key={index}>
                                <CardItem ad={ad} />;
                            </li>
                        );
                    })}
                </ul>
            </div>
        </div>
    );
}

export default ProfileContentCards;
