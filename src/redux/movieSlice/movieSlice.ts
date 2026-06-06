import type {IMovieCardModel} from "../../models/IMovieCardModel.ts";
import {createAsyncThunk, createSlice, isRejected, type PayloadAction} from "@reduxjs/toolkit";
import {getAllMovies, getByGenres, getById, getTrending, searchMovie} from "../../services/api.service.ts";
import type {IBaseTmbdModel} from "../../models/IBaseTmbdModel.ts";
import type {IMovieInfoModel} from "../../models/IMovieInfoModel.ts";
import type {Dates, IUpcomingModel} from "../../models/IUpcomingModel.ts";

type MovieSliceType = {
    movies: IMovieCardModel[],
    movie: IMovieInfoModel | null,
    popular: IMovieCardModel[],
    upcoming: IMovieCardModel[],
    trending: IMovieCardModel[],
    search: IMovieCardModel[],
    moviesWithGenres: IMovieCardModel[],
    dates: Dates | null,
    totalPages: number,
    totalResults: number,
    loadState: boolean,
    error: string | null,
    noResults: boolean
}

const initialState: MovieSliceType = {
    movies: [],
    movie: null,
    popular: [],
    upcoming: [],
    trending: [],
    search: [],
    moviesWithGenres: [],
    dates: null,
    totalPages: 0,
    totalResults: 0,
    loadState: false,
    error: null,
    noResults: false

}

interface FetchTrendingArgs {
    timeWindow: 'day' | 'week' | string;
    page: number | string;
}

interface FetchSearchArg {
    query: string,
    page: number | string
}

interface FetchMoviesWithGenArgs {
    id: string | number;
    page: number | string;
}


const loadMovies = createAsyncThunk(
    'loadMovies',
    async (page: number | string, thunkAPI) => {
        try {
            const movies = await getAllMovies<IBaseTmbdModel>('/discover/movie', page);
            return movies;
        } catch (error) {
            if (error instanceof Error) {
                return thunkAPI.rejectWithValue(error.message);
            }
            return thunkAPI.rejectWithValue('Unknown server error');
        }
    }
)

const loadPopular = createAsyncThunk(
    'loadPopular',
    async (page: number | string, thunkAPI) => {
        try {
            const popular = await getAllMovies<IBaseTmbdModel>('/movie/popular', page);
            return popular;
        } catch (error) {
            if (error instanceof Error) {
                return thunkAPI.rejectWithValue(error.message);
            }
            return thunkAPI.rejectWithValue('Unknown server error');
        }
    }
)

const loadUpcoming = createAsyncThunk(
    'loadUpcoming',
    async (page: number | string, thunkAPI) => {
        try {
            const upcoming = await  getAllMovies<IUpcomingModel>('/movie/upcoming', page)
            return upcoming;
        } catch (error) {
            if (error instanceof Error) {
                return thunkAPI.rejectWithValue(error.message);
            }
            return thunkAPI.rejectWithValue('Unknown server error');
        }
    }
)

const loadTrending = createAsyncThunk <IBaseTmbdModel, FetchTrendingArgs> (
    'loadTrending',
    async ({timeWindow, page}, thunkAPI) => {
        try {
            const trending = await getTrending<IBaseTmbdModel>('/trending/movie',timeWindow, page)
            return trending
        }  catch (error) {
            if (error instanceof Error) {
                return thunkAPI.rejectWithValue(error.message);
            }
            return thunkAPI.rejectWithValue('Unknown server error');
        }
    }
)

const loadMovie = createAsyncThunk(
    'loadMovie',
    async (id:string | number ,thunkAPI) => {
        try {
            const movie = await getById<IMovieInfoModel>('/movie', id)
            return movie
        } catch (error) {
            if (error instanceof Error) {
                return thunkAPI.rejectWithValue(error.message);
            }
            return thunkAPI.rejectWithValue('Unknown server error');
        }
    }
)

const loadSearchMovie = createAsyncThunk<IBaseTmbdModel, FetchSearchArg>(
    'searchMovie',
    async ({query, page}, thunkAPI)=> {
        try {
            const search = await searchMovie<IBaseTmbdModel>('/search/movie', query, page)
            return search
        }  catch (error) {
            if (error instanceof Error) {
                return thunkAPI.rejectWithValue(error.message);
            }
            return thunkAPI.rejectWithValue('Unknown server error');
        }
    }
)

