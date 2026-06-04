import type {IMovieCardModel} from "./IMovieCardModel.ts";

export interface IUpcomingModel {
    dates: Dates
    page: number
    results:IMovieCardModel[]
    total_pages: number
    total_results: number
}

export interface Dates {
    maximum: string
    minimum: string
}
