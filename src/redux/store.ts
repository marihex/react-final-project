import {configureStore} from "@reduxjs/toolkit";
import {movieSlice} from "./movieSlice/movieSlice.ts";
import {searchSlice} from "./searchSlice/searchSlice.ts";
import {genreSlice} from "./genreSlice/genreSlice.ts";
import {sortSlice} from "./sortSlice/sortSlice.ts";

export const store = configureStore({
    reducer: {
        movies: movieSlice.reducer,
        search: searchSlice.reducer,
        genres: genreSlice.reducer,
        sorted: sortSlice.reducer
    }
});