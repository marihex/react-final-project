import type {FC} from "react";
import {imgBaseUrl} from "../../config/urls.ts";

type PosterProps = {
    endpoint: string | null;
    size: string;
    movieTitle: string;
}

export const PosterComponent: FC<PosterProps> = ({size, endpoint, movieTitle}) => {

    return (
        <>
            <img src={`${imgBaseUrl}${size}${endpoint}`} alt={`${movieTitle} ${size} poster`} className='rounded-lg'/>

        </>
    );
};