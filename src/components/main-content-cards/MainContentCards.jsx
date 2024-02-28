import { useSelector } from 'react-redux';
import CardItem from '../UI/card-item/CardItem';
import s from './MainContentCards.module.css';
import { adsAPI } from '../../services/getAccessTokenService';
import { selectFilterAds } from '../../redux/slices/filterSlice';

function MainContentCards() {
    const { data: allAds } = adsAPI.useGetAllAdsQuery();
    console.log(allAds);
    const filterAds = useSelector(selectFilterAds);
    const filteredAds = allAds?.filter((ads) => {
        const matchesNameTrack = ads.title
            .toLowerCase()
            .includes(filterAds.toLowerCase());
        return matchesNameTrack;
    });
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

export default MainContentCards;
