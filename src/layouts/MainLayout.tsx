import {HeaderComponent} from "../components/header-components/HeaderComponent.tsx";
import {Outlet, ScrollRestoration} from "react-router-dom";

export const MainLayout = () => {
    return (
        <main className='bg-black'>
            <ScrollRestoration />
        <HeaderComponent/>
            <Outlet/>
        </main>
    );
};