import type {FC} from "react";
import type {IMovieCardModel} from "../../models/IMovieCardModel.ts";
import {imgBaseUrl, imgSizeUrl} from "../../config/urls.ts";
import {Link} from "react-router-dom";
import {dateFormatHelper} from "../../config/dateFormatHelper.ts";
import './movie-card-style.css'
import StarIcon from '@mui/icons-material/Star';
import FavoriteBorderSharpIcon from '@mui/icons-material/FavoriteBorderSharp';

type MovieProps = {
    movieItem: IMovieCardModel
}

export const MoviesListCardComponent: FC<MovieProps> = ({movieItem}) => {
    const sizeUrl = imgSizeUrl["185"];

    return (

        <article className='movie-card'>
            <div className='movie-card__img'>
                <div  className='movie-card__favorite'><FavoriteBorderSharpIcon
                sx={{'&:hover':{color: 'darkred'}}
                }
                /></div>
                {
                movieItem.poster_path ?
                    <img src={`${imgBaseUrl}/${sizeUrl}${movieItem.poster_path}`} alt={`${movieItem.title} ${sizeUrl} poster`} className='rounded-lg h-[278px] w-[185px]'/> :
                    <img src="../../../public/images/NoPosterAvailable.jpg" alt="" className='movie-card__no-poster'/>
            }</div>

            <div className='movie-card__info'>
                <div className='movie-card__rating'>
                    <StarIcon
                        style={{ color: 'gold' , fontSize: 15}}
                    />
                    <span className='movie-card__ratingCount'>{movieItem.vote_average.toFixed(1)}</span>
                </div>
                <Link to={`/movie/${movieItem.id}`} className='movie-card__title line-clamp-2'>{movieItem.title}</Link>
                <span className='movie-card__release'>{dateFormatHelper(movieItem.release_date)}</span>
            </div>
        </article>
    );
};