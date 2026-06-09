import {Link} from "react-router-dom";
import {useAppSelector} from "../../redux/hooks/useAppSelector.ts";
import {useAppDispatch} from "../../redux/hooks/useAppDispatch.ts";
import {useEffect, useState, useRef} from "react";
import {useClickOutside} from "../../hooks/useClickOutside.ts";
import {genreActions} from "../../redux/genreSlice/genreSlice.ts";
import './header-styles.css'

export const MenuComponent = () => {
    const {genres} = useAppSelector(state => state.genres);
    const dispatch = useAppDispatch();
    const [movieIsOpen, setMovieIsOpen] = useState(false);
    const [genreIsOpen, setGenreIsOpen] = useState(false);
    const menuRef = useRef<HTMLUListElement>(null);
    useClickOutside(menuRef, () => {
        setTimeout(() => setMovieIsOpen(false), 50);
    })
    useClickOutside(menuRef, () => {
        setTimeout(() => setGenreIsOpen(false), 50)
    })


    useEffect(() => {
         dispatch(genreActions.loadGenres())
    },[dispatch]);

    return (
        <div className='menu'>
            <nav className='movies__nav'>
            <button className='movies__bnt' onClick={() => setMovieIsOpen(!movieIsOpen)}>Movies</button>
                <ul className={`movies__list ${movieIsOpen ? 'active' : ''}`} ref={menuRef}>
                    <li className="movie__item"><Link to={'/popular'}>Popular</Link></li>
                    <li className="movie__item"><Link to={'/upcoming'}>Upcoming</Link></li>
                    <li className="movie__item"><Link to={'/trending'}>Trending</Link></li>
                </ul>
            </nav>

            <nav className='genres__nav'>
                <button className='genres__btn' onClick={() => setGenreIsOpen(!genreIsOpen)}>Genres</button>
                <ul className={`genres__list ${genreIsOpen ? 'active' : ''}`} ref={menuRef}>
                    {
                        genres && genres.map(genre => (<li key={genre.id} className='genres__item'><Link to={`/movie/genre/${genre.id}`}>{genre.name}</Link></li>))
                    }
                </ul>
            </nav>

        </div>

    );
};