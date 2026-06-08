import {useAppSelector} from "../../redux/hooks/useAppSelector.ts";
import {useAppDispatch} from "../../redux/hooks/useAppDispatch.ts";
import {useEffect} from "react";
import {movieActions} from "../../redux/movieSlice/movieSlice.ts";
import {useParams} from "react-router-dom";
import {imgSizeUrl} from "../../config/urls.ts";
import {Chip, Rating} from "@mui/material";
import {StarBorder} from "@mui/icons-material";
import {PosterComponent} from "../poster/PosterComponent.tsx";

export const MovieInfoComponent= () => {
    const {movie, error, loadState} = useAppSelector(state => state.movies);
    const {id} = useParams();
    const dispatch = useAppDispatch()
    const sizeUrl = imgSizeUrl['342'];
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

                        {movie.poster_path ?   <PosterComponent size={sizeUrl} endpoint={movie.poster_path} movieTitle={movie.title}/> :
                            <img src="../../../public/images/NoPosterAvailable.jpg" alt="" className='w-[342px] h-[513px]'/>
                        }


                        <div className='flex gap-2'>
                            {
                                movie.genres.map(genre => <Chip
                                    label={genre.name}
                                    component="a"
                                    href={`/movie/genre/${genre.id}`}
                                    variant="outlined"
                                    color="primary"
                                    clickable
                                    sx={{ '&.MuiChip-root:hover':  {
                                            bgcolor: "darkgray",
                                    } }}



                                />)
                            }

                        </div>
                        <div>
                            <Rating name="half-rating-read"
                                    defaultValue={movie.vote_average/2}
                                    precision={0.5}
                                    readOnly
                                    size="small"
                                    emptyIcon={<StarBorder fontSize="inherit"  style={{ color: 'white' }}/>}

                            />
                        </div>

                    </div>
                }

        </section>
    );
};