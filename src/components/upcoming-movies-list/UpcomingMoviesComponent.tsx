import {useAppSelector} from "../../redux/hooks/useAppSelector.ts";
import {useAppDispatch} from "../../redux/hooks/useAppDispatch.ts";
import {useEffect} from "react";
import {movieActions} from "../../redux/movieSlice/movieSlice.ts";
import {MoviesListCardComponent} from "../movie-list-card/MoviesListCardComponent.tsx";
import {useSearchParams} from "react-router-dom";
import PaginationComponent from "../pagination/PaginationComponent.tsx";

export const UpcomingMoviesComponent = () => {
    const {upcoming, error, loadState, totalPages} = useAppSelector(state => state.movies);
    const dispatch = useAppDispatch();
    const [searchParams] = useSearchParams();
    const currentPage = Number(searchParams.get("page")) || 1;
    useEffect(() => {dispatch(movieActions.loadUpcoming(currentPage))},[dispatch, currentPage]);

    // const todayDate = new Date();
    // const upcomingFiltered = upcoming.filter(movie => new Date(movie.release_date) > todayDate)

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
                <div className='grid grid-cols-4  gap-3 py-5 px-14'>
                    {
                        upcoming.map(upcomingMovie => <MoviesListCardComponent movieItem={upcomingMovie} key={upcomingMovie.id}/>)
                    }
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