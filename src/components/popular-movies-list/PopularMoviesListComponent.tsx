import {useAppSelector} from "../../redux/hooks/useAppSelector.ts";
import {useAppDispatch} from "../../redux/hooks/useAppDispatch.ts";
import {useEffect} from "react";
import {movieActions} from "../../redux/movieSlice/movieSlice.ts";
import {MoviesListCardComponent} from "../movie-list-card/MoviesListCardComponent.tsx";
import {useSearchParams} from "react-router-dom";
import PaginationComponent from "../pagination/PaginationComponent.tsx";

export const PopularMoviesListComponent = () => {
    const {popular, loadState, error, totalPages} = useAppSelector(state => state.movies)
    const dispatch = useAppDispatch();
    const [searchParams] = useSearchParams();
    const currentPage = Number(searchParams.get("page")) || 1;
    useEffect(() => {
        dispatch(movieActions.loadPopular(currentPage))
    }, [dispatch, currentPage]);
    return (
        <section>
            <h1>Popular movies</h1>
            {
                loadState && <div className='text-2xl'>Loading...</div>
            }
            {error && (
                <div className='text-red-500 text-xl'>
                    Error: {error}
                </div>
            )}
            <div className='grid grid-cols-4  gap-3 py-5 px-14'>
                {
                    popular.map((movie) => <MoviesListCardComponent movieItem={movie} key={movie.id}/>)
                }
            </div>
            <div>
                {
                    !loadState && totalPages > 1 && (
                        <PaginationComponent totalPages={totalPages} currentPage={currentPage}/>
                    )
                }
            </div>
        </section>
    );
};