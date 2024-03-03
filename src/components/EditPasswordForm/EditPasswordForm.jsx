import { useState } from 'react';

import s from './EditPasswordForm.module.css';
import { useEditPasswordUserMutation } from '../../services/getAccessTokenService';

function EditPasswordForm(props) {
    const [password, setPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [error, setError] = useState('');
    const [editPasswordUser] = useEditPasswordUserMutation();

    const editPassword = () => {
        if (!password) {
            setError('Введите старый пароль');
            return;
        }
        if (!newPassword) {
            setError('Введите новый пароль');
            return;
        }
        if (password === newPassword) {
            setError('Пароли не должны совпадать');
            return;
        }
        editPasswordUser({
            password_1: password,
            password_2: newPassword,
        }).then((response) => {
            console.log(response);
            if (response?.error) {
                console.log(response);
                setError('Неверный пароль');
                return;
            }
            props.handlePopUp();
        });
    };

    return (
        <div className={s.modalContent}>
            <div className="modal__block">
                <form
                    className={s.modalFormRegister}
                    action=""
                    onSubmit={(event) => {
                        event.preventDefault();
                        setError('');
                    }}
                >
                    <input
                        className={`${s.modalInputSignup} modal__input password`}
                        type="password"
                        name="password"
                        placeholder="Введите старый пароль"
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
                        placeholder="Введите новый пароль"
                        value={newPassword}
                        onChange={(event) => {
                            setNewPassword(event.target.value);
                            setError('');
                        }}
                    />
                    {error ? <span className={s.error}>{error}</span> : ''}
                    <button
                        className={`${s.modalBtnSignupEnt}`}
                        type="button"
                        onClick={editPassword}
                    >
                        <span>Сохранить</span>
                    </button>
                </form>
            </div>
        </div>
    );
}

export default EditPasswordForm;
