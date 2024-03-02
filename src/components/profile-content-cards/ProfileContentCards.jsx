import CardItem from '../UI/card-item/CardItem';
import s from './ProfileContentCards.module.css';
import { adsAPI } from '../../services/getAccessTokenService';

function ProfileContentCards(props) {
    const { data: allAds } = adsAPI.useGetAllAdsQuery();
    const filteredAds = allAds?.filter((ads) => ads.user_id === props.userId);

    return (
        <div className={s.mainWrapper}>
            <div className={s.mainContent}>
                <div className={s.cards}>
                    {filteredAds?.map((ad) => {
                        return <CardItem ad={ad} key={ad.id} />;
                    })}
                </div>
            </div>
        </div>
    );
}

export default ProfileContentCards;
