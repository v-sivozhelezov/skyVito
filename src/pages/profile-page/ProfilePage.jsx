import s from './ProfilePage.module.css';
import MenuToBack from '../../components/menu-to-back/MenuToBack';
import HeadingH2 from '../../components/UI/heading-h2/HeadingH2';
import HeadingH3 from '../../components/heading-h3/HeadingH3';
import MainProfile from '../../components/main-profile/MainProfile';
import { useGetCurrentUserQuery } from '../../services/getAccessTokenService';
import ProfileContentCards from '../../components/profile-content-cards/ProfileContentCards';

function ProfilePage() {
    const { data, isLoading } = useGetCurrentUserQuery();
    if (isLoading) {
        return 'Loading';
    }
    console.log({ data, isLoading });
    return (
        <div>
            <div className={s.mainContainer}>
                <MenuToBack />
                <HeadingH2>Здравствуйте, {data.name}!</HeadingH2>
                <MainProfile userData={data} />
                <HeadingH3>Мои товары</HeadingH3>
                <ProfileContentCards userId={data.id} />
            </div>
        </div>
    );
}

export default ProfilePage;
