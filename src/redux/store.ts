import {configureStore} from "@reduxjs/toolkit";
import {movieSlice} from "./movieSlice/movieSlice.ts";
import {searchSlice} from "./searchSlice/searchSlice.ts";

export const store = configureStore({
    reducer: {
        movies: movieSlice.reducer,
        search: searchSlice.reducer,
    }
});