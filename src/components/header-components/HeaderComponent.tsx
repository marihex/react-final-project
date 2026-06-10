import {Link} from "react-router-dom";
import {HeaderSearchComponent} from "./HeaderSearchComponent.tsx";
import {MenuComponent} from "./MenuComponent.tsx";
import './header-styles.css'
import {UserInfo} from "./UserInfo.tsx";

export const HeaderComponent = () => {
    return (
        <header>
            <Link to={'/'}>
                <img
                src="../../../public/images/blue_short-8e7b30f73a4020692ccca9c88bafe5dcb6f8a62a4c6bc55cd9ba82bb2cd95f6c.svg"
                alt="logo" className='w-52'/>
            </Link>
            <HeaderSearchComponent/>
            <MenuComponent/>
            <UserInfo/>
        </header>
    );
};