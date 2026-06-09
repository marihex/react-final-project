import {MovieListComponentMain} from "../components/movie-list-main/MovieListComponentMain.tsx";
import {CarouselComponent} from "../components/carousel/CarouselComponent.tsx";

export const HomePage = () => {
    return (
        <>
            <CarouselComponent/>
            <hr/>
        <MovieListComponentMain/>
        </>
    );
};