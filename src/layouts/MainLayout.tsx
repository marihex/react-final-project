import {HeaderComponent} from "../components/header-components/HeaderComponent.tsx";
import {Outlet} from "react-router-dom";

export const MainLayout = () => {
    return (
        <main className='bg-gray-800'>
        <HeaderComponent/>
            <hr/>
            <Outlet/>
        </main>
    );
};