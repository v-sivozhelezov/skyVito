import MainAdv from '../../components/main-adv/MainAdv';
import MenuToBack from '../../components/menu-to-back/MenuToBack';
import s from './MyAdvPage.module.css';

function MyAdvPage() {
    return (
        <div className={s.main}>
            <div className={s.mainContainer}>
                <MenuToBack />
                <MainAdv />
            </div>
        </div>
    );
}

export default MyAdvPage;
