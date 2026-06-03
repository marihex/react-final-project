import {useAppSelector} from "../../redux/hooks/useAppSelector.ts";
import {useAppDispatch} from "../../redux/hooks/useAppDispatch.ts";
import {useEffect} from "react";
import {movieActions} from "../../redux/movieSlice/movieSlice.ts";
import {MoviesListCardComponent} from "../movie-list-card-component/MoviesListCardComponent.tsx";

export const MovieListComponent = () => {
    const {movies} = useAppSelector(state => state.movies);
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(movieActions.loadMovies(2))
    }, [dispatch]);
    return (
        <section className='grid grid-cols-4 gap-3'>
            {
                movies.map(movie => <MoviesListCardComponent movieItem={movie} key={movie.id}/>)
            }
        </section>
    );
};