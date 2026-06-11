import {CarouselComponentMain} from "../components/carousel/CarouselComponentMain.tsx";
import {CarouselSmall} from "../components/carousel/CarouselSmall.tsx";
import {useAppSelector} from "../redux/hooks/useAppSelector.ts";
import {useAppDispatch} from "../redux/hooks/useAppDispatch.ts";
import {useEffect} from "react";
import {movieActions} from "../redux/movieSlice/movieSlice.ts";

export const HomePage = () => {
    const {popular, trending, upcoming, moviesWithGenres} = useAppSelector(state => state.movies);
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(movieActions.loadPopular(1));
        dispatch(movieActions.loadTrending({page: 1, timeWindow: 'week'}));
        dispatch(movieActions.loadUpcoming(1));
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
                <CarouselSmall movies={upcoming} movieCategory={'Upcoming Movies'} endpoint={'/upcoming'}/>
                <CarouselSmall movies={trending} movieCategory={'Trending Movies'} endpoint={'/trending'}/>
                <CarouselSmall movies={popular} movieCategory={'Popular Movies'} endpoint={'/popular'}/>
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