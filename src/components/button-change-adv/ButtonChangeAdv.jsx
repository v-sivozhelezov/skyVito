import { useNavigate } from 'react-router-dom';
import { useDeleteAdvMutation } from '../../services/getAccessTokenService';
import s from './ButtonChangeAdv.module.css';

function ButtonChangeAdv(props) {
    const [deleteAdv] = useDeleteAdvMutation();
    const navigate = useNavigate();

    return (
        <div className={s.articleBtnBlock}>
            <button
                onClick={() => props.handlePopUp('editAdv')}
                type="button"
                className={`${s.articleBtn} ${s.btnRedact}`}
            >
                Редактировать
            </button>
            <button
                type="button"
                className={`${s.articleBtn} ${s.btnRemove}`}
                onClick={() => {
                    navigate('/');
                    deleteAdv(props.id);
                }}
            >
                Снять с публикации
            </button>
        </div>
    );
}

export default ButtonChangeAdv;
