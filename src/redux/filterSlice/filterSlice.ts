import {createAsyncThunk, createSlice, isRejected} from "@reduxjs/toolkit";
import type {IMovieCardModel} from "../../models/IMovieCardModel.ts";
import type {IBaseTmbdModel} from "../../models/IBaseTmbdModel.ts";
import {getSorted, getUpcoming} from "../../services/api.service.ts";

type FilterSliceType = {
    sortedMovies: IMovieCardModel[];
    sortedUpcoming: IMovieCardModel[];
    selected: string;
    totalPages: number;
    loadState: boolean;
    error: string | null;
};

const initialState: FilterSliceType = {
    sortedMovies: [],
    sortedUpcoming: [],
    selected: "popularity.desc",
    totalPages: 0,
    loadState: false,
    error: null,
};

type LoadSortedMoviesArgs = {
    page: number | string;
    sort: string;
};

const loadSortedMovies = createAsyncThunk<IBaseTmbdModel, LoadSortedMoviesArgs>(
    'loadSortedMovies',
    async ({page, sort}, thunkAPI) => {
        try {
            const sortedMovie = await getSorted<IBaseTmbdModel>(page, sort);
            return sortedMovie
        } catch (error) {
            if (error instanceof Error) {
                return thunkAPI.rejectWithValue(error.message);
            }
            return thunkAPI.rejectWithValue('Unknown server error');
        }
    }
)

const loadSortedUpcoming = createAsyncThunk<IBaseTmbdModel, LoadSortedMoviesArgs>(
    'loadSortedUpcoming',
    async ({page, sort}, thunkAPI) => {
        try {
            const sortedUpcomingMovie = await getUpcoming<IBaseTmbdModel>(page, sort);
            return sortedUpcomingMovie
        } catch (error) {
            if (error instanceof Error) {
                return thunkAPI.rejectWithValue(error.message);
            }
            return thunkAPI.rejectWithValue('Unknown server error');
        }
    }
)



export const filterSlice = createSlice({
    name: "filterSlice",
    initialState,
    reducers: {},
    extraReducers: (builder) =>
        builder
            .addCase(loadSortedMovies.pending, (state) => {
                state.loadState = true;
                state.error = null;
            })
            .addCase(loadSortedMovies.fulfilled, (state, action) => {
                    state.sortedMovies = action.payload.results;
                    state.totalPages = action.payload.total_pages;
                    state.loadState = false;
                    state.error = null;
                    state.selected = action.meta.arg.sort
                }
            )
            .addCase(loadSortedUpcoming.pending, (state) => {
                state.loadState = true;
                state.error = null;
            })
            .addCase(loadSortedUpcoming.fulfilled, (state, action) => {
                    state.sortedUpcoming = action.payload.results;
                    state.totalPages = action.payload.total_pages;
                    state.loadState = false;
                    state.error = null;
                    state.selected = action.meta.arg.sort
                }
            )
            .addMatcher(
                isRejected(loadSortedMovies), (state, action) => {
                    state.loadState = false;

                    if (typeof action.payload === "string") {
                        state.error = action.payload;
                    } else {
                        state.error =
                            action.error.message || "Server Error";
                    }
                }
            ),
});

export const filterActions = {
    ...filterSlice.actions,
    loadSortedMovies,
    loadSortedUpcoming
};

