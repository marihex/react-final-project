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
                upcoming.length > 0 && <CCarousel controls indicators>
                    <CCarouselItem className="hero-slide">
                    <CImage className="d-block w-100  rounded-lg" src={`${imgBaseUrl}${sizeUrl}${movieCarousel[0].backdrop_path}`}
                            alt="slide 1"/>
                    <CCarouselCaption className="hero-caption">
                        <h5><Link to={`/movie/${movieCarousel[0].id}`}>{movieCarousel[0].title}</Link></h5>
                        <p>{dateFormatHelper(movieCarousel[0].release_date)}</p>
                        <p><StarIcon
                            style={{ color: 'gold' , fontSize: 15}}
                        /> {movieCarousel[0].vote_average.toFixed(1)}</p>
                    </CCarouselCaption>
                </CCarouselItem>
                    <CCarouselItem className="hero-slide">
                    <CImage className="d-block w-100 rounded-lg" src={`${imgBaseUrl}${sizeUrl}${movieCarousel[1].backdrop_path}`}
                            alt="slide 2"/>
                        <CCarouselCaption className="hero-caption">
                        <h5>{movieCarousel[1].title}</h5>
                        <p>{dateFormatHelper(movieCarousel[1].release_date)}</p>
                        <p><StarIcon
                            style={{ color: 'gold' , fontSize: 15}}
                        /> {movieCarousel[1].vote_average.toFixed(1)}</p>
                    </CCarouselCaption>
                </CCarouselItem>
                    <CCarouselItem className="hero-slide">
                    <CImage className="d-block w-100 rounded-lg" src={`${imgBaseUrl}${sizeUrl}${movieCarousel[2].backdrop_path}`}
                                alt="slide 2"/>
                        <CCarouselCaption className="hero-caption">
                            <h5>{movieCarousel[2].title}</h5>
                            <p>{dateFormatHelper(movieCarousel[2].release_date)}</p>
                            <p><StarIcon
                                style={{ color: 'gold' , fontSize: 15}}
                            /> {movieCarousel[2].vote_average.toFixed(1)}</p>
                        </CCarouselCaption>
                    </CCarouselItem>
                    <CCarouselItem className="hero-slide">
                    <CImage className="d-block w-100 rounded-lg" src={`${imgBaseUrl}${sizeUrl}${movieCarousel[3].backdrop_path}`}
                                alt="slide 2"/>
                        <CCarouselCaption className="hero-caption">
                            <h5>{movieCarousel[3].title}</h5>
                            <p>{dateFormatHelper(movieCarousel[3].release_date)}</p>
                            <p><StarIcon
                                style={{ color: 'gold' , fontSize: 15}}
                            /> {movieCarousel[3].vote_average.toFixed(1)}</p>
                        </CCarouselCaption>
                    </CCarouselItem>
                    <CCarouselItem className="hero-slide">
                    <CImage className="d-block w-100 rounded-lg" src={`${imgBaseUrl}${sizeUrl}${movieCarousel[4].backdrop_path}`}
                                alt="slide 2"/>
                        <CCarouselCaption className="hero-caption">
                            <h5>{movieCarousel[4].title}</h5>
                            <p>{dateFormatHelper(movieCarousel[4].release_date)}</p>
                            <p><StarIcon
                                style={{ color: 'gold' , fontSize: 15}}
                            /> {movieCarousel[4].vote_average.toFixed(1)}</p>
                        </CCarouselCaption>
                    </CCarouselItem>
                    <CCarouselItem className="hero-slide">
                    <CImage className="d-block w-100 rounded-lg" src={`${imgBaseUrl}${sizeUrl}${movieCarousel[5].backdrop_path}`}
                                alt="slide 2"/>
                        <CCarouselCaption className="hero-caption">
                            <h5>{movieCarousel[5].title}</h5>
                            <p>{dateFormatHelper(movieCarousel[5].release_date)}</p>
                            <p><StarIcon
                                style={{ color: 'gold' , fontSize: 15}}
                            /> {movieCarousel[5].vote_average.toFixed(1)}</p>
                        </CCarouselCaption>
                    </CCarouselItem>

            </CCarousel>
            }
        </section>
    )
}
