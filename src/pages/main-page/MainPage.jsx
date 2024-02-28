import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import s from './MainPage.module.css';
import '../../App.css';
import Header from '../../components/header/Header';
import AddNewAdv from '../../modals/add-new-adv/AddNewAdv';
import AdvSettings from '../../modals/adv-settings/AdvSettings';
import ProductReviews from '../../modals/product-reviews/ProductReviews';
import { useGetAuthUserQuery } from '../../services/getAccessTokenService';

function MainPage() {
    const { data, isLoading } = useGetAuthUserQuery();
    if (!isLoading) {
        localStorage.setItem('userInfoData', JSON.stringify(data));
    }

    const [isShowingAddNewAdv] = useState(false);
    return (
        <div className="wrapper">
            <div className={s.container}>
                <Header />
                {isShowingAddNewAdv ? <AddNewAdv /> : ''}
                {isShowingAddNewAdv ? <AdvSettings /> : ''}
                {isShowingAddNewAdv ? <ProductReviews /> : ''}
                <Outlet />
            </div>
        </div>
    );
}

export default MainPage;
