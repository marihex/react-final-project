import {createAsyncThunk, createSlice, isFulfilled, isPending, isRejected} from "@reduxjs/toolkit";
import type {IMovieCardModel} from "../../models/IMovieCardModel.ts";
import type {IBaseTmbdModel} from "../../models/IBaseTmbdModel.ts";
import {getSorted, getUpcoming} from "../../services/api.service.ts";
import {loadData} from "../../config/thunkHelper.ts";

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
        return await loadData(() => getSorted<IBaseTmbdModel>(page, sort), thunkAPI);
    }
)

const loadSortedUpcoming = createAsyncThunk<IBaseTmbdModel, LoadSortedMoviesArgs>(
    'loadSortedUpcoming',
    async ({page, sort}, thunkAPI) => {
        return await loadData(() => getUpcoming<IBaseTmbdModel>(page, sort), thunkAPI)
    }
)



export const sortSlice = createSlice({
    name: "filterSlice",
    initialState,
    reducers: {},
    extraReducers: (builder) =>
        builder
            .addCase(loadSortedMovies.fulfilled, (state, action) => {
                    state.sortedMovies = action.payload.results;
                }
            )
            .addCase(loadSortedUpcoming.fulfilled, (state, action) => {
                    state.sortedUpcoming = action.payload.results;
                }
            )
            .addMatcher(isFulfilled(loadSortedMovies, loadSortedUpcoming), (state, action) => {
                state.totalPages = action.payload.total_pages;
                state.loadState = false;
                state.error = null;
                state.selected = action.meta.arg.sort
            })
            .addMatcher(isPending(loadSortedMovies, loadSortedUpcoming), (state) => {
                state.loadState = true;
                state.error = null;
            })
            .addMatcher(
                isRejected(loadSortedMovies, loadSortedUpcoming), (state, action) => {
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
    ...sortSlice.actions,
    loadSortedMovies,
    loadSortedUpcoming
};

