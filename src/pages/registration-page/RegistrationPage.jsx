import '../../App.css';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import s from './RegistrationPage.module.css';
import { getAccessTokenAPI } from '../../services/getAccessTokenService';
import { setAuth } from '../../redux/slices/authSlice';

function RegistrationPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [city, setCity] = useState('');
    const [phone, setPhone] = useState('');
    const [error, setError] = useState('');

    const [fetchPostRegister] =
        getAccessTokenAPI.useFetchPostRegisterMutation();
    const [postAccessToken] = getAccessTokenAPI.usePostAccessTokenMutation();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const responseToken = () => {
        postAccessToken({ email, password })
            .then((response) => {
                navigate('/');
                dispatch(
                    setAuth({
                        access: response.data.access_token,
                        refresh: response.data.refresh_token,
                        // user: JSON.parse(localStorage.getItem('userDataInfo')),
                    }),
                );
                localStorage.setItem('access', response?.data?.access_token);
                localStorage.setItem('refresh', response?.data?.refresh_token);
            })
            .catch((er) => {
                console.log(er);
            });
    };

    const fetchForRegistration = async () => {
        if (!email) {
            setError('Не заполнен email');
            return;
        }
        if (!password) {
            setError('Не заполнен пароль');
            return;
        }
        if (password !== repeatPassword) {
            setError('Пароли не совпадают');
            return;
        }

        if (!phone) {
            setError('Не заполнен номер телефона');
            return;
        }

        fetchPostRegister({
            email,
            password,
            city,
            firstName,
            lastName,
            phone,
        })
            .then((response) => {
                console.log(response);
                if (response?.data?.id) {
                    responseToken();
                    setError('');
                }
                if (response?.error?.status === 400) {
                    setError('Такой пользователь уже существует');
                }
                if (response?.error?.status === 422) {
                    setError('Проверьте правильность введенных данных');
                }
            })
            .catch(() => {
                setError('Попробуйте позже');
            });
    };

    return (
        <div className={s.wrapper}>
            <div className={s.containerSignup}>
                <div className="modal__block">
                    <form
                        className={s.modalFormRegister}
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
                            className={`${s.wrap} modal__input login`}
                            type="email"
                            name="login"
                            placeholder="Введите email"
                            value={email}
                            onChange={(event) => {
                                setEmail(event.target.value);
                                setError('');
                            }}
                        />
                        <input
                            className={`${s.modalInputSignup} modal__input password`}
                            type="password"
                            name="password"
                            placeholder="Введите пароль"
                            value={password}
                            onChange={(event) => {
                                setPassword(event.target.value);
                                setError('');
                            }}
                        />
                        <input
                            className={`${s.modalInputSignup} modal__input password`}
                            type="password"
                            name="repeat-password"
                            placeholder="Повторите пароль"
                            value={repeatPassword}
                            onChange={(event) => {
                                setRepeatPassword(event.target.value);
                                setError('');
                            }}
                        />
                        <input
                            className={`${s.modalInputSignup} modal__input`}
                            type="text"
                            name="first-name"
                            value={firstName}
                            onChange={(event) =>
                                setFirstName(event.target.value)
                            }
                            placeholder="Имя (необязательно)"
                        />
                        <input
                            className={`${s.modalInputSignup} modal__input`}
                            type="text"
                            name="last-name"
                            value={lastName}
                            onChange={(event) =>
                                setLastName(event.target.value)
                            }
                            placeholder="Фамилия (необязательно)"
                        />
                        <input
                            className={`${s.modalInputSignup} modal__input`}
                            type="text"
                            name="city"
                            value={city}
                            onChange={(event) => setCity(event.target.value)}
                            placeholder="Город (необязательно)"
                        />
                        <input
                            className={`${s.modalInputSignup} modal__input`}
                            type="number"
                            name="city"
                            value={phone}
                            onChange={(event) => {
                                setPhone(event.target.value);
                                setError('');
                            }}
                            placeholder="Номер телефона"
                        />
                        {error ? <span className={s.error}>{error}</span> : ''}
                        <button
                            className={`${s.modalBtnSignupEnt}`}
                            type="button"
                            onClick={fetchForRegistration}
                        >
                            <span>Зарегистрироваться</span>
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default RegistrationPage;
