import {HeaderComponent} from "../components/header-components/HeaderComponent.tsx";
import {Outlet, ScrollRestoration} from "react-router-dom";
import {FooterComponent} from "../components/footer/FooterComponent.tsx";

export const MainLayout = () => {
    return (
        <div className='bg-black'>
            <ScrollRestoration />
        <HeaderComponent/>
            <Outlet/>
            <FooterComponent/>
        </div>
    );
};