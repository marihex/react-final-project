import {useEffect} from "react";
import {useAppSelector} from "../../redux/hooks/useAppSelector.ts";
import {useAppDispatch} from "../../redux/hooks/useAppDispatch.ts";
import {movieActions} from "../../redux/movieSlice/movieSlice.ts";
import {MoviesListCardComponent} from "../movie-list-card/MoviesListCardComponent.tsx";
import {useParams, useSearchParams} from "react-router-dom";


export const MoviesWithGenresComponent = () => {
    const {moviesWithGenres, error, loadState} = useAppSelector(state => state.movies);
    const {id} = useParams();
    const [searchParams] = useSearchParams();
    const currentPage = Number(searchParams.get("page")) || 1;
    const dispatch = useAppDispatch();
    useEffect(() => {
        if (id) dispatch(movieActions.loadMoviesWithGenres({id: id, page: currentPage}))
    }, [id, currentPage, dispatch]);


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
                moviesWithGenres.map(movie => (
                    <main>
                        <section className='grid grid-cols-3  gap-3 py-5 px-14'>
                            <MoviesListCardComponent movieItem={movie} key={movie.id}/>
                        </section>
                </main>
                ))
            }
        </>
    )
}
