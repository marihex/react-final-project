import type {Genres, IGenreModel} from "../../models/IGenreModel.ts";
import {createAsyncThunk, createSlice, isRejected} from "@reduxjs/toolkit";
import {getGenres} from "../../services/api.service.ts";

type GenreSliceType = {
    genres: Genres[] | null;
    genre: Genres | null,
    loadState: boolean,
    error: string | null
}

const initialState: GenreSliceType = {
    genres: null,
    genre: null,
    loadState: false,
    error: null
}

const loadGenres = createAsyncThunk (
    'loadGenres',
    async (_, thunkAPI) => {
        try {
            const genres = await getGenres<IGenreModel>('/genre/movie/list');
            return genres.genres
        } catch (error) {
            if (error instanceof Error) {
                return thunkAPI.rejectWithValue(error.message);
            }
            return thunkAPI.rejectWithValue('Unknown server error');
        }
    }
)

export  const genreSlice = createSlice({
    name: 'genreSlice',
    initialState: initialState,
    reducers: {},
    extraReducers: builder =>
        builder
            .addCase(loadGenres.pending, (state) => {
                state.loadState = true;
                state.error = null;
            })
            .addCase(loadGenres.fulfilled, (state, action) => {
                state.loadState = false;
                state.error = null;
                state.genres = action.payload
            })
            .addMatcher(isRejected(loadGenres), (state, action) => {
                state.loadState = false;
                if (typeof action.payload === 'string') {
                    state.error = action.payload;
                } else {
                    state.error = action.error.message || 'Server Error';
                }
            })

})

export const genreActions = {
    ...genreSlice.actions, loadGenres
}