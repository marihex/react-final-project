import type {FC} from "react";
import type {IMovieCardModel} from "../../models/IMovieCardModel.ts";
import {imgBaseUrl, imgSizeUrl} from "../../constans/urls.ts";
import {Link} from "react-router-dom";

type MovieProps = {
    movieItem: IMovieCardModel
}

export const MoviesListCardComponent: FC <MovieProps> = ({movieItem}) => {
    const sizeUrl = imgSizeUrl["92"];
    return (
        <div className='text-white'>
            <img src={`${imgBaseUrl}${sizeUrl}${movieItem.poster_path}`} alt={movieItem.title}/>
            <Link to={`/movie/${movieItem.id}`}>{movieItem.title}</Link>
            <span>{movieItem.release_date}</span>
        </div>
    );
};