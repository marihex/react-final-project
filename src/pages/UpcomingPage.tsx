import {useAppSelector} from "../redux/hooks/useAppSelector.ts";
import {useAppDispatch} from "../redux/hooks/useAppDispatch.ts";
import {useSearchParams} from "react-router-dom";
import {useEffect} from "react";
import PaginationComponent from "../components/pagination/PaginationComponent.tsx";
import {MovieListComponentMain} from "../components/movie-list-main/MovieListComponentMain.tsx";
import {filterActions} from "../redux/filterSlice/filterSlice.ts";
import {SortComponent} from "../components/sort-component/SortComponent.tsx";

export const UpcomingPage = () => {
    const {sortedUpcoming,selected, error, loadState, totalPages} = useAppSelector(state => state.sorted);
    const dispatch = useAppDispatch();
    const [searchParams] = useSearchParams();
    const currentPage = Number(searchParams.get("page")) || 1;
    useEffect(() => {dispatch(filterActions.loadSortedUpcoming({page: currentPage, sort: selected}))},[dispatch, currentPage, selected ]);


    return (
        <main className='text-white flex gap-5'>
            {error && (
                <div className='text-red-500 text-xl'>
                    Error: {error}
                </div>
            )}

            <aside  className='flex flex-col gap-2'>
                <SortComponent/>
            </aside>
            <section>
                <h1>Upcoming movies</h1>
                <div>
                    <MovieListComponentMain movies={sortedUpcoming}/>
                </div>
                <div>
                    {
                        !loadState && totalPages > 1 && (
                            <PaginationComponent totalPages={totalPages} currentPage={currentPage}/>
                        )
                    }
                </div>
            </section>
        </main>
    );
};