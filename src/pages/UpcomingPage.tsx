import {useAppSelector} from "../redux/hooks/useAppSelector.ts";
import {useAppDispatch} from "../redux/hooks/useAppDispatch.ts";
import {useSearchParams} from "react-router-dom";
import {useEffect} from "react";
import {MovieListComponentMain} from "../components/movie-list-main/MovieListComponentMain.tsx";
import {filterActions} from "../redux/sortSlice/sortSlice.ts";
import {SortComponent} from "../components/sort-component/SortComponent.tsx";
import './movies-page-styles.css'

export const UpcomingPage = () => {
    const {sortedUpcoming,selected, error, loadState, totalPages} = useAppSelector(state => state.sorted);
    const dispatch = useAppDispatch();
    const [searchParams] = useSearchParams();
    const currentPage = Number(searchParams.get("page")) || 1;
    useEffect(() => {dispatch(filterActions.loadSortedUpcoming({page: currentPage, sort: selected}))},[dispatch, currentPage, selected ]);


    return (
        <main className='movies__main'>
            {error && (
                <div className='text-red-500 text-xl'>
                    Error: {error}
                </div>
            )}

            <h1 className='movies__title'>Upcoming movies</h1>

            <section className='movies__content'>
                <aside  className='sort__container'>
                    <SortComponent/>
                </aside>
                <div>
                    <MovieListComponentMain movies={sortedUpcoming} totalPages={totalPages} currentPage={currentPage} loadState={loadState} />
                </div>

            </section>
        </main>
    );
};