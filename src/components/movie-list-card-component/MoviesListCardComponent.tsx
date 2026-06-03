import type {FC} from "react";
import type {IMovieCardModel} from "../../models/IMovieCardModel.ts";
import {imgBaseUrl, imgSizeUrl} from "../../constans/urls.ts";

type MovieProps = {
    movieItem: IMovieCardModel
}

export const MoviesListCardComponent: FC <MovieProps> = ({movieItem}) => {
    const sizeUrl = imgSizeUrl["92"];
    return (
        <div>
            <img src={`${imgBaseUrl}${sizeUrl}${movieItem.poster_path}`} alt={movieItem.title}/>
            <span>{movieItem.title}</span>
            <span>{movieItem.release_date}</span>
        </div>
    );
};