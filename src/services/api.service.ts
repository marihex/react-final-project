import {baseUrl} from "../config/urls.ts";
import options from "../config/apiConfig.ts";


export const getAllMovies = async <T, >(endpoint: string, pg: number | string): Promise<T> => {
    try {
        const separator = endpoint.includes('?') ? '&' : '?';
        const fullUrl = `${baseUrl}${endpoint}${separator}page=${pg}`
        const response = await fetch(fullUrl, options)
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
        const response = await fetch(`${baseUrl}${endpoint}/${id}`, options)
        if (!response.ok) throw new Error(`${response.status} Failed to load`);
        return await response.json();
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(error.message, {cause: error});
        }
        throw new Error('Server Error. Unable to load data', {cause: error});
    }
}


export const getTrending = async <T, >(endpoint: string, timeWindow:string, pg: number | string): Promise<T> => {
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

export const getByGenres = async <T, >(endpoint: string, pg: number | string, id: string | number): Promise<T> => {
    try {
        const response = await fetch(`${baseUrl}${endpoint}?with_genres=${id}&page=${pg}`, options)
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


