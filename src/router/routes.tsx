import {createBrowserRouter} from "react-router-dom";
import {MainLayout} from "../layouts/MainLayout.tsx";
import {HomePage} from "../pages/HomePage.tsx";
import {MoviePage} from "../pages/MoviePage.tsx";
import {GenrePage} from "../pages/GenrePage.tsx";
import {SearchPage} from "../pages/SearchPage.tsx";
import {GenresPage} from "../pages/GenresPage.tsx";
import {FavoritesPage} from "../pages/FavoritesPage.tsx";
import {ComingSoonPage} from "../pages/ComingSoonPage.tsx";
import {TrandingPage} from "../pages/TrandingPage.tsx";

export const routes = createBrowserRouter([
    {path:'', element: <MainLayout/>, children: [
            {index: true, element: <HomePage/>},
            {path: '/movie/:movieSlug', element: <MoviePage/>},
            {path: '/genres', element: <GenresPage/>},
            {path: '/genre/:genreSlug', element: <GenrePage/>},
            {path: '/favorites', element: <FavoritesPage/>},
            {path: '/coming-soon', element: <ComingSoonPage/>},
            {path: '/tranding', element: <TrandingPage/>},
            {path: '/search', element: <SearchPage/>}
        ]}
])