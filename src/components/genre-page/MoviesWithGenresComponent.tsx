import {useEffect} from "react";
import {useAppSelector} from "../../redux/hooks/useAppSelector.ts";
import {useAppDispatch} from "../../redux/hooks/useAppDispatch.ts";
import {movieActions} from "../../redux/movieSlice/movieSlice.ts";
import {MoviesListCardComponent} from "../movie-list-card/MoviesListCardComponent.tsx";
import {Link, useParams, useSearchParams} from "react-router-dom";
import {genreActions} from "../../redux/genreSlice/genreSlice.ts";
import PaginationComponent from "../pagination/PaginationComponent.tsx";


export const MoviesWithGenresComponent = () => {
    const {moviesWithGenres, error, loadState, totalPages} = useAppSelector(state => state.movies);
    const {genres} = useAppSelector(state => state.genres)
    const {id} = useParams();
    const [searchParams] = useSearchParams();
    const currentPage = Number(searchParams.get("page")) || 1;
    const dispatch = useAppDispatch();
    useEffect(() => {
        if (id) dispatch(movieActions.loadMoviesWithGenres({id: id, page: currentPage}))
    }, [id, currentPage, dispatch]);
    useEffect(() => {
        dispatch(genreActions.loadGenres())
    }, [dispatch]);


    return (
        <main className='flex gap-10'>
            {
                loadState && <div className='text-2xl'>Loading...</div>
            }
            {error && (
                <div className='text-red-500 text-xl'>
                    Error: {error}
                </div>
            )}
            <aside className='flex flex-col gap-2'>
                {
                    genres && genres.map(genre => (

                        <Link to={`/movie/genre/${genre.id}`} key={genre.id}>{genre.name}</Link>

                    ))
                }
            </aside>
            <section>
                <div className='grid grid-cols-4  gap-3 py-5 px-14'>
                    {
                        (moviesWithGenres[Number(id)] || []).map(movie => (

                            <MoviesListCardComponent movieItem={movie} key={movie.id}/>

                        ))

                    }

                </div>
                <div>
                    {
                        !loadState && totalPages > 0 && (
                            <PaginationComponent totalPages={totalPages} currentPage={currentPage}/>
                        )
                    }
                </div>
            </section>
        </main>
    )
}
