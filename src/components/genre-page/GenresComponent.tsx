import {useAppSelector} from "../../redux/hooks/useAppSelector.ts";
import {useAppDispatch} from "../../redux/hooks/useAppDispatch.ts";
import {useEffect, useState} from "react";
import {genreActions} from "../../redux/genreSlice/genreSlice.ts";
// import {useNavigate} from "react-router-dom";
import {MoviesWithGenresComponent} from "./MoviesWithGenresComponent.tsx";
// import {useParams} from "react-router-dom";

export const GenresComponent = () => {
    // const {id} = useParams();
    const {genres, loadState, error} = useAppSelector(state => state.genres)
    // const genre = genres && genres.find(genre => genre.id === Number(id))
    // const genreName = genre ? genre.name : 'Loading...';
    const dispatch = useAppDispatch()
    const [selectedGenreId, setSelectedGenreId] = useState<number | null>(null)
    // const navigate = useNavigate()
    useEffect(() => {

        dispatch(genreActions.loadGenres())
    }, [dispatch])

    const onClickHandler = (id: number) => {
        setSelectedGenreId(id)

    }

    return (
        <main className='flex gap-8 items-start p-5'>
            {
                loadState && <div className='text-2xl'>Loading...</div>
            }
            {error && (
                <div className='text-red-500 text-xl'>
                    Error: {error}
                </div>
            )}
            <aside className="w-64 shrink-0">
                {genres && (
                    <ul>
                        {genres.map(genre => (<li key={genre.id}>
                            <button onClick={() => {
                                onClickHandler(genre.id)
                            }}>{genre.name}</button></li>))}
                    </ul>
                )
                }
            </aside>
            <section className='flex-1'>
                <MoviesWithGenresComponent genreId={selectedGenreId}/>
            </section>
        </main>
    );
};