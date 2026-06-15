import {type FC} from "react";
import {MoviesListCardComponent} from "../movie-list-card/MoviesListCardComponent.tsx";
import type {IMovieCardModel} from "../../models/IMovieCardModel.ts";

type MoviesListProps = {
    movies: IMovieCardModel[]
}

export const MovieListComponentMain: FC<MoviesListProps> = ({movies}) => {

    return (
        <section>
            <div className='grid grid-cols-4  gap-3 py-5 px-14'>
                {
                    movies.map(movie => <MoviesListCardComponent movieItem={movie} key={movie.id}/>)
                }
            </div>
        </section>
    );
};