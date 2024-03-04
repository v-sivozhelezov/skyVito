/* eslint-disable jsx-a11y/label-has-associated-control */
import { useNavigate } from 'react-router-dom';
import FormModalEdit from '../../components/form-modals/FormModalEdit';
import FormModalAdd from '../../components/form-modals/FormModalAdd';

import HeadingH3 from '../../components/heading-h3/HeadingH3';
import s from './AddNewAdv.module.css';

function AddNewAdv(props) {
    const navigate = useNavigate();
    const handlePopUp = () => {
        if (props.heading === 'Новое объявление') {
            navigate(-1);
            return;
        }
        props.handlePopUp(false);
    };

    return (
        // <div className={s.wrapper}>
        // <div className={s.containerBg}>
        <div className={s.modalBlock}>
            <div className={s.modalContent}>
                <HeadingH3>{props.heading}</HeadingH3>
                <div className={s.modalBtnClose}>
                    <button type="button" onClick={handlePopUp}>
                        {' '}
                        <div className={s.modalBtnCloseLine} />
                    </button>
                </div>{' '}
                {props.heading === 'Новое объявление' ? (
                    <FormModalAdd />
                ) : (
                    <FormModalEdit
                        handlePopUp={props.handlePopUp}
                        getChoseAdv={props.getChoseAdv}
                    />
                )}
            </div>
        </div>
        // </div>
        // </div>
    );
}

export default AddNewAdv;
