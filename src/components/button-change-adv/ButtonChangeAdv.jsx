import { useDeleteAdvMutation } from '../../services/getAccessTokenService';
import s from './ButtonChangeAdv.module.css';

function ButtonChangeAdv(props) {
    const [deleteAdv] = useDeleteAdvMutation();

    return (
        <div className={s.articleBtnBlock}>
            <button type="button" className={`${s.articleBtn} ${s.btnRedact}`}>
                Редактировать
            </button>
            <button
                type="button"
                className={`${s.articleBtn} ${s.btnRemove}`}
                onClick={() => deleteAdv(props.id)}
            >
                Снять с публикации
            </button>
        </div>
    );
}

export default ButtonChangeAdv;
