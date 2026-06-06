import {createBrowserRouter} from "react-router-dom";
import {MainLayout} from "../layouts/MainLayout.tsx";
import {HomePage} from "../pages/HomePage.tsx";
import {MoviePage} from "../pages/MoviePage.tsx";
import {GenrePage} from "../pages/GenrePage.tsx";
import {SearchPage} from "../pages/SearchPage.tsx";
import {GenresPage} from "../pages/GenresPage.tsx";
import {PopularPage} from "../pages/PopularPage.tsx";
import {UpcomingPage} from "../pages/UpcomingPage.tsx";
import {TrendingPage} from "../pages/TrendingPage.tsx";

export const routes = createBrowserRouter([
    {path:'', element: <MainLayout/>, children: [
            {index: true, element: <HomePage/>},
            {path: '/movie/:id', element: <MoviePage/>},
            {path: '/genres', element: <GenresPage/>},
            {path: '/genre/:id', element: <GenrePage/>},
            {path: '/popular', element: <PopularPage/>},
            {path: '/upcoming', element: <UpcomingPage/>},
            {path: '/trending', element: <TrendingPage/>},
            {path: '/search', element: <SearchPage/>}
        ]}
])