import type {IMovieCardModel} from "../../models/IMovieCardModel.ts";
import {createAsyncThunk, createSlice, isRejected, type PayloadAction} from "@reduxjs/toolkit";
import {getSorted} from "../../services/api.service.ts";
import type {IBaseTmbdModel} from "../../models/IBaseTmbdModel.ts";

type FilterSliceType = {
    popularDesc: IMovieCardModel[],
    popularAsc: IMovieCardModel[],
    voteAverageDesc: IMovieCardModel[],
    voteAverageAsc: IMovieCardModel[],
    releaseDesc: IMovieCardModel[],
    releaseAsc: IMovieCardModel[],
    titleDesc: IMovieCardModel[],
    titleAsc: IMovieCardModel[],
    selected: string,
    totalPages: number,
    loadState: boolean,
    error: string | null
}

const initialState: FilterSliceType = {
    popularDesc: [],
    popularAsc: [],
    voteAverageDesc: [],
    voteAverageAsc: [],
    releaseDesc: [],
    releaseAsc: [],
    titleDesc: [],
    titleAsc: [],
    selected: 'popularity.desc',
    totalPages: 0,
    loadState: false,
    error: null
}


const loadPopularDesc = createAsyncThunk(
    'loadPopularDesc',
    async (page: number | string, thunkAPI) => {
        try {
            const popularDesc = await getSorted<IBaseTmbdModel>(page, 'popularity.desc');
            return popularDesc;
        } catch (error) {
            if (error instanceof Error) {
                return thunkAPI.rejectWithValue(error.message);
            }
            return thunkAPI.rejectWithValue('Unknown server error');
        }
    }
);

const loadPopularAsc = createAsyncThunk(
    'loadPopularAsc',
    async (page: number | string, thunkAPI) => {
        try {
            const popularAsc = await getSorted<IBaseTmbdModel>(page, 'popularity.asc');
            return popularAsc;
        } catch (error) {
            if (error instanceof Error) {
                return thunkAPI.rejectWithValue(error.message);
            }
            return thunkAPI.rejectWithValue('Unknown server error');
        }
    }
);

const loadVoteAverageDesc = createAsyncThunk(
    'loadVoteAverageDesc',
    async (page: number | string, thunkAPI) => {
        try {
            const voteAverageDesc = await getSorted<IBaseTmbdModel>(page, 'vote_average.desc');
            return voteAverageDesc;
        } catch (error) {
            if (error instanceof Error) {
                return thunkAPI.rejectWithValue(error.message);
            }
            return thunkAPI.rejectWithValue('Unknown server error');
        }
    }
);

const loadVoteAverageAsc = createAsyncThunk(
    'loadVoteAverageAsc',
    async (page: number | string, thunkAPI) => {
        try {
            const voteAverageAsc = await getSorted<IBaseTmbdModel>(page, 'vote_average.asc');
            return voteAverageAsc;
        } catch (error) {
            if (error instanceof Error) {
                return thunkAPI.rejectWithValue(error.message);
            }
            return thunkAPI.rejectWithValue('Unknown server error');
        }
    }
);

const loadReleaseDesc = createAsyncThunk(
    'LoadReleaseDesc',
    async (page: number | string, thunkAPI) => {
        try {
            const releaseDesc = await getSorted<IBaseTmbdModel>(page, 'primary_release_date.desc');
            return releaseDesc;
        } catch (error) {
            if (error instanceof Error) {
                return thunkAPI.rejectWithValue(error.message);
            }
            return thunkAPI.rejectWithValue('Unknown server error');
        }
    }
);

const loadReleaseAsc = createAsyncThunk(
    'loadReleaseAsc',
    async (page: number | string, thunkAPI) => {
        try {
            const releaseAsc = await getSorted<IBaseTmbdModel>(page, 'primary_release_date.asc');
            return releaseAsc;
        } catch (error) {
            if (error instanceof Error) {
                return thunkAPI.rejectWithValue(error.message);
            }
            return thunkAPI.rejectWithValue('Unknown server error');
        }
    }
);

const loadTitleDesc = createAsyncThunk(
    'loadTitleDesc',
    async (page: number | string, thunkAPI) => {
        try {
            const titleDesc = await getSorted<IBaseTmbdModel>(page, 'title.desc');
            return titleDesc;
        } catch (error) {
            if (error instanceof Error) {
                return thunkAPI.rejectWithValue(error.message);
            }
            return thunkAPI.rejectWithValue('Unknown server error');
        }
    }
);

