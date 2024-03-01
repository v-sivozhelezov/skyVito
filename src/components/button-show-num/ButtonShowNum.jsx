import { useState } from 'react';
import s from './ButtonShowNum.module.css';

function ButtonShowNum(props) {
    const [isShowNum, setIsShowNum] = useState(false);

    return (
        <button
            type="button"
            className={s.articleBtn}
            onClick={() => {
                setIsShowNum(true);
            }}
        >
            <span>{isShowNum ? props.phoneNumber : 'Показать телефон'}</span>
        </button>
    );
}

export default ButtonShowNum;
