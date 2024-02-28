import s from './ButtonShowNum.module.css';

function ButtonShowNum() {
    return (
        <button type="button" className={s.articleBtn}>
            Показать телефон
            <span>8 905 XXX XX XX</span>
        </button>
    );
}

export default ButtonShowNum;