const loadTitleAsc = createAsyncThunk(
    'loadTitleAsc',
    async (page: number | string, thunkAPI) => {
        try {
            const titleAsc = await getSorted<IBaseTmbdModel>(page, 'title.asc');
            return titleAsc;
        } catch (error) {
            if (error instanceof Error) {
                return thunkAPI.rejectWithValue(error.message);
            }
            return thunkAPI.rejectWithValue('Unknown server error');
        }
    }
);

export const filterSlice = createSlice({
    name: 'filterSlice',
    initialState: initialState,
    reducers: {
        setSelected: (state, action: PayloadAction<string>) => {
            state.selected = action.payload;
        }
    },
    extraReducers: builder =>
        builder
            .addCase(loadPopularDesc.pending, (state) => {
                state.loadState = true;
                state.error = null
            })
            .addCase(loadPopularDesc.fulfilled, (state, action: PayloadAction<IBaseTmbdModel>) => {
                state.popularDesc = action.payload.results;
                state.loadState = false;
                state.error = null;
                state.totalPages = action.payload.total_pages;
            })
            .addCase(loadPopularAsc.pending, (state) => {
                state.loadState = true;
                state.error = null
            })
            .addCase(loadPopularAsc.fulfilled, (state, action: PayloadAction<IBaseTmbdModel>) => {
                state.popularAsc = action.payload.results;
                state.loadState = false;
                state.error = null;
                state.totalPages = action.payload.total_pages;
            })
            .addCase(loadVoteAverageDesc.pending, (state) => {
                state.loadState = true;
                state.error = null
            })
            .addCase(loadVoteAverageDesc.fulfilled, (state, action: PayloadAction<IBaseTmbdModel>) => {
                state.voteAverageDesc = action.payload.results;
                state.loadState = false;
                state.error = null;
                state.totalPages = action.payload.total_pages;
            })
            .addCase(loadVoteAverageAsc.pending, (state) => {
                state.loadState = true;
                state.error = null
            })
            .addCase(loadVoteAverageAsc.fulfilled, (state, action: PayloadAction<IBaseTmbdModel>) => {
                state.voteAverageAsc = action.payload.results;
                state.loadState = false;
                state.error = null;
                state.totalPages = action.payload.total_pages;
            })
            .addCase(loadReleaseDesc.pending, (state) => {
                state.loadState = true;
                state.error = null
            })
            .addCase(loadReleaseDesc.fulfilled, (state, action: PayloadAction<IBaseTmbdModel>) => {
                state.releaseDesc = action.payload.results;
                state.loadState = false;
                state.error = null;
                state.totalPages = action.payload.total_pages;
            })
            .addCase(loadReleaseAsc.pending, (state) => {
                state.loadState = true;
                state.error = null
            })
            .addCase(loadReleaseAsc.fulfilled, (state, action: PayloadAction<IBaseTmbdModel>) => {
                state.releaseAsc = action.payload.results;
                state.loadState = false;
                state.error = null;
                state.totalPages = action.payload.total_pages;
            })
            .addCase(loadTitleDesc.pending, (state) => {
                state.loadState = true;
                state.error = null
            })
            .addCase(loadTitleDesc.fulfilled, (state, action: PayloadAction<IBaseTmbdModel>) => {
                state.titleDesc = action.payload.results;
                state.loadState = false;
                state.error = null;
                state.totalPages = action.payload.total_pages;
            })
            .addCase(loadTitleAsc.pending, (state) => {
                state.loadState = true;
                state.error = null
            })
            .addCase(loadTitleAsc.fulfilled, (state, action: PayloadAction<IBaseTmbdModel>) => {
                state.titleAsc = action.payload.results;
                state.loadState = false;
                state.error = null;
                state.totalPages = action.payload.total_pages;
            })
            .addMatcher(isRejected(loadTitleAsc, loadTitleDesc, loadReleaseDesc, loadReleaseAsc, loadPopularAsc, loadPopularDesc, loadVoteAverageAsc, loadVoteAverageDesc), (state, action) => {
                state.loadState = false;
                if (typeof action.payload === 'string') {
                    state.error = action.payload;
                } else {
                    state.error = action.error.message || 'Server Error';
                }
            })

})

export const filterActions = {
    ...filterSlice.actions,
    loadTitleAsc,
    loadTitleDesc,
    loadReleaseDesc,
    loadReleaseAsc,
    loadPopularAsc,
    loadPopularDesc,
    loadVoteAverageAsc,
    loadVoteAverageDesc
}