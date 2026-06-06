import type {FC} from "react";
import type {IMovieCardModel} from "../../models/IMovieCardModel.ts";
import {imgBaseUrl, imgSizeUrl} from "../../config/urls.ts";
import {Link} from "react-router-dom";
import {dateFormatHelper} from "../../config/dateFormatHelper.ts";

type MovieProps = {
    movieItem: IMovieCardModel
}

export const MoviesListCardComponent: FC <MovieProps> = ({movieItem}) => {
    const sizeUrl = imgSizeUrl["92"];
    return (
        <div className='text-white w-60'>
            <img src={`${imgBaseUrl}${sizeUrl}${movieItem.poster_path}`} alt={'poster'}/>
            <div className=' flex flex-col gap-0.5'>
                <Link to={`/movie/${movieItem.id}`} className='w-3/4'>{movieItem.title}</Link>
                <span className='text-xs text-gray-400'>{dateFormatHelper(movieItem.release_date)}</span>
            </div>
        </div>
    );
};