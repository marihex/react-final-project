import type {IMovieCardModel} from "../../models/IMovieCardModel.ts";
import {createAsyncThunk, createSlice, isRejected, type PayloadAction} from "@reduxjs/toolkit";
import {
    getAllMovies,
    getByGenres,
    getById,
    getSimilarRecommendations,
    getTrending,
    searchMovie
} from "../../services/api.service.ts";
import type {IBaseTmbdModel} from "../../models/IBaseTmbdModel.ts";
import type {IMovieInfoModel} from "../../models/IMovieInfoModel.ts";

type MovieSliceType = {
    movies: IMovieCardModel[],
    movie: IMovieInfoModel | null,
    trending: IMovieCardModel[],
    search: IMovieCardModel[],
    moviesWithGenres: Record<number, IMovieCardModel[]>,
    similar: IMovieCardModel[],
    recommendations: IMovieCardModel[],
    totalPages: number,
    totalResults: number,
    loadState: boolean,
    error: string | null,
    noResults: boolean
}

const initialState: MovieSliceType = {
    movies: [],
    movie: null,
    trending: [],
    search: [],
    moviesWithGenres: {},
    similar: [],
    recommendations: [],
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

interface FetchMoviesWithIdAndPg {
    page: number | string;
    id: string | number;
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

const loadTrending = createAsyncThunk<IBaseTmbdModel, FetchTrendingArgs>(
    'loadTrending',
    async ({timeWindow, page}, thunkAPI) => {
        try {
            const trending = await getTrending<IBaseTmbdModel>('/trending/movie', timeWindow, page)
            return trending
        } catch (error) {
            if (error instanceof Error) {
                return thunkAPI.rejectWithValue(error.message);
            }
            return thunkAPI.rejectWithValue('Unknown server error');
        }
    }
)

const loadMovie = createAsyncThunk(
    'loadMovie',
    async (id: string | number, thunkAPI) => {
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
    async ({query, page}, thunkAPI) => {
        try {
            const search = await searchMovie<IBaseTmbdModel>('/search/movie', query, page)
            return search
        } catch (error) {
            if (error instanceof Error) {
                return thunkAPI.rejectWithValue(error.message);
            }
            return thunkAPI.rejectWithValue('Unknown server error');
        }
    }
)

const loadMoviesWithGenres = createAsyncThunk<IBaseTmbdModel, FetchMoviesWithIdAndPg>(
    'loadMoviesWithGenres',
    async ({id, page}, thunkAPI) => {
        try {
            const moviesWithGenres = await getByGenres<IBaseTmbdModel>( id, page);
            return moviesWithGenres
        } catch (error) {
            if (error instanceof Error) {
                return thunkAPI.rejectWithValue(error.message);
            }
            return thunkAPI.rejectWithValue('Unknown server error');
        }
    }
)

const loadSimilarMovies = createAsyncThunk<IBaseTmbdModel, FetchMoviesWithIdAndPg>(
    'loadSimilarMovies',
    async ({id, page}, thunkAPI) => {
        try {
            const similar = await getSimilarRecommendations<IBaseTmbdModel>(id, '/similar',  page);
            return similar
        } catch (error) {
            if (error instanceof Error) {
                return thunkAPI.rejectWithValue(error.message);
            }
            return thunkAPI.rejectWithValue('Unknown server error');
        }
    }
)

const loadRecommendations = createAsyncThunk<IBaseTmbdModel, FetchMoviesWithIdAndPg>(
    'loadRecommendations',
    async ({id, page}, thunkAPI) => {
        try {
            const similar = await getSimilarRecommendations<IBaseTmbdModel>(id, '/recommendations',  page);
            return similar
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
            .addCase(loadMovies.fulfilled, (state, action: PayloadAction<IBaseTmbdModel>) => {
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
            .addCase(loadTrending.pending, (state) => {
                state.loadState = true;
                state.error = null;
            })
            .addCase(loadTrending.fulfilled, (state, action: PayloadAction<IBaseTmbdModel>) => {
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
            .addCase(loadSearchMovie.fulfilled, (state, action: PayloadAction<IBaseTmbdModel>) => {
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
            .addCase(loadMoviesWithGenres.fulfilled, (state, action) => {
                state.loadState = false;
                state.error = null;
                state.moviesWithGenres[Number(action.meta.arg.id)] = action.payload.results
                state.totalPages = action.payload.total_pages;

            })
            .addCase(loadSimilarMovies.pending, (state) => {
                state.loadState = true;
                state.error = null;
            })
            .addCase(loadSimilarMovies.fulfilled, (state, action: PayloadAction<IBaseTmbdModel>) => {
                state.loadState = false;
                state.error = null;
                state.similar = action.payload.results;
                state.totalPages = action.payload.total_pages;
            })
            .addCase(loadRecommendations.pending, (state) => {
                state.loadState = true;
                state.error = null;
            })
            .addCase(loadRecommendations.fulfilled, (state, action: PayloadAction<IBaseTmbdModel>) => {
                state.loadState = false;
                state.error = null;
                state.recommendations = action.payload.results;
                state.totalPages = action.payload.total_pages;
            })
            .addMatcher(isRejected(loadMovie, loadMovies, loadTrending, loadSearchMovie, loadMoviesWithGenres, loadSimilarMovies, loadRecommendations), (state, action) => {
                state.loadState = false;
                if (typeof action.payload === 'string') {
                    state.error = action.payload;
                } else {
                    state.error = action.error.message || 'Server Error';
                }
            })

})

export const movieActions = {
    ...movieSlice.actions,
    loadMovie,
    loadMovies,
    loadTrending,
    loadSearchMovie,
    loadMoviesWithGenres,
    loadSimilarMovies,
    loadRecommendations
}