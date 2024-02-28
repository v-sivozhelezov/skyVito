import HeadingH2 from '../../components/UI/heading-h2/HeadingH2';
import Search from '../../components/search/Search';
import s from './AdsPage.module.css';
import MainContentCards from '../../components/main-content-cards/MainContentCards';

function MainPage() {
    return (
        <div className={s.main}>
            <Search />
            <div className={s.mainContainer}>
                <HeadingH2>Объявления</HeadingH2>
                <MainContentCards />
            </div>
        </div>
    );
}

export default MainPage;
