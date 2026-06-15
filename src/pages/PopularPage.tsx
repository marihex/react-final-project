import {useAppSelector} from "../redux/hooks/useAppSelector.ts";
import {useAppDispatch} from "../redux/hooks/useAppDispatch.ts";
import {useSearchParams} from "react-router-dom";
import {useEffect} from "react";
import {movieActions} from "../redux/movieSlice/movieSlice.ts";
import {MovieListComponentMain} from "../components/movie-list-main/MovieListComponentMain.tsx";
import PaginationComponent from "../components/pagination/PaginationComponent.tsx";
import {SortComponent} from "../components/sort-component/SortComponent.tsx";

export const PopularPage = () => {
    const {popular, error, loadState, totalPages} = useAppSelector(state => state.movies);
    const dispatch = useAppDispatch();
    const [searchParams] = useSearchParams();
    const currentPage = Number(searchParams.get("page")) || 1;
    useEffect(() => {
        dispatch(movieActions.loadPopular(currentPage))
    }, [dispatch, currentPage]);

    return (
        <main className='flex gap-5'>
            {
                loadState && <div className='text-2xl'>Loading...</div>
            }
            {error && (
                <div className='text-red-500 text-xl'>
                    Error: {error}
                </div>
            )}
            <aside className='flex flex-col gap-3'>
                <SortComponent/>
            </aside>
            <section>
                <MovieListComponentMain movies={popular}/>
                <div>
                    {
                        !loadState && totalPages > 0 && (
                            <PaginationComponent totalPages={totalPages} currentPage={currentPage}/>
                        )
                    }
                </div>
            </section>
        </main>
    );
};