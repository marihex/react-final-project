import {type ChangeEvent, type SyntheticEvent, useEffect} from "react";
import {useDebounce} from "../../hooks/useDebaunce.ts";
import {useAppDispatch} from "../../redux/hooks/useAppDispatch.ts";
import {searchActions} from "../../redux/searchSlice/searchSlice.ts";
import {Link, useLocation, useNavigate} from "react-router-dom";
import {useAppSelector} from "../../redux/hooks/useAppSelector.ts";

export const HeaderSearchComponent = () => {
    const {suggestions, query, noResults, loadState} = useAppSelector(state => state.search);
    const debouncedValue = useDebounce<string>(query, 500);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (!debouncedValue.trim()) return;

        dispatch(
            searchActions.loadSuggestions(debouncedValue)
        )

    }, [debouncedValue, dispatch])

    useEffect(() => {

        dispatch(searchActions.clearSuggestions());

    }, [location.pathname, dispatch]);

    useEffect(() => {
        if (!location.pathname.startsWith('/search')) {
            dispatch(searchActions.clearSearch())
        }
    }, [location.pathname, dispatch]);



    const handleSubmit = (e: SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();
        const trimmed = query.trim()
        if (!trimmed) return;

        navigate(
            `/search?query=${encodeURIComponent(query)}&page=1`
        );

        dispatch(searchActions.clearSuggestions());
    }

    const showSuggestions =
        suggestions.length > 0 &&
        !noResults &&
        query.trim().length > 0;

    const showNoResults =
        noResults &&
        !loadState &&
        query.trim().length > 0;

    return (
        <>

            <div className='relative'>
                <form onSubmit={handleSubmit}>
                    <input type="text"
                           value={query}
                           onChange={(e: ChangeEvent<HTMLInputElement>) => dispatch(searchActions.setQuery(e.target.value))}
                           placeholder='Search Movie...'
                           className="p-2 bg-gray-600 rounded-lg w-96"

                    />
                </form>
                {
                    showNoResults && (
                        <div className="absolute top-full left-0 right-0 bg-gray-600 text-gray-400">
                            No movies found 😢
                        </div>
                    )
                }
                {
                    showSuggestions && (
                        <ul className='absolute top-full left-0 right-0 bg-gray-600'>
                            {
                                suggestions.map(movie => (

                                    <li key={movie.id}>
                                        <Link
                                            onClick={() => dispatch(searchActions.clearSuggestions())}
                                            to={`/search?query=${encodeURIComponent(movie.title.toLowerCase())}&page=1`}
                                        >
                                        {movie.title}
                                    </Link>
                                    </li>

                                ))
                            }
                        </ul>
                    )
                }
            </div>
        </>
    );
};