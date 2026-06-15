import {useAppSelector} from "../redux/hooks/useAppSelector.ts";
import {useAppDispatch} from "../redux/hooks/useAppDispatch.ts";
import {useSearchParams} from "react-router-dom";
import {useEffect} from "react";
import {MovieListComponentMain} from "../components/movie-list-main/MovieListComponentMain.tsx";
import PaginationComponent from "../components/pagination/PaginationComponent.tsx";
import {SortComponent} from "../components/sort-component/SortComponent.tsx";
import {sortHelper} from "../config/sortHelper.ts";
import {filterActions} from "../redux/filterSlice/filterSlice.ts";

export const PopularPage = () => {
    const {sortedMovies, totalPages, loadState, error, selected} = useAppSelector(state => state.sorted)
    const dispatch = useAppDispatch();
    const [searchParams] = useSearchParams();
    const currentPage = Number(searchParams.get("page")) || 1;
    useEffect(() => {
        dispatch(filterActions.loadSortedMovies({page: currentPage, sort: selected}))
    }, [dispatch, currentPage, selected]);

    const currentItem = sortHelper.find(item => item.value === selected);
    console.log(currentItem);



    return (
        <>
            {error && (
                <div className='text-red-500 text-xl'>
                    Error: {error}
                </div>
            )}
            <main className='flex gap-5'>

                <aside className='flex flex-col gap-3'>
                    <SortComponent/>
                </aside>
                <section>
                    <h1>Popular movies</h1>
                    <MovieListComponentMain movies={sortedMovies}/>
                    <div>
                        {
                            !loadState && totalPages > 0 && (
                                <PaginationComponent totalPages={totalPages} currentPage={currentPage}/>
                            )
                        }
                    </div>
                </section>
            </main>
        </>
    );
}