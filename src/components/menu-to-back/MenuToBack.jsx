import { Link } from 'react-router-dom';
import Logo from '../UI/logo/Logo';
import s from './MenuToBack.module.css';

function MenuToBack() {
    return (
        <div className={s.mainMenu}>
            <Logo />
            <div className={s.menuForm}>
                <Link to="/">
                    <button
                        type="button"
                        className={`${s.menuBtn} ${s.btnHov02}`}
                    >
                        Вернуться на главную
                    </button>
                </Link>
            </div>
        </div>
    );
}

export default MenuToBack;
