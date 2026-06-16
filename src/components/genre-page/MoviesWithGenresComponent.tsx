import {useEffect} from "react";
import {useAppSelector} from "../../redux/hooks/useAppSelector.ts";
import {useAppDispatch} from "../../redux/hooks/useAppDispatch.ts";
import {movieActions} from "../../redux/movieSlice/movieSlice.ts";
import {MoviesListCardComponent} from "../movie-list-card/MoviesListCardComponent.tsx";
import {Link, useParams, useSearchParams} from "react-router-dom";
import {genreActions} from "../../redux/genreSlice/genreSlice.ts";
import PaginationComponent from "../pagination/PaginationComponent.tsx";
import '../../pages/movies-page-styles.css'
import {Chip} from "@mui/material";


export const MoviesWithGenresComponent = () => {
    const {moviesWithGenres, error, loadState, totalPages} = useAppSelector(state => state.movies);
    const {genres} = useAppSelector(state => state.genres)
    const {id} = useParams();
    const [searchParams] = useSearchParams();
    const currentPage = Number(searchParams.get("page")) || 1;
    const dispatch = useAppDispatch();
    useEffect(() => {
        if (id) dispatch(movieActions.loadMoviesWithGenres({id: id, page: currentPage}))
    }, [id, currentPage, dispatch]);
    useEffect(() => {
        dispatch(genreActions.loadGenres())
    }, [dispatch]);

    const currentMovies = moviesWithGenres[Number(id)] || [];


    return (
        <main className='movies__main'>
            {error && (
                <div className='text-red-500 text-xl'>
                    Error: {error}
                </div>
            )}

            <section className='movies__content'>
                <aside className='flex flex-col gap-2 pt-18'>
                    {
                        genres && genres.map(genre => {
                            const isSelected = Number(id) === genre.id
                            return (
                                <Chip key={genre.id}
                                      label={genre.name}
                                      component="a"
                                      href={`/movie/genre/${genre.id}`}
                                      variant={isSelected ? "filled" : "outlined"}
                                      color="primary"
                                      clickable
                                      sx={{
                                          '&.MuiChip-root:hover': {
                                              bgcolor: isSelected ? "primary.dark" : "dimgray",
                                          },
                                      ...(!isSelected && {
                                          '&.MuiChip-root': {
                                              bgcolor: 'darkslategrey',
                                              color: 'white'
                                          }
                                      })
                                      }}/>)
                        })}
                </aside>
                <div className='flex flex-col gap-4 items-center'>
                    {
                        genres && genres.map(genre =>
                            Number(id) === genre.id ? <h1 className='movies__title'>{genre.name}</h1> : ''
                        )
                    }
                    <ul className='grid grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4'>
                        {
                            currentMovies.filter(movie => movie.poster_path).map(movie => (
                                <li key={movie.id}><Link to={`/movie/${movie.id}`}><MoviesListCardComponent movieItem={movie}/></Link></li>

                            ))

                        }

                    </ul>
                    <div>
                        {
                            !loadState && totalPages > 0 && (
                                <PaginationComponent totalPages={totalPages} currentPage={currentPage}/>
                            )
                        }
                    </div>
                </div>
            </section>
        </main>
    )
}
