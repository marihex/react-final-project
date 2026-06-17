import {type FC} from "react";
import {MoviesListCardComponent} from "../movie-list-card/MoviesListCardComponent.tsx";
import type {IMovieCardModel} from "../../models/IMovieCardModel.ts";
import PaginationComponent from "../pagination/PaginationComponent.tsx";
import {Link} from "react-router-dom";

type MoviesListProps = {
    movies: IMovieCardModel[],
    totalPages: number,
    currentPage: number,
    loadState: boolean
}

export const MovieListComponentMain: FC<MoviesListProps> = ({movies, totalPages, currentPage, loadState}) => {
    return (

        <div className='flex flex-col items-center gap-4'>
            <div className='grid grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 justify-items-center'>
                {
                    movies.map(movie => <Link to={`/movie/${movie.id}`}><MoviesListCardComponent
                        movieItem={movie}
                        key={movie.id}/></Link>)
                }
            </div>
            <div className='pagination'>
                {
                    !loadState && totalPages > 0 && (
                        <PaginationComponent totalPages={totalPages} currentPage={currentPage}/>
                    )
                }
            </div>
        </div>
    );
};