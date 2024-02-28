import s from './SellerProfilePage.module.css';
import HeadingH2 from '../../components/UI/heading-h2/HeadingH2';
import MenuToBack from '../../components/menu-to-back/MenuToBack';
import MainContentCards from '../../components/main-content-cards/MainContentCards';
import HeadingH3 from '../../components/heading-h3/HeadingH3';
import MainSellerProfile from '../../components/main-seller-profile/MainSellerProfile';

function SellerProfilePage() {
    return (
        <div className={s.mainContainer}>
            <MenuToBack />
            <HeadingH2>Профиль продавца</HeadingH2>
            <MainSellerProfile />
            <HeadingH3>Товары продавца</HeadingH3>
            <MainContentCards />
        </div>
    );
}

export default SellerProfilePage;
