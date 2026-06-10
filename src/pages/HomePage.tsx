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
        dispatch(movieActions.loadMoviesWithGenres({page: 1, id: 28}))
    }, [dispatch]);

    return (
        <>
            <CarouselComponentMain/>
            <hr/>

            <div className='flex flex-col gap-12 pb-5'>
                <CarouselSmall movies={popular} movieCategory={'Popular Movies'} endpoint={'/popular'}/>
                <CarouselSmall movies={trending} movieCategory={'Trending Movies'} endpoint={'/trending'}/>
                <CarouselSmall movies={upcoming} movieCategory={'Upcoming Movies'} endpoint={'/upcoming'}/>
                <CarouselSmall movies={moviesWithGenres} movieCategory={'Action Movies'} endpoint={'/movie/genre/28'}/>
            </div>


        </>
    );
};