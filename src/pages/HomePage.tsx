import {CarouselComponentMain} from "../components/carousel/CarouselComponentMain.tsx";
import {CarouselSmall} from "../components/carousel/CarouselSmall.tsx";
import {useAppSelector} from "../redux/hooks/useAppSelector.ts";
import {useAppDispatch} from "../redux/hooks/useAppDispatch.ts";
import {useEffect} from "react";
import {movieActions} from "../redux/movieSlice/movieSlice.ts";
import {filterActions} from "../redux/filterSlice/filterSlice.ts";

export const HomePage = () => {
    const { trending, moviesWithGenres} = useAppSelector(state => state.movies);
    const {sortedUpcoming, sortedMovies} = useAppSelector(state => state.sorted)
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(filterActions.loadSortedMovies({page: 1, sort: 'popularity.desc'} ));
        dispatch(movieActions.loadTrending({page: 1, timeWindow: 'week'}));
        dispatch(filterActions.loadSortedUpcoming({page: 1, sort: 'popularity.desc'}));
        dispatch(movieActions.loadMoviesWithGenres({page: 1, id: 28}));
        dispatch(movieActions.loadMoviesWithGenres({page: 1, id: 12}));
        dispatch(movieActions.loadMoviesWithGenres({page: 1, id: 35}));
        dispatch(movieActions.loadMoviesWithGenres({page: 1, id: 27}));
        dispatch(movieActions.loadMoviesWithGenres({page: 1, id: 14}));
        dispatch(movieActions.loadMoviesWithGenres({page: 1, id: 16}));
        dispatch(movieActions.loadMoviesWithGenres({page: 1, id: 18}));
        dispatch(movieActions.loadMoviesWithGenres({page: 1, id: 37}));
        dispatch(movieActions.loadMoviesWithGenres({page: 1, id: 10402}));
    }, [dispatch]);

    return (
        <>
            <CarouselComponentMain/>
            <hr/>

            <div className='flex flex-col gap-12 pb-5'>
                <CarouselSmall movies={sortedUpcoming} movieCategory={'Upcoming'} endpoint={'/upcoming'}/>
                <CarouselSmall movies={trending} movieCategory={'Worldwide Trending'} endpoint={'/trending'}/>
                <CarouselSmall movies={sortedMovies} movieCategory={'Popular'} endpoint={'/popular'}/>
                <CarouselSmall movies={moviesWithGenres[28] || []} movieCategory={'Action'} endpoint={`/movie/genre/28`}/>
                <CarouselSmall movies={moviesWithGenres[12] || []} movieCategory={'Adventure'} endpoint={'/movie/genre/12'}/>
                <CarouselSmall movies={moviesWithGenres[18] || []} movieCategory={'Drama'} endpoint={'/movie/genre/18'}/>
                <CarouselSmall movies={moviesWithGenres[27] || []} movieCategory={'Horror'} endpoint={'/movie/genre/27'}/>
                <CarouselSmall movies={moviesWithGenres[14] || []} movieCategory={'Fantasy'} endpoint={'/movie/genre/14'}/>
                <CarouselSmall movies={moviesWithGenres[37] || []} movieCategory={'Western'} endpoint={'/movie/genre/37'}/>
                <CarouselSmall movies={moviesWithGenres[10402] || []} movieCategory={'Music'} endpoint={'/movie/genre/10402'}/>
            </div>


        </>
    );
};