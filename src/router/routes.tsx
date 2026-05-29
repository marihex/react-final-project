import {createBrowserRouter} from "react-router-dom";
import {MainLayout} from "../layouts/MainLayout.tsx";
import {HomePage} from "../pages/HomePage.tsx";
import {MoviePage} from "../pages/MoviePage.tsx";
import {GenrePage} from "../pages/GenrePage.tsx";
import {SearchPage} from "../pages/SearchPage.tsx";

export const routes = createBrowserRouter([
    {path:'', element: <MainLayout/>, children: [
            {index: true, element: <HomePage/>},
            {path: '/movie/:movieSlug', element: <MoviePage/>},
            {path: '/genre/:genreSlug', element: <GenrePage/>},
            {path: '/search', element: <SearchPage/>}
        ]}
])