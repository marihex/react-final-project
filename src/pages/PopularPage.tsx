import {useAppSelector} from "../redux/hooks/useAppSelector.ts";
import {useAppDispatch} from "../redux/hooks/useAppDispatch.ts";
import {useSearchParams} from "react-router-dom";
import {useEffect} from "react";
import {MovieListComponentMain} from "../components/movie-list-main/MovieListComponentMain.tsx";
import {SortComponent} from "../components/sort-component/SortComponent.tsx";
import {sortHelper} from "../config/sortHelper.ts";
import {filterActions} from "../redux/filterSlice/filterSlice.ts";
import './movies-page-styles.css'

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
            <main className='movies__main'>

                <h1 className='movies__title'>Popular movies</h1>
               
                <section className='movies__content'>
                    <aside className='sort__container'>
                        <SortComponent/>
                    </aside>
                    <div>
                        <MovieListComponentMain movies={sortedMovies} totalPages={totalPages} currentPage={currentPage} loadState={loadState} />
                    </div>
                </section>
            </main>
        </>
    );
}