import { Link, useNavigate } from 'react-router-dom';
import s from './Header.module.css';

function Header() {
    const navigate = useNavigate();
    return (
        <header className={s.header}>
            <nav className={s.headerNav}>
                {!JSON.parse(localStorage.getItem('auth')) ? (
                    <Link to="/auth">
                        <button
                            type="button"
                            className={`${s.headerBtnMainEnter} ${s.btnHov01}`}
                        >
                            Вход в личный кабинет
                        </button>
                    </Link>
                ) : (
                    <>
                        <Link to="/add-new-adv">
                            <button
                                type="button"
                                className={`${s.headerBtnMainEnter} ${s.btnHov01}`}
                            >
                                Разместить объявление
                            </button>
                        </Link>
                        <Link to="/profile">
                            <button
                                type="button"
                                className={`${s.headerBtnMainEnter} ${s.btnHov01}`}
                            >
                                Личный кабинет
                            </button>
                        </Link>
                        <Link to="/">
                            <button
                                type="button"
                                className={`${s.headerBtnMainEnter} ${s.btnHov01}`}
                                onClick={() => {
                                    navigate('/');
                                    localStorage.clear();
                                    window.location.reload();
                                }}
                            >
                                Выйти
                            </button>
                        </Link>
                    </>
                )}
            </nav>
        </header>
    );
}

export default Header;
