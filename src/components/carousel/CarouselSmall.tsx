import {type FC, useState} from "react";
import type {IMovieCardModel} from "../../models/IMovieCardModel.ts";
import {MoviesListCardComponent} from "../movie-list-card/MoviesListCardComponent.tsx";
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import './small-carousel-style.css'
import {useNavigate} from "react-router-dom";

type SmallCarouselProps = {
    movies: IMovieCardModel [];
    movieCategory: string;
    endpoint: string
}

export const CarouselSmall: FC<SmallCarouselProps> = ({movies, movieCategory, endpoint}) => {
    const [firstIndex, setFirstIndex] = useState<number>(0);
    const moviesSliced = movies.slice(0, 18);
    const navigate = useNavigate();

    const lastIndex = firstIndex + 6;
    const moviesForCarousel = moviesSliced.slice(firstIndex, lastIndex);
    console.log(`${firstIndex} first index`);
    const clickHandler = () => {
        setFirstIndex(firstIndex + 6)
    }
    const clickBackHandler = () => {
        setFirstIndex(firstIndex - 6)
    }

    const seeAllHandle = () => {
        navigate(endpoint)
    }

    return (
        <div className='carousel-sm__container'>
            <div className='carousel-sm__nav'>
                <h2>{movieCategory}</h2>
                <div className='flex gap-3'>
                    {
                    firstIndex > 5 &&
                    <button onClick={() => clickBackHandler()}><KeyboardBackspaceIcon fontSize={"small"}/> Back</button>

                }
                    {lastIndex < movies.length - 6 ? (
                            <button onClick={() => clickHandler()} className='carousel-sm__btn'>More<ArrowRightAltIcon
                                fontSize={"small"}/>
                            </button>) :
                        <button onClick={() => seeAllHandle()}>See all <ArrowRightAltIcon fontSize={"small"}/></button>
                    }</div>

            </div>

            <div className='carousel-sm'>
                {
                    moviesForCarousel.map(movie => <MoviesListCardComponent movieItem={movie} key={movie.id}/>)
                }
            </div>

        </div>
    );
};