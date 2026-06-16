import type {IMovieCardModel} from "../../models/IMovieCardModel.ts";
import {createAsyncThunk, createSlice, isFulfilled, isPending, isRejected, type PayloadAction} from "@reduxjs/toolkit";
import {
    getByGenres,
    getById,
    getSimilarRecommendations,
    getTrending,
    searchMovie
} from "../../services/api.service.ts";
import type {IBaseTmbdModel} from "../../models/IBaseTmbdModel.ts";
import type {IMovieInfoModel} from "../../models/IMovieInfoModel.ts";
import {loadData} from "../../config/thunkHelper.ts";

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



const loadTrending = createAsyncThunk<IBaseTmbdModel, FetchTrendingArgs>(
    'loadTrending',
    async ({timeWindow, page}, thunkAPI) => {
        return await loadData(() => getTrending<IBaseTmbdModel>('/trending/movie', timeWindow, page), thunkAPI);
    }
)

const loadMovie = createAsyncThunk(
    'loadMovie',
    async (id: string | number, thunkAPI) => {
        return await loadData(() => getById<IMovieInfoModel>('/movie', id), thunkAPI);
    }
)

const loadSearchMovie = createAsyncThunk<IBaseTmbdModel, FetchSearchArg>(
    'searchMovie',
    async ({query, page}, thunkAPI) => {

        return await loadData(() => searchMovie<IBaseTmbdModel>('/search/movie', query, page), thunkAPI);
    })


const loadMoviesWithGenres = createAsyncThunk<IBaseTmbdModel, FetchMoviesWithIdAndPg>(
    'loadMoviesWithGenres',
    async ({id, page}, thunkAPI) => {
        return await loadData(() => getByGenres<IBaseTmbdModel>(id, page), thunkAPI);
    }
)

const loadSimilarMovies = createAsyncThunk<IBaseTmbdModel, FetchMoviesWithIdAndPg>(
    'loadSimilarMovies',
    async ({id, page}, thunkAPI) => {
        return await loadData(() => getSimilarRecommendations<IBaseTmbdModel>(id, '/similar', page), thunkAPI);
    }
)

const loadRecommendations = createAsyncThunk<IBaseTmbdModel, FetchMoviesWithIdAndPg>(
    'loadRecommendations',
    async ({id, page}, thunkAPI) => {
        return await loadData(() => getSimilarRecommendations<IBaseTmbdModel>(id, '/recommendations', page), thunkAPI);
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
    extraReducers: (builder) => {
        builder
            .addCase(loadSearchMovie.pending, (state) => {
                state.noResults = false;
            })
            .addCase(loadMovie.fulfilled, (state, action: PayloadAction<IMovieInfoModel>) => {
                state.movie = action.payload;
            })
            .addCase(loadTrending.fulfilled, (state, action: PayloadAction<IBaseTmbdModel>) => {
                state.trending = action.payload.results;
                state.totalPages = action.payload.total_pages;
                state.totalResults = action.payload.total_results;
            })
            .addCase(loadSearchMovie.fulfilled, (state, action: PayloadAction<IBaseTmbdModel>) => {
                state.search = action.payload.results;
                state.totalPages = action.payload.total_pages;
                state.noResults = action.payload.results.length === 0;
            })
            .addCase(loadMoviesWithGenres.fulfilled, (state, action) => {
                state.moviesWithGenres[Number(action.meta.arg.id)] = action.payload.results;
                state.totalPages = action.payload.total_pages;
            })
            .addCase(loadSimilarMovies.fulfilled, (state, action: PayloadAction<IBaseTmbdModel>) => {
                state.similar = action.payload.results;
                state.totalPages = action.payload.total_pages;
            })
            .addCase(loadRecommendations.fulfilled, (state, action: PayloadAction<IBaseTmbdModel>) => {
                state.recommendations = action.payload.results;
                state.totalPages = action.payload.total_pages;
            })
            .addMatcher(
                isPending(
                    loadMovie, loadTrending,
                    loadSearchMovie, loadMoviesWithGenres,
                    loadSimilarMovies, loadRecommendations
                ),
                (state) => {
                    state.loadState = true;
                    state.error = null;
                }
            )
            .addMatcher(
                isFulfilled(
                    loadMovie, loadTrending,
                    loadSearchMovie, loadMoviesWithGenres,
                    loadSimilarMovies, loadRecommendations
                ),
                (state) => {
                    state.loadState = false;
                    state.error = null;
                }
            )
            .addMatcher(isRejected(loadMovie, loadTrending, loadSearchMovie, loadMoviesWithGenres, loadSimilarMovies, loadRecommendations), (state, action) => {
                state.loadState = false;
                if (typeof action.payload === 'string') {
                    state.error = action.payload;
                } else {
                    state.error = action.error.message || 'Server Error';
                }
            })
    }

})

export const movieActions = {
    ...movieSlice.actions,
    loadMovie,
    loadTrending,
    loadSearchMovie,
    loadMoviesWithGenres,
    loadSimilarMovies,
    loadRecommendations
}