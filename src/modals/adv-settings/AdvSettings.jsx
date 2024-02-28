import FormModal from '../../components/form-modals/FormModal';
import HeadingH3 from '../../components/heading-h3/HeadingH3';
import s from '../add-new-adv/AddNewAdv.module.css';

function AdvSettings() {
    const textArea =
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.';
    return (
        <div className={s.wrapper}>
            <div className={s.containerBg}>
                <div className={s.modalBlock}>
                    <div className={s.modalContent}>
                        <HeadingH3>Редактировать объявление</HeadingH3>
                        <div className={s.modalBtnClose}>
                            <div className={s.modalBtnCloseLine} />
                        </div>
                        <FormModal
                            newArtArea={textArea}
                            newArtInput="Ракетка для большого тенниса Triumph Pro STС Б/У"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AdvSettings;
