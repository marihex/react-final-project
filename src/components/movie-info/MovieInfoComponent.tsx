import {useAppSelector} from "../../redux/hooks/useAppSelector.ts";
import {useAppDispatch} from "../../redux/hooks/useAppDispatch.ts";
import {useEffect} from "react";
import {movieActions} from "../../redux/movieSlice/movieSlice.ts";
import {Link, useParams} from "react-router-dom";
import {imgSizeUrl} from "../../config/urls.ts";
import {Chip, Rating} from "@mui/material";
import {StarBorder} from "@mui/icons-material";
import PublicIcon from '@mui/icons-material/Public';
import {PosterComponent} from "../poster/PosterComponent.tsx";
import './movie-info-style.css'
import {dateFormatHelper} from "../../config/dateFormatHelper.ts";
import {convertMinutesToHM} from "../../config/minutesConvertHelper.ts";
import {getReleaseDateForRegion} from "../../config/movieReleaseHelper.ts";

export const MovieInfoComponent = () => {
    const {movie, error, loadState} = useAppSelector(state => state.movies);
    const {id} = useParams();
    const dispatch = useAppDispatch()
    const sizeUrl = imgSizeUrl['342'];
    useEffect(() => {
        if (id) dispatch(movieActions.loadMovie(id))
    }, [id]);



    return (
        <section className='movie__section'>
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
                <div className='movie__container'>

                    {movie.poster_path ?
                        <PosterComponent size={sizeUrl} endpoint={movie.poster_path} movieTitle={movie.title}/> :
                        <img src="../../../public/images/NoPosterAvailable.jpg" alt="" className='w-[342px] h-[513px]'/>
                    }
                    <div className='movie__info'>
                        <h1 className='movie__title'>{movie.title}</h1>

                        <div className='text-sm flex gap-4'><span>{dateFormatHelper(getReleaseDateForRegion(movie, 'UA'))} (UA)</span>
                            {movie.runtime > 0 && (<span> {convertMinutesToHM(movie.runtime)}</span>)}</div>
                        <div className='movies__genres'>
                            {
                                movie.genres.map(genre => <Chip
                                    label={genre.name}
                                    component="a"
                                    href={`/movie/genre/${genre.id}`}
                                    variant="outlined"
                                    color="primary"
                                    clickable
                                    sx={{
                                        '&.MuiChip-root:hover': {
                                            bgcolor: "darkgray",
                                        }
                                    }}


                                />)
                            }

                        </div>

                            { movie.vote_average > 0 ?

                            (<div className='movie__rating'>
                                <span className='rating__average'>{movie.vote_average.toFixed(1)}/10</span>
                                <Rating name="half-rating-read"
                                        defaultValue={movie.vote_average / 2}
                                        precision={0.5}
                                        readOnly
                                        size="small"
                                        emptyIcon={<StarBorder fontSize="inherit" style={{color: 'white'}}/>}

                                />
                                <span className='text-sm opacity-60'>{movie.vote_count}</span>
                            </div>) : ''}

                        <p className='movie__tagline'>{movie.tagline}</p>
                        <div>
                            <h2>Overview</h2>
                            <p>
                                {movie.overview}
                            </p>
                        </div>
                        <div>
                            <span>Budget: ${movie.budget}</span>
                            <span className='flex items-center gap-1'> <PublicIcon fontSize='small'/><Link to={movie.homepage}>Homepage</Link></span>

                        </div>
                    </div>



                </div>
            }

        </section>
    );
};