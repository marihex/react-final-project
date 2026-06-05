import type {IMovieCardModel} from "../../models/IMovieCardModel.ts";
import {createAsyncThunk, createSlice, isRejected, type PayloadAction} from "@reduxjs/toolkit";
import {searchMovie} from "../../services/api.service.ts";
import type {IBaseTmbdModel} from "../../models/IBaseTmbdModel.ts";

interface SearchState {
    query: string;
    suggestions: IMovieCardModel[],
    loadState: boolean,
    error: string | null,
    noResults: boolean
}

const initialState: SearchState = {
    query: '',
    suggestions: [],
    loadState: false,
    error: null,
    noResults: false
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
            state.suggestions = []
        },
        clearSearch: (state) => {
            state.query = '';
            state.suggestions = [];
            state.error = null;
        }
    },
    extraReducers: builder => {
        builder
            .addCase(loadSuggestions.pending, (state) => {
                state.loadState = true;
                state.error = null;
                state.noResults = false;
            })
            .addCase(loadSuggestions.fulfilled, (state, action) => {
                state.loadState = false;
                state.suggestions = action.payload;
                state.noResults = action.payload.length === 0;
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