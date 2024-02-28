import s from './ButtonChangeAdv.module.css';

function ButtonChangeAdv() {
    return (
        <div className={s.articleBtnBlock}>
            <button type="button" className={`${s.articleBtn} ${s.btnRedact}`}>
                Редактировать
            </button>
            <button type="button" className={`${s.articleBtn} ${s.btnRemove}`}>
                Снять с публикации
            </button>
        </div>
    );
}

export default ButtonChangeAdv;
