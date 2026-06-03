import type {IMovieCardModel} from "../../models/IMovieCardModel.ts";
import {createAsyncThunk, createSlice, isRejected, type PayloadAction} from "@reduxjs/toolkit";
import {getAllMovies, getById} from "../../services/api.service.ts";
import type {IBaseTmbdModel} from "../../models/IBaseTmbdModel.ts";
import type {IMovieInfoModel} from "../../models/IMovieInfoModel.ts";

type MovieSliceType = {
    movies: IMovieCardModel[],
    movie: IMovieInfoModel | null,
    totalPages: number,
    loadState: boolean,
    error: string | null,
}

const initialState: MovieSliceType = {
    movies: [],
    movie: null,
    totalPages: 1,
    loadState: false,
    error: null,
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

const loadMovie = createAsyncThunk(
    'loadMovie',
    async (id: string | number, thunkAPI) => {
        try {
            const movie = await getById<IMovieInfoModel>('/movie/', id);
            return movie;
        } catch (error) {
            if (error instanceof Error) {
                return thunkAPI.rejectWithValue(error.message);
            }
            return thunkAPI.rejectWithValue('Unknown server error');
        }
    })

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
                state.totalPages = action.payload.total_pages
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
            .addMatcher(isRejected(loadMovie, loadMovies ), (state, action) => {
                state.loadState = false;
                if (typeof action.payload === 'string') {
                    state.error = action.payload;
                } else {
                    state.error = action.error.message || 'Server Error';
                }
            })

})

export const movieActions = {
    ...movieSlice.actions, loadMovie, loadMovies
}