import {useAppSelector} from "../../redux/hooks/useAppSelector.ts";
import {useAppDispatch} from "../../redux/hooks/useAppDispatch.ts";
import {useEffect} from "react";
import {movieActions} from "../../redux/movieSlice/movieSlice.ts";
import {useParams} from "react-router-dom";
import {imgBaseUrl, imgSizeUrl} from "../../constans/urls.ts";

export const MovieInfoComponent= () => {
    const {movie, error, loadState} = useAppSelector(state => state.movies);
    const {id} = useParams();
    const dispatch = useAppDispatch()
    const sizeUrl = imgSizeUrl['500']
    useEffect(() => {
        if (id) dispatch(movieActions.loadMovie(id))
    }, [id]);
    return (
        <section className='text-white'>
            {
                loadState && <div className='text-2xl'>Loading...</div>
            }
            {error && (
                <div className='text-red-500 text-xl'>
                    Error: {error}
                </div>
            )}

                {
                    movie &&
                    <div>
                    <h1 className='text-2xl'>{movie.title}</h1>
                        <img src={`${imgBaseUrl}${sizeUrl}${movie.poster_path}`} alt=""/>
                    </div>
                }

        </section>
    );
};