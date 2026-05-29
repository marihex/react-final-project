import {createBrowserRouter} from "react-router-dom";

export const routes = createBrowserRouter([
    {path:'', element: <MainLayout/>, children: [
            {index: true, element: <HomePage/>},
            {path: '/movie/:id', element: <MoviePage/>},
            {path: '/genre/:genreId', element: <GenrePage/>},

        ]}
])