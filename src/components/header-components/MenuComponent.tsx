import {Link} from "react-router-dom";
import {useAppSelector} from "../../redux/hooks/useAppSelector.ts";
import {useAppDispatch} from "../../redux/hooks/useAppDispatch.ts";
import {useEffect} from "react";
import {genreActions} from "../../redux/genreSlice/genreSlice.ts";

export const MenuComponent = () => {
    const {genres} = useAppSelector(state => state.genres);
    const dispatch = useAppDispatch();
        
    
    
    useEffect(() => {
         dispatch(genreActions.loadGenres())
    },[dispatch]);

    return (
        <div className='flex gap-5'>
            <div className='group relative'>
                <h2>Movies</h2>
                <ul className='hidden group-hover:block absolute top-full left-0 right-0 bg-gray-600 text-gray-400 w-32'>
                    <li><Link to={'/popular'}>Popular</Link></li>
                    <li><Link to={'/upcoming'}>Upcoming</Link></li>
                    <li><Link to={'/trending'}>Trending</Link></li>
                </ul>
            </div>
            <div className='group relative'>
                <h2>Genres</h2>
                <ul className=' grid-cols-3 gap-2 hidden group-hover:grid absolute top-full bg-gray-600 text-gray-400 w-96'>
                    {
                        genres && genres.map(genre => (
                            <li key={genre.id}><Link to={`/movie/genre/${genre.id}`}>{genre.name}</Link></li>
                        ))
                    }
                </ul>
            </div>
        </div>

    );
};