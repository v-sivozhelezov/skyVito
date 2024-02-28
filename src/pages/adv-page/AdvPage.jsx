import MainAdv from '../../components/main-adv/MainAdv';
import MenuToBack from '../../components/menu-to-back/MenuToBack';
import s from './AdvPage.module.css';
import { adsAPI } from '../../services/getAccessTokenService';

function AdvPage() {
    const choseAdvID = localStorage.getItem('advID');
    const { data: getChoseAdv } = adsAPI.useGetChoseAdvQuery(
        Number(choseAdvID),
    );

    console.log(getChoseAdv);
    return (
        <div className={s.main}>
            <div className={s.mainContainer}>
                <MenuToBack />
                <MainAdv getChoseAdv={getChoseAdv} />
            </div>
        </div>
    );
}

export default AdvPage;
