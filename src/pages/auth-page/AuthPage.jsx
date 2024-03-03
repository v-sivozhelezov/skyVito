import '../../App.css';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import s from './AuthPage.module.css';

import {
    getAccessTokenAPI,
    useGetAuthUserMutation,
} from '../../services/getAccessTokenService';
import { setAuth, setAuthUser } from '../../redux/slices/authSlice';

function AuthPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState(false);
    const [error, setError] = useState('');
    const [postAccessToken] = getAccessTokenAPI.usePostAccessTokenMutation();
    const [getAuthUser] = useGetAuthUserMutation();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const responseToken = () => {
        if (!email) {
            setError('Не заполнен email');
            return;
        }
        if (!password) {
            setError('Не заполнен пароль');
            return;
        }
        postAccessToken({ email, password })
            .then((response) => {
                console.log(error);
                dispatch(
                    setAuth({
                        access: response.data.access_token,
                        refresh: response.data.refresh_token,
                        user: JSON.parse(localStorage.getItem('userDataInfo')),
                    }),
                );
                localStorage.setItem('access', response?.data?.access_token);
                localStorage.setItem('refresh', response?.data?.refresh_token);
            })
            .then(() => {
                getAuthUser().then((response) => {
                    localStorage.setItem(
                        'userInfoData',
                        JSON.stringify(response.data),
                    );
                    dispatch(setAuthUser(response.data));
                    console.log(response);
                    setError('');
                    navigate('/');
                });
            })
            .catch(() => {
                // localStorage.setItem('userDataInfo', null);
                setError('Проверьте правильность ввода логина и пароля');
            });
    };

    return (
        <div className={s.wrapper}>
            <div className={s.containerEnter}>
                <div className="modal__block">
                    <form
                        className="modal__form-login"
                        action=""
                        onSubmit={(event) => {
                            event.preventDefault();
                            setError('');
                        }}
                    >
                        <div>
                            <Link to="/">
                                <img
                                    className="modal__logo"
                                    src="/img/logo_modal.png"
                                    alt=""
                                />
                            </Link>
                        </div>
                        <input
                            className="modal__input login"
                            type="text"
                            name="login"
                            value={email}
                            onChange={(event) => {
                                setEmail(event.target.value);
                                setError('');
                            }}
                            placeholder="Введите email"
                        />
                        <input
                            className="modal__input"
                            type="password"
                            name="password"
                            value={password}
                            onChange={(event) => {
                                setPassword(event.target.value);
                                setError('');
                            }}
                            placeholder="Введите пароль"
                        />
                        {error ? <span className={s.error}>{error}</span> : ''}

                        <button
                            className={`${s.modalBtnEnter}`}
                            type="button"
                            onClick={responseToken}
                        >
                            <span>Войти</span>
                        </button>
                        <button className={`${s.modalBtnSignup}`} type="button">
                            <Link to="/registration">Зарегистрироваться</Link>
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default AuthPage;
