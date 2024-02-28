/* eslint-disable jsx-a11y/label-has-associated-control */
import FormModal from '../../components/form-modals/FormModal';
import HeadingH3 from '../../components/heading-h3/HeadingH3';
import s from './AddNewAdv.module.css';

function AddNewAdv() {
    return (
        <div className={s.wrapper}>
            <div className={s.containerBg}>
                <div className={s.modalBlock}>
                    <div className={s.modalContent}>
                        <HeadingH3>Новое объявление</HeadingH3>
                        <div className={s.modalBtnClose}>
                            <div className={s.modalBtnCloseLine} />
                        </div>
                        <FormModal />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AddNewAdv;
