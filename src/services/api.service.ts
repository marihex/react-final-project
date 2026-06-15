import {baseUrl} from "../config/urls.ts";
import options from "../config/apiConfig.ts";


export const getAllMovies = async <T, >(endpoint: string, pg: number | string): Promise<T> => {
    try {
        const response = await fetch(`${baseUrl}${endpoint}?page=${pg}&region=UA&with_release_type=3`, options)
        if (!response.ok) throw new Error(`${response.status} Failed to load`);
        return await response.json();

    } catch (error) {
        if (error instanceof Error) {
            throw new Error(error.message, {cause: error});
        }
        throw new Error('Server Error. Unable to load data', {cause: error});
    }
}

export const getUpcoming = async <T, >(pg: number | string, sortParam: string): Promise<T> => {
    try {
        const today = new Date();
        const nextMonth = new Date();
        nextMonth.setMonth(today.getMonth() + 3);

        const minDate = today.toISOString().split('T')[0];
        const maxDate = nextMonth.toISOString().split('T')[0];

        const url = `https://api.themoviedb.org/3/discover/movie?region=UA&release_date.gte=${minDate}&release_date.lte=${maxDate}&with_release_type=3&page=${pg}&sort_by=${sortParam}`;
        const response = await fetch(url, options);
        if (!response.ok) throw new Error(`${response.status} Failed to load`);
        return await response.json();

    } catch (error) {
        if (error instanceof Error) {
            throw new Error(error.message, {cause: error});
        }
        throw new Error('Server Error. Unable to load data', {cause: error});
    }
}

export const getById = async <T, >(endpoint: string, id: string | number): Promise<T> => {
    try {
        const response = await fetch(`${baseUrl}${endpoint}/${id}?append_to_response=release_dates`, options)
        if (!response.ok) throw new Error(`${response.status} Failed to load`);
        return await response.json();
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(error.message, {cause: error});
        }
        throw new Error('Server Error. Unable to load data', {cause: error});
    }
}


export const getTrending = async <T, >(endpoint: string, timeWindow: string, pg: number | string): Promise<T> => {
    try {
        const response = await fetch(`${baseUrl}${endpoint}/${timeWindow}?page=${pg}`, options)
        if (!response.ok) throw new Error(`${response.status} Failed to load`);
        return await response.json();
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(error.message, {cause: error});
        }
        throw new Error('Server Error. Unable to load data', {cause: error});
    }
}

export const getSimilarRecommendations = async <T, >( id: number | string, endpoint: string, pg: number | string): Promise<T> => {
    try {
        const response = await fetch(`${baseUrl}/movie/${id}${endpoint}?page=${pg}`, options)
        if (!response.ok) throw new Error(`${response.status} Failed to load`);
        return await response.json();
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(error.message, {cause: error});
        }
        throw new Error('Server Error. Unable to load data', {cause: error});
    }
}

export const getByGenres = async <T, >(id: string | number, pg: number | string): Promise<T> => {
    try {
        const response = await fetch(`${baseUrl}/discover/movie?with_genres=${id}&page=${pg}&with_release_type=3`, options)
        if (!response.ok) throw new Error(`${response.status} Failed to load`);
        return await response.json();

    } catch (error) {
        if (error instanceof Error) {
            throw new Error(error.message, {cause: error});
        }
        throw new Error('Server Error. Unable to load data', {cause: error});
    }
}

export const getGenres = async <T, >(endpoint: string): Promise<T> => {
    try {
        const response = await fetch(`${baseUrl}${endpoint}`, options)
        if (!response.ok) throw new Error(`${response.status} Failed to load`);
        return await response.json();

    } catch (error) {
        if (error instanceof Error) {
            throw new Error(error.message, {cause: error});
        }
        throw new Error('Server Error. Unable to load data', {cause: error});
    }
}

export const searchMovie = async <T, >(endpoint: string, query: string, pg: number | string): Promise<T> => {
    try {
        const response = await fetch(`${baseUrl}${endpoint}?query=${encodeURIComponent(query)}&page=${pg}`, options)
        if (!response.ok) throw new Error(`${response.status} Failed to load`);
        return await response.json();

    } catch (error) {
        if (error instanceof Error) {
            throw new Error(error.message, {cause: error});
        }
        throw new Error('Server Error. Unable to load data', {cause: error});
    }
}



export const getSorted = async <T, >(pg: number | string, sortParam: string): Promise<T> => {
    try {
        const response = await fetch(`${baseUrl}/discover/movie?page=${pg}&region=UA&with_release_type=3&sort_by=${sortParam}`, options)
        if (!response.ok) throw new Error(`${response.status} Failed to load`);
        return await response.json();

    } catch (error) {
        if (error instanceof Error) {
            throw new Error(error.message, {cause: error});
        }
        throw new Error('Server Error. Unable to load data', {cause: error});
    }
}
