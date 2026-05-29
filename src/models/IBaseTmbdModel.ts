import type {IMovieCardModel} from "./IMovieCardModel.ts";

export interface IBaseTmbdModel {
    pages: number;
    results: IMovieCardModel[];
    total_pages: number;
    total_results: number;
}