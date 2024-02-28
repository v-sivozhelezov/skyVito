import { Link } from 'react-router-dom';
import s from '../../search/Search.module.css';

function Logo() {
    return (
        <>
            <Link to="/" className="search__logo-link">
                <img
                    className={s.searchLogoImg}
                    src="/img/logo.png"
                    alt="logo"
                />
            </Link>
        </>
    );
}

export default Logo;
