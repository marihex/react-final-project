import {type ChangeEvent, type SyntheticEvent, useEffect, useRef, useState} from "react";
import {useDebounce} from "../../hooks/useDebaunce.ts";
import {useAppDispatch} from "../../redux/hooks/useAppDispatch.ts";
import {searchActions} from "../../redux/searchSlice/searchSlice.ts";
import {Link, useLocation, useNavigate} from "react-router-dom";
import {useAppSelector} from "../../redux/hooks/useAppSelector.ts";
import './search-bar-style.css';
import {useClickOutside} from "../../hooks/useClickOutside.ts";

export const HeaderSearchComponent = () => {
    const {suggestions, query, noResults, loadState} = useAppSelector(state => state.search);
    const debouncedValue = useDebounce<string>(query, 500);
    const [searchIsOpen, setSearchIsOpen] = useState(false);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const searchRef = useRef<HTMLUListElement>(null);

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
    useClickOutside(searchRef, () => {
        setTimeout(() => setSearchIsOpen(false), 50);
    })



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
        searchIsOpen &&
        suggestions.length > 0 &&
        !noResults &&
        query.trim().length > 0;

    const showNoResults =
        noResults &&
        !loadState &&
        query.trim().length > 0;

    return (
        <>

            <div className="search">
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        value={query}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => {
                            dispatch(searchActions.setQuery(e.target.value));
                            setSearchIsOpen(true);
                        }}
                        placeholder="Search movie..."
                        className="search__input"

                    />
                </form>

                {showNoResults && (
                    <div className="search__dropdown search__empty">
                        No movies found 😢
                    </div>
                )}

                {showSuggestions && (
                    <ul className="search__dropdown" ref={searchRef}>
                        {suggestions.map(movie => (
                            <li key={movie.id}>
                                <Link
                                    className="search__item"
                                    onClick={() => dispatch(searchActions.clearSuggestions())}
                                    to={`/search?query=${encodeURIComponent(movie.title.toLowerCase())}&page=1`}
                                >
                                    {movie.title}
                                </Link>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </>
    );
};