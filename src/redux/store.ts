import {configureStore} from "@reduxjs/toolkit";
import {movieSlice} from "./movieSlice/movieSlice.ts";

export const store = configureStore({
    reducer: {
        movies: movieSlice.reducer
    }
});