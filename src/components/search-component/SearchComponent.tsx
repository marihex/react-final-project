import {useAppSelector} from "../../redux/hooks/useAppSelector.ts";
import {useAppDispatch} from "../../redux/hooks/useAppDispatch.ts";
import {useEffect, useState} from "react";
import {movieActions} from "../../redux/movieSlice/movieSlice.ts";
import {useSearchParams} from "react-router-dom";
import {MoviesListCardComponent} from "../movie-list-card/MoviesListCardComponent.tsx";
import PaginationComponent from "../pagination/PaginationComponent.tsx";
import {useDebounce} from "../../hooks/useDebaunce.ts";

export const SearchComponent = () => {
    const {search, totalPages, loadState} = useAppSelector(state => state.movies);
    const dispatch = useAppDispatch();

    const [searchParams, setSearchParams] = useSearchParams();

    const query = searchParams.get("query") || "";
    const currentPage = Number(searchParams.get("page")) || 1;

    const [value, setValue] = useState(
        () => searchParams.get("query") || ""
    );

    const debouncedValue = useDebounce(value, 500);

    useEffect(() => {
        const trimmedValue = debouncedValue.trim();

        if (!trimmedValue) {
            setSearchParams({});
            return;
        }

        if (trimmedValue !== query) {
            setSearchParams({
                query: trimmedValue,
                page: "1",
            });
        }
    }, [debouncedValue, query, setSearchParams]);

    useEffect(() => {
        if (!query) return;

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
                <form className="w-96"
                      onSubmit={(e) => e.preventDefault()}
                >
                    <input
                        type="text"
                        value={value}
                        placeholder='Search Movie...'
                        onChange={(event) => setValue(event.target.value)}
                        className="p-2 bg-gray-600 rounded-lg w-96"
                    />
                </form>

                    {!!search.length && (
                        <div className="grid grid-cols-4 gap-5 px-20">
                            {search.map(movie => (
                                <MoviesListCardComponent
                                    key={movie.id}
                                    movieItem={movie}
                                />
                            ))}
                        </div>
                    )}

                <div>
                    {!loadState && totalPages && search.length > 1 && (
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

