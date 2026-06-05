import type {IMovieCardModel} from "../../models/IMovieCardModel.ts";
import {createAsyncThunk, createSlice, isRejected, type PayloadAction} from "@reduxjs/toolkit";
import {searchMovie} from "../../services/api.service.ts";
import type {IBaseTmbdModel} from "../../models/IBaseTmbdModel.ts";

interface SearchState {
    query: string;
    suggestion: IMovieCardModel[],
    loadState: boolean,
    error: string | null
}

const initialState: SearchState = {
    query: '',
    suggestion: [],
    loadState: false,
    error: null
}

const loadSuggestions = createAsyncThunk(
    'loadSuggestions',
    async (query: string, thunkAPI) => {
        try{
            const suggestions = await searchMovie<IBaseTmbdModel>('/search/movie', query, 1)
            return suggestions.results.slice(0, 5);
        } catch (error) {
            if (error instanceof Error) {
                return thunkAPI.rejectWithValue(error.message);
            }
            return thunkAPI.rejectWithValue('Unknown server error');
        }
    }
)

export const searchSlice = createSlice({
    name: 'searchSlice',
    initialState: initialState,
    reducers: {
        setQuery: (state, action: PayloadAction<string>) => {
            state.query = action.payload;
        },
        clearSuggestions: (state) => {
            state.suggestion = []
        },
        clearSearch: (state) => {
            state.query = '';
            state.suggestion = [];
            state.error = null;
        }
    },
    extraReducers: builder => {
        builder
            .addCase(loadSuggestions.pending, (state) => {
                state.loadState = true;
                state.error = null;
            })
            .addCase(loadSuggestions.fulfilled, (state, action) => {
                state.loadState = false;
                state.suggestion = action.payload
            })
            .addMatcher(isRejected(loadSuggestions), (state,action) => {
                state.loadState = false;
                if (typeof action.payload === 'string') {
                    state.error = action.payload;
                } else {
                    state.error = action.error.message || 'Server Error';
                }
            })
    }
})

export const searchActions = {
    ...searchSlice.actions, loadSuggestions
}