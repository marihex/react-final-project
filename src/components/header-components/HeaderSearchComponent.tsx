import {type ChangeEvent, type SyntheticEvent, useEffect, useState} from "react";
import {useDebounce} from "../../hooks/useDebaunce.ts";
import {useAppDispatch} from "../../redux/hooks/useAppDispatch.ts";
import {searchActions} from "../../redux/searchSlice/searchSlice.ts";
import {Link, useLocation, useNavigate} from "react-router-dom";
import {useAppSelector} from "../../redux/hooks/useAppSelector.ts";

export const HeaderSearchComponent = () => {
    const {suggestion} = useAppSelector(state => state.search);
    const [value, setValue] = useState('');
    const debouncedValue = useDebounce(value, 300);
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



    const handleSubmit = (e: SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();
        const trimmed = value.trim()
        if (!trimmed) return;

        navigate(
            `/search?query=${encodeURIComponent(value)}&page=1`
        );

        dispatch(searchActions.clearSuggestions());
    }


    return (
        <>
            <div className='relative'>
                <form onSubmit={handleSubmit}>
                    <input type="text"
                           value={value}
                           onChange={(e: ChangeEvent<HTMLInputElement>) => setValue(e.target.value)}
                           placeholder='Search Movie...'
                           className="p-2 bg-gray-600 rounded-lg w-96"

                    />
                </form>


                {
                    suggestion.length > 0 && (
                        <ul className='absolute top-full left-0 right-0'>
                            {
                                suggestion.map(movie => (

                                    <li key={movie.id}>
                                        <Link
                                            onClick={() => dispatch(searchActions.clearSuggestions())}
                                            to={`/search?query=${encodeURIComponent(value)}&page=1`}
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