/* eslint-disable jsx-a11y/label-has-associated-control */
import { useEffect, useState } from 'react';

import { Link } from 'react-router-dom';
import HeadingH3 from '../heading-h3/HeadingH3';
import s from './MainProfile.module.css';
import { useEditUserMutation } from '../../services/getAccessTokenService';

function MainProfile({ userData }) {
    const { surname, name, city, phone, role, email } = userData;
    const [editProfile] = useEditUserMutation();
    const [profile, setProfile] = useState({
        name: '',
        surname: '',
        city: '',
        phone: '',
        role: 'user',
        email: '',
    });
    useEffect(() => {
        setProfile({ name, surname, city, phone, role, email });
    }, [userData]);

    const changeProfile = (e) => {
        setProfile({ ...profile, [e.target.name]: e.target.value });
    };

    const submitProfile = () => {
        editProfile(profile);
    };
    return (
        <div className={s.mainProfile}>
            <div className={s.profileContent}>
                <HeadingH3>Настройки профиля</HeadingH3>
                <div className={s.profileSettings}>
                    <div className={s.settingsLeft}>
                        <div className={s.settingsImg}>
                            <Link to="/">
                                <img src="" alt="" />
                            </Link>
                        </div>
                        <button className={s.settingsChangePhoto} type="button">
                            Заменить
                        </button>
                    </div>
                    <div className={s.settingsRight}>
                        <form className={s.settingsForm} action="#">
                            <div className={s.settingsDiv}>
                                <label htmlFor="fname">Имя</label>
                                <input
                                    name="name"
                                    className={s.settingsFName}
                                    type="text"
                                    value={profile.name}
                                    onChange={changeProfile}
                                />
                            </div>
                            <div className={s.settingsDiv}>
                                <label htmlFor="lname">Фамилия</label>
                                <input
                                    name="surname"
                                    className={s.settingsLName}
                                    type="text"
                                    value={profile.surname}
                                    onChange={changeProfile}
                                />
                            </div>
                            <div className={s.settingsDiv}>
                                <label htmlFor="city">Город</label>
                                <input
                                    name="city"
                                    className={s.settingsCity}
                                    type="text"
                                    value={profile.city}
                                    onChange={changeProfile}
                                />
                            </div>
                            <div className={s.settingsDiv}>
                                <label htmlFor="phone">Телефон</label>
                                <input
                                    name="phone"
                                    className={s.settingsPhone}
                                    type="phone"
                                    id="phone"
                                    value={profile.phone}
                                    onChange={changeProfile}
                                />
                            </div>

                            <button
                                className={s.settingsBtn}
                                type="button"
                                onClick={submitProfile}
                            >
                                Сохранить
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MainProfile;
