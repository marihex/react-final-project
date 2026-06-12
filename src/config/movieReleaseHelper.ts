import type {IMovieInfoModel} from "../models/IMovieInfoModel.ts";

export function getReleaseDateForRegion(movieData: IMovieInfoModel, targetRegion: string) {
    if (!movieData.release_dates || !movieData.release_dates.results) {
        return "Date is unknown";
    }

    const regionObj = movieData.release_dates.results.find(
        (item) => item.iso_3166_1 === targetRegion
    );

    if (regionObj && regionObj.release_dates.length > 0) {
        const fullDate = regionObj.release_dates[0].release_date;

        return fullDate.split('T')[0];
    }

    return "No Data Found";
}