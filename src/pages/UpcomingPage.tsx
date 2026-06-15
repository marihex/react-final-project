import {useAppSelector} from "../redux/hooks/useAppSelector.ts";
import {useAppDispatch} from "../redux/hooks/useAppDispatch.ts";
import {useSearchParams} from "react-router-dom";
import {useEffect} from "react";
import {movieActions} from "../redux/movieSlice/movieSlice.ts";
import PaginationComponent from "../components/pagination/PaginationComponent.tsx";
import {MovieListComponentMain} from "../components/movie-list-main/MovieListComponentMain.tsx";

export const UpcomingPage = () => {
    const {upcoming, error, loadState, totalPages} = useAppSelector(state => state.movies);
    const dispatch = useAppDispatch();
    const [searchParams] = useSearchParams();
    const currentPage = Number(searchParams.get("page")) || 1;
    useEffect(() => {dispatch(movieActions.loadUpcoming(currentPage))},[dispatch, currentPage]);


    return (
        <section className='text-white'>
            {
                loadState && <div className='text-2xl'>Loading...</div>
            }
            {error && (
                <div className='text-red-500 text-xl'>
                    Error: {error}
                </div>
            )}
            <h1>Upcoming movies</h1>
            <div>
                <div>
                   <MovieListComponentMain movies={upcoming}/>
                </div>
                <div>
                    {
                        !loadState && totalPages > 1 && (
                            <PaginationComponent totalPages={totalPages} currentPage={currentPage}/>
                        )
                    }
                </div>
            </div>
        </section>
    );
};