import {useAppSelector} from "../../redux/hooks/useAppSelector.ts";
import {useAppDispatch} from "../../redux/hooks/useAppDispatch.ts";
import {useEffect} from "react";
import {genreActions} from "../../redux/genreSlice/genreSlice.ts";
// import {useParams} from "react-router-dom";

export const GenresComponent = () => {
    // const {id} = useParams();
    const {genres, loadState, error} = useAppSelector(state => state.genres)
    // const genre = genres && genres.find(genre => genre.id === Number(id))
    // const genreName = genre ? genre.name : 'Loading...';
    const dispatch = useAppDispatch()
    useEffect(() => {

        dispatch(genreActions.loadGenres())
    }, [dispatch])

    return (
        <section>
            {
                loadState && <div className='text-2xl'>Loading...</div>
            }
            {error && (
                <div className='text-red-500 text-xl'>
                    Error: {error}
                </div>
            )}
            <div className='genres'>
                {genres && (
                    <ul>
                        {genres.map(genre => (<li key={genre.id}>{genre.name}</li>))}
                    </ul>
                )
                }
            </div>
        </section>
    );
};