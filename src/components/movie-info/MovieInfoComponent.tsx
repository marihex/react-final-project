import {useAppSelector} from "../../redux/hooks/useAppSelector.ts";
import {useAppDispatch} from "../../redux/hooks/useAppDispatch.ts";
import {useEffect} from "react";
import {movieActions} from "../../redux/movieSlice/movieSlice.ts";
import {Link, useParams} from "react-router-dom";
import {imgSizeUrl} from "../../config/urls.ts";
import {Chip, Rating} from "@mui/material";
import {StarBorder} from "@mui/icons-material";
import {PosterComponent} from "../poster/PosterComponent.tsx";
import './movie-info-style.css'
import {dateFormatHelper} from "../../config/dateFormatHelper.ts";
import {convertMinutesToHM} from "../../config/minutesConvertHelper.ts";
import {getReleaseDateForRegion} from "../../config/movieReleaseHelper.ts";
import {CarouselSmall} from "../carousel/CarouselSmall.tsx";
import PublicIcon from '@mui/icons-material/Public';

export const MovieInfoComponent = () => {
    const {movie, error, loadState, similar, recommendations} = useAppSelector(state => state.movies);
    const {id} = useParams();
    const dispatch = useAppDispatch()
    const sizeUrl = imgSizeUrl['342'];
    useEffect(() => {
        if (id) dispatch(movieActions.loadMovie(id));
    }, [id]);
    useEffect(() => {
        if (id) dispatch(movieActions.loadSimilarMovies({
            id: id,
            page: 1
        }));
    }, [id]);
    useEffect(() => {
        if (id) dispatch(movieActions.loadRecommendations({
            id: id,
            page: 1
        }));
    }, [id]);

    const backdropUrl = `https://image.tmdb.org/t/p/original${movie?.backdrop_path}`;
    const releaseDateRaw = movie && getReleaseDateForRegion(movie, 'UA');
    const finalReleaseDate = releaseDateRaw || movie && movie.release_date;
    const regionLabel = releaseDateRaw ? "(UA)" : '(Worldwide)';

    return (
        <>
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
                    <div className='movie__container'
                         style={{
                             backgroundImage: movie?.backdrop_path
                                 ? `linear-gradient(to top, rgba(15, 23, 42, 1), rgba(15, 23, 42, 0.4)), url(${backdropUrl})`
                                 : 'none'
                         }}>

                        <div className='movie__card'>
                            {movie.poster_path ?
                                <PosterComponent size={sizeUrl} endpoint={movie.poster_path}
                                                 movieTitle={movie.title}/> :
                                <img src="../../../public/images/NoPosterAvailable.jpg" alt=""
                                     className='w-[342px] h-[513px]'/>
                            }
                            <div className='movie__info'>
                                <div className='mb-2'>
                                    <h1 className='movie__title'>{movie.title}</h1>

                                    <div className='text-sm flex'>
                                        <span
                                            className='movie__release'>{dateFormatHelper(finalReleaseDate || "")} {regionLabel}</span>
                                        {movie.runtime > 0 && (
                                            <span className='ml-4'> {convertMinutesToHM(movie.runtime)}</span>)}
                                    </div>
                                </div>
                                <div className='movies__genres'>
                                    {
                                        movie.genres.map(genre => <Chip key={genre.id}
                                                                        label={genre.name}
                                                                        component="a"
                                                                        href={`/movie/genre/${genre.id}`}
                                                                        variant="outlined"
                                                                        color="primary"
                                                                        clickable
                                                                        sx={{
                                                                            '&.MuiChip-root:hover': {
                                                                                bgcolor: "dimgray",
                                                                            },
                                                                            '&.MuiChip-root': {
                                                                                bgcolor: 'darkslategrey',
                                                                                color: 'white'
                                                                            }
                                                                        }}


                                        />)
                                    }

                                </div>

                                {movie.vote_average > 0 ?

                                    (<div className='movie__rating'>
                                        <span className='rating__average'>{movie.vote_average.toFixed(1)}/10</span>
                                        <Rating name="half-rating-read"
                                                defaultValue={movie.vote_average / 2}
                                                precision={0.5}
                                                readOnly
                                                size="small"
                                                emptyIcon={<StarBorder fontSize="inherit" style={{color: 'white'}}/>}

                                        />
                                        <span className='text-sm opacity-60'>({movie.vote_count})</span>
                                    </div>) : ''}

                                <p className='movie__tagline'>{movie.tagline}</p>
                                <div className='mt-4'>
                                    <h2>Overview</h2>
                                    <p>
                                        {movie.overview}
                                    </p>
                                </div>

                            </div>
                        </div>
                    </div>
                }
            </section>
            <section className='production__section'> {
                movie &&
                <div className='production__info flex gap-5'>
                    {movie.budget ? <span><span className='font-bold'>Budget:</span> ${movie.budget}</span> : ''}
                    {movie.revenue ? <span><span className='font-bold'>Revenue</span>: ${movie.revenue}</span> : ''}
                    <span><span className='font-bold'>Status:</span> {movie.status}</span>
                    <div><span className='font-bold'>Country:</span> {
                        movie.origin_country.map(country => <span className='mr-1'>{country},</span> )
                       }</div>

                    <span className='flex items-center gap-1'> <PublicIcon fontSize='small'/><Link
                        to={movie.homepage}>Homepage</Link></span>

                </div>
            }
            </section>
            <section className='movie__recommendation'>
                { movie &&
                    <div className='movie__carousel'>
                        {similar.length > 0 ? <CarouselSmall movies={similar}
                                        movieCategory={`If you liked ${movie.title}, you might also like...`}
                                        endpoint={'/'}/> : []}
                        {recommendations.length > 0 ?
                            <CarouselSmall movies={recommendations} movieCategory={'Also Recommended'}
                                        endpoint={'/'}/> : []
                        }
                    </div>}
            </section>
        </>
    );
};