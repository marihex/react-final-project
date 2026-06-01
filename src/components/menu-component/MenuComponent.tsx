import {NavLink} from "react-router-dom";

export const MenuComponent = () => {
    return (
        <header>

            <nav>
                <ul>
                    <li><NavLink to={'/'}>Home</NavLink></li>
                    <li><NavLink to={'genres'}>Genres</NavLink></li>
                    <li className='user-info'>
                        <img src="https://img.icons8.com/?size=30&id=HEBTcR9O3uzR&format=png&color=000000" alt=""/>
                    </li>
                </ul>
            </nav>
        </header>
    );
};