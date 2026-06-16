import {baseUrl} from "../config/urls.ts";
import options from "../config/apiConfig.ts";


export const fetchData= async <T, >(url:string): Promise<T> => {
    try {
        const response = await fetch(url, options)
        if (!response.ok) throw new Error(`${response.status} Failed to load`);
        return await response.json();

    } catch (error) {
        if (error instanceof Error) {
            throw new Error(error.message, {cause: error});
        }
        throw new Error('Server Error. Unable to load data', {cause: error});
    }
}

export const getAllMovies = async <T, >(endpoint: string, pg: number | string): Promise<T> => {
    return await fetchData(`${baseUrl}/${endpoint}?page=${pg}&region=UA&with_release_type=3`)
}

export const getUpcoming = async <T, >(pg: number | string, sortParam: string): Promise<T> => {
    const today = new Date();
        const nextMonth = new Date();
        nextMonth.setMonth(today.getMonth() + 3);

        const minDate = today.toISOString().split('T')[0];
        const maxDate = nextMonth.toISOString().split('T')[0];

        const url = `https://api.themoviedb.org/3/discover/movie?region=UA&release_date.gte=${minDate}&release_date.lte=${maxDate}&with_release_type=3&page=${pg}&sort_by=${sortParam}`
    return await fetchData(url)
}

export const getById = async <T, >(endpoint: string, id: string | number): Promise<T> => {
    return await fetchData(`${baseUrl}${endpoint}/${id}?append_to_response=release_dates`)
}

export const getTrending = async <T, >(endpoint: string, timeWindow: string, pg: number | string): Promise<T> => {
    return await fetchData(`${baseUrl}${endpoint}/${timeWindow}?page=${pg}`)
}

export const getSimilarRecommendations = async <T, >( id: number | string, endpoint: string, pg: number | string): Promise<T> => {
    return await fetchData(`${baseUrl}/movie/${id}${endpoint}?page=${pg}`)
}

export const  getByGenres = async <T, >(id: string | number, pg: number | string): Promise<T> => {
    return await fetchData(`${baseUrl}/discover/movie?with_genres=${id}&page=${pg}&with_release_type=3`)
}

export const getGenres = async <T, >(endpoint: string): Promise<T> => {
    return await fetchData(`${baseUrl}${endpoint}`)
}


export const searchMovie = async <T, >(endpoint: string, query: string, pg: number | string): Promise<T> => {
    return await fetchData(`${baseUrl}${endpoint}?query=${encodeURIComponent(query)}&page=${pg}`)
}

export const getSorted = async <T, >(pg: number | string, sortParam: string): Promise<T> => {
    return await fetchData(`${baseUrl}/discover/movie?page=${pg}&region=UA&with_release_type=3&sort_by=${sortParam}`)
}

