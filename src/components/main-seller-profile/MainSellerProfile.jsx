import { Link } from 'react-router-dom';
import s from './MainSellerProfile.module.css';
import HeadingH3 from '../heading-h3/HeadingH3';
import ButtonShowNum from '../button-show-num/ButtonShowNum';
import { adsAPI } from '../../services/getAccessTokenService';
import changeDate from '../../app/changeDate';

function MainSellerProfile() {
    const choseAdvID = localStorage.getItem('advID');
    const { data: getChoseAdv } = adsAPI.useGetChoseAdvQuery(
        Number(choseAdvID),
    );
    return (
        <div className={s.mainProfileSell}>
            <div className={s.profileSellContent}>
                <div className={s.profileSellSeller}>
                    <div className={s.sellerLeft}>
                        <div className={s.sellerImg}>
                            <Link to="/">
                                <img src="" alt="" />
                            </Link>
                        </div>
                    </div>
                    <div className={s.sellerRight}>
                        <HeadingH3>
                            {getChoseAdv?.user?.name}
                            {getChoseAdv?.user?.surname}
                        </HeadingH3>
                        <p className={s.sellerCity}>
                            {getChoseAdv?.user?.city}
                        </p>
                        <p className={s.sellerInf}>
                            Продаёт товары с{' '}
                            {changeDate(getChoseAdv?.user?.sells_from)}
                        </p>
                        <ButtonShowNum />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MainSellerProfile;
