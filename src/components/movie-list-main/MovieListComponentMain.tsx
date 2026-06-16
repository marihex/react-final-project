import {type FC} from "react";
import {MoviesListCardComponent} from "../movie-list-card/MoviesListCardComponent.tsx";
import type {IMovieCardModel} from "../../models/IMovieCardModel.ts";
import PaginationComponent from "../pagination/PaginationComponent.tsx";

type MoviesListProps = {
    movies: IMovieCardModel[],
    totalPages: number,
    currentPage: number,
    loadState: boolean
}

export const MovieListComponentMain: FC<MoviesListProps> = ({movies, totalPages, currentPage, loadState}) => {
    return (

        <div className='flex flex-col items-center gap-4'>
            <div className='grid grid-cols-5  gap-4 '>
                {
                    movies.map(movie => <MoviesListCardComponent movieItem={movie} key={movie.id}/>)
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