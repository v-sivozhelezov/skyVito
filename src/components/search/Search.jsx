import { useDispatch } from 'react-redux';
import { useState } from 'react';
import Logo from '../UI/logo/Logo';
import s from './Search.module.css';
import { setFilteredAds } from '../../redux/slices/filterSlice';

function Search() {
    const dispatch = useDispatch();
    const [filterValue, setFilterValue] = useState();
    function handleFilterAds() {
        dispatch(setFilteredAds(filterValue));
    }
    return (
        <div className={s.mainSearch}>
            <Logo />
            <div className={s.searchForm}>
                <input
                    className={s.searchText}
                    type="search"
                    placeholder="Поиск по объявлениям"
                    name="text"
                    defaultValue={filterValue}
                    onChange={(e) => setFilterValue(e.target.value)}
                />
                <button
                    className={`${s.searchBtn} ${s.btnHov02}`}
                    type="button"
                    onClick={handleFilterAds}
                >
                    Найти
                </button>
            </div>
        </div>
    );
}

export default Search;
