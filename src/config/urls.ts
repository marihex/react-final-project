export const baseUrl = 'https://api.themoviedb.org/3'

export const imgBaseUrl = 'https://image.tmdb.org/t/p/'

export const imgSizeUrl = {
    92: "w92",
    154: "w154",
    185: "w185",
    342: "w342",
    500: "w500",
    780: "w780",
    original: "original"
} as const

export type ImageUrlSize = keyof typeof imgSizeUrl;