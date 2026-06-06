import {type FC, useEffect} from "react";
import {useAppSelector} from "../../redux/hooks/useAppSelector.ts";
import {useAppDispatch} from "../../redux/hooks/useAppDispatch.ts";
import {movieActions} from "../../redux/movieSlice/movieSlice.ts";
import {MoviesListCardComponent} from "../movie-list-card/MoviesListCardComponent.tsx";

type GenreIdProps = {
    genreId: number | string | null;
}

export const MoviesWithGenresComponent: FC<GenreIdProps> = ({genreId}) => {
    const {moviesWithGenres, error, loadState} = useAppSelector(state => state.movies);
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(movieActions.loadMoviesWithGenres({id: genreId, page:1}))
    }, [genreId]);


return (
    <>
        {
            loadState && <div className='text-2xl'>Loading...</div>
        }
        {error && (
            <div className='text-red-500 text-xl'>
                Error: {error}
            </div>
        )}
        {
            moviesWithGenres.map(movie => <MoviesListCardComponent movieItem={movie} key={movie.id}/>)
        }
    </>
)
}
