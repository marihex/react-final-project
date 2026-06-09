import { CCarousel, CCarouselCaption, CCarouselItem, CImage } from '@coreui/react'
import {useAppSelector} from "../../redux/hooks/useAppSelector.ts";
import {useAppDispatch} from "../../redux/hooks/useAppDispatch.ts";
import {useEffect} from "react";
import {movieActions} from "../../redux/movieSlice/movieSlice.ts";
import {imgBaseUrl, imgSizeUrl} from "../../config/urls.ts";
import {dateFormatHelper} from "../../config/dateFormatHelper.ts";
import StarIcon from "@mui/icons-material/Star";
import './carousel.css'
import {Link} from "react-router-dom";


export const CarouselComponent = () => {
    const {upcoming} = useAppSelector(state => state.movies);
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(movieActions.loadUpcoming(1))
    }, []);
    const movieCarousel = upcoming.slice(0,6)
    const sizeUrl = imgSizeUrl["original"];
    return (
        <section className='w-[60%] m-auto pt-4 overflow-hidden  rounded-lg'>
            {
                upcoming.length > 0 &&
                <CCarousel controls indicators>
                    {movieCarousel.map(movie =>
                        <CCarouselItem className="hero-slide">
                            <CImage className="d-block w-100  rounded-lg" src={`${imgBaseUrl}${sizeUrl}${movie.backdrop_path}`}
                                    alt="slide 1"/>
                            <CCarouselCaption className="hero-caption">
                                <h5><Link to={`/movie/${movie.id}`}>{movie.title}</Link></h5>
                                <p>{dateFormatHelper(movie.release_date)}</p>
                                <p><StarIcon
                                    style={{ color: 'gold' , fontSize: 15}}
                                /> {movie.vote_average.toFixed(1)}</p>
                            </CCarouselCaption>
                        </CCarouselItem>
                    )}
            </CCarousel>
            }
        </section>
    )
}