const loadMoviesWithGenres = createAsyncThunk<IBaseTmbdModel, FetchMoviesWithGenArgs>(
    'loadMoviesWithGenres',
    async({id, page}, thunkAPI) => {
        try {
            const moviesWithGenres = await getByGenres<IBaseTmbdModel>('/discover/movie', id, page);
            return moviesWithGenres
        } catch (error) {
            if (error instanceof Error) {
                return thunkAPI.rejectWithValue(error.message);
            }
            return thunkAPI.rejectWithValue('Unknown server error');
        }
    }
)

export const movieSlice = createSlice({
    name: 'movieSlice',
    initialState: initialState,
    reducers: {
        changeLoadState: (state, action: PayloadAction<boolean>) => {
            state.loadState = action.payload;
        }
    },
    extraReducers: builder =>
        builder
            .addCase(loadMovies.pending, (state) => {
                state.loadState = true;
                state.error = null
            })
            .addCase(loadMovies.fulfilled, (state, action:PayloadAction<IBaseTmbdModel>) => {
                state.movies = action.payload.results;
                state.loadState = false;
                state.error = null;
                state.totalPages = action.payload.total_pages;
                state.totalResults = action.payload.total_results;
            })
            .addCase(loadMovie.pending, (state) => {
              state.loadState = true;
              state.error = null
            })
            .addCase(loadMovie.fulfilled, (state, action: PayloadAction<IMovieInfoModel>) => {
                state.movie = action.payload;
                state.loadState = false;
                state.error = null;
            })
            .addCase(loadPopular.pending, (state) => {
              state.loadState = true;
              state.error = null;
            })
            .addCase(loadPopular.fulfilled, (state, action: PayloadAction<IBaseTmbdModel>) => {
                state.popular = action.payload.results;
                state.loadState = false;
                state.error = null;
                state.totalPages = action.payload.total_pages;
                state.totalResults = action.payload.total_results;
            })
            .addCase(loadUpcoming.pending, (state) => {
                state.loadState = true;
                state.error = null;
            })
            .addCase(loadUpcoming.fulfilled, (state, action: PayloadAction<IUpcomingModel>) => {
                state.loadState = false;
                state.upcoming = action.payload.results;
                state.error = null;
                state.totalPages = action.payload.total_pages;
                state.dates = action.payload.dates;
                state.totalResults = action.payload.total_results;
            })
            .addCase(loadTrending.pending, (state) => {
                state.loadState = true;
                state.error = null;
            })
            .addCase(loadTrending.fulfilled, (state, action: PayloadAction <IBaseTmbdModel>) => {
                state.loadState = false;
                state.error = null;
                state.trending = action.payload.results;
                state.totalPages = action.payload.total_pages;
                state.totalResults = action.payload.total_results;
            })
            .addCase(loadSearchMovie.pending, (state) => {
                state.loadState = true;
                state.error = null;
                state.noResults = false;
            })
            .addCase(loadSearchMovie.fulfilled, (state, action: PayloadAction <IBaseTmbdModel>) => {
                state.loadState = false;
                state.error = null;
                state.search = action.payload.results;
                state.totalPages = action.payload.total_pages;
                state.noResults = action.payload.results.length === 0;
            })
            .addCase(loadMoviesWithGenres.pending, (state) => {
                state.loadState = true;
                state.error = null;
            })
            .addCase(loadMoviesWithGenres.fulfilled, (state, action: PayloadAction<IBaseTmbdModel>) => {
                state.loadState = false;
                state.error = null;
                state.moviesWithGenres = action.payload.results;
                state.totalPages = action.payload.total_pages;

            })
            .addMatcher(isRejected(loadMovie, loadMovies, loadPopular, loadUpcoming, loadTrending, loadSearchMovie, loadMoviesWithGenres ), (state, action) => {
                state.loadState = false;
                if (typeof action.payload === 'string') {
                    state.error = action.payload;
                } else {
                    state.error = action.error.message || 'Server Error';
                }
            })

})

export const movieActions = {
    ...movieSlice.actions, loadMovie, loadMovies, loadPopular, loadUpcoming, loadTrending, loadSearchMovie
}