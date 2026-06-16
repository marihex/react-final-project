import type {AsyncThunkConfig, GetThunkAPI} from "@reduxjs/toolkit";

export const loadData = async <T, >(apiCall: () => Promise<T>, thunkAPI: GetThunkAPI<AsyncThunkConfig>): Promise<T | ReturnType<typeof thunkAPI.rejectWithValue>> => {
    try {
        return await apiCall();
    } catch (error) {
        if (error instanceof Error) {
            return thunkAPI.rejectWithValue(error.message);
        }
        return thunkAPI.rejectWithValue('Unknown server error');
    }
}