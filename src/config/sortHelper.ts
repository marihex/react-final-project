import {filterActions} from "../redux/filterSlice/filterSlice.ts";

export const sortHelper = [
    {label: 'Popularity ↓', value: 'popularity.desc', action: filterActions.loadPopularDesc, key: 'popularDesc'},
    {label: 'Popularity ↑', value: 'popularity.asc', action: filterActions.loadPopularAsc, key: 'popularAsc'},
    {label: 'Average Vote ↓', value: 'vote_average.desc', action: filterActions.loadVoteAverageDesc, key: 'voteAverageDesc'},
    {label: 'Average Vote ↑', value: 'vote_average.asc', action: filterActions.loadVoteAverageAsc, key: 'voteAverageAsc'},
    {label: 'Release Date ↓', value: 'primary_release_date.desc', action: filterActions.loadReleaseDesc, key: 'releaseDesc'},
    {label: 'Release Date ↑', value: 'primary_release_date.asc', action: filterActions.loadReleaseAsc, key: 'releaseAsc'},
    {label: 'Title Z-A', value: 'title.desc', action: filterActions.loadTitleDesc, key: 'titleDesc'},
    {label: 'Title A-Z', value: 'title.asc', action: filterActions.loadTitleAsc, key: 'titleAsc'},
]