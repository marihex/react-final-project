import NotificationsNoneTwoToneIcon from '@mui/icons-material/NotificationsNoneTwoTone';
import './header-styles.css'

export const UserInfo = () => {
    return (
        <div className='user__container'>
            <div className='notification'>
                <NotificationsNoneTwoToneIcon/>
            </div>
            <div className='flex gap-1'>
                <img src="https://img.icons8.com/?size=40&id=LypZSIS7xVVW&format=png&color=000000" alt=""
                      className='user__img'/>
                <div className='user__info'>
                    <span className='user__name'>UserName</span>
                    <span className='user__status'>Premium</span>
                </div>
            </div>
        </div>
    );
};