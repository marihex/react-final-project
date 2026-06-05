import {Link} from "react-router-dom";
import {HeaderSearchComponent} from "./HeaderSearchComponent.tsx";

export const HeaderComponent = () => {
    return (
        <header className='py-2 px-5 flex items-center justify-between text-white'>
            <Link to={'/'}>
                <img
                src="../../../public/images/blue_short-8e7b30f73a4020692ccca9c88bafe5dcb6f8a62a4c6bc55cd9ba82bb2cd95f6c.svg"
                alt="logo" className='w-52'/>
            </Link>

            {/*<Link to={'/search'}>Search the movie</Link>*/}
            <HeaderSearchComponent/>
            <div className='flex items-center justify-between gap-3'>
                <div className='w-14 h-14 rounded-lg bg-gray-700 flex items-center justify-center'>
                    <img src="../../../public/icons/icons8-notification-24.png" alt="" className='w-5'/>
                </div>
                <div className='flex items-center justify-center gap-4 w-36 rounded-lg bg-gray-700 py-1'>
                    <img src="../../../public/icons/icons8-user-48.png" alt=""/>
                    <div className='flex flex-col justify-center'>
                        <span>User</span>
                        <span className='text-xs text-yellow-500'>Premium</span>
                    </div>
                </div>
            </div>
        </header>
    );
};