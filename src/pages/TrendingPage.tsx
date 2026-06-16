import {MovieListComponentMain} from "../components/movie-list-main/MovieListComponentMain.tsx";
import {useAppSelector} from "../redux/hooks/useAppSelector.ts";
import {useAppDispatch} from "../redux/hooks/useAppDispatch.ts";
import {useSearchParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {movieActions} from "../redux/movieSlice/movieSlice.ts";
import {ToggleButton, ToggleButtonGroup} from "@mui/material";
import './movies-page-styles.css'

export const TrendingPage = () => {
    const {trending, loadState, error, totalPages} = useAppSelector(state => state.movies);
    const dispatch = useAppDispatch();
    const [searchParams] = useSearchParams();
    const [timeWindow, setTimeWindow] = useState<string>('week');
    const currentPage = Number(searchParams.get('page')) || 1;
    useEffect(() => {
        dispatch(movieActions.loadTrending({
            timeWindow: timeWindow,
            page: currentPage
        }))
    }, [dispatch, currentPage,timeWindow]);

    const handleChange = (_event: React.MouseEvent<HTMLElement>, newTimeWindow: string
    ) => {
        setTimeWindow(newTimeWindow);
    }

    return (
        <section className='movies__main'>
            {error && (
                <div className='text-red-500 text-xl'>
                    Error: {error}
                </div>
            )}
            <div className="max-w-[1400px] mx-auto px-4 sm:px-6 md:px-8">
                <div className='flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8'>
                    <h1 className='movies__title'>Trending movies</h1>
                    <ToggleButtonGroup
                        color="secondary"
                        value={timeWindow}
                        exclusive
                        onChange={handleChange}
                        sx={{
                            '& .MuiToggleButton-root': {
                                borderColor: 'blueviolet',
                                color: 'white'
                            },
                            '& .MuiToggleButton-root.Mui-selected': {
                                color: 'blueviolet'
                            }
                        }}
                    >
                        <ToggleButton value="week">Week</ToggleButton>
                        <ToggleButton value="day">Day</ToggleButton>
                    </ToggleButtonGroup></div>
                <div>
                    <MovieListComponentMain movies={trending} currentPage={currentPage} totalPages={totalPages}
                                            loadState={loadState}/>
                </div>
            </div>
        </section>
    );
};