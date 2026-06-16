import {useAppSelector} from "../../redux/hooks/useAppSelector.ts";
import {useAppDispatch} from "../../redux/hooks/useAppDispatch.ts";
import {useEffect} from "react";
import {movieActions} from "../../redux/movieSlice/movieSlice.ts";
import {Link, useSearchParams} from "react-router-dom";
import {MoviesListCardComponent} from "../movie-list-card/MoviesListCardComponent.tsx";
import PaginationComponent from "../pagination/PaginationComponent.tsx";

export const SearchComponent = () => {
    const {search, totalPages, loadState, noResults} = useAppSelector(state => state.movies);
    const dispatch = useAppDispatch();

    const [searchParams] = useSearchParams();

    const query = searchParams.get("query") || "";
    const currentPage = Number(searchParams.get("page")) || 1;


    useEffect(() => {
        if (!query.trim()) return;

        dispatch(
            movieActions.loadSearchMovie({
                query,
                page: currentPage,
            })
        );
    }, [dispatch, query, currentPage]);

    return (
        <div className='search-component'>
            <div className="flex flex-col gap-10 items-center mt-5 pb-5">
                {
                    noResults && !loadState && (
                        <div className="text-center mt-10 text-gray-400">
                            No movies found 😢
                        </div>
                    )
                }
                    {!!search.length && (
                        <div className="grid grid-cols-4 gap-5 px-20">
                            {search.map(movie => (
                                <Link to={`/movie/${movie.id}`}><MoviesListCardComponent
                                    key={movie.id}
                                    movieItem={movie}
                                /></Link>
                            ))}
                        </div>
                    )}

                <div>
                    {!loadState && totalPages && search.length > 0 && (
                        <PaginationComponent
                            totalPages={totalPages}
                            currentPage={currentPage}
                        />
                    )}
                </div>
            </div>
        </div>
    )
}

