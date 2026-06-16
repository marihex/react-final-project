import './footer-styles.css'
import {Link} from "react-router-dom";
import {useAppSelector} from "../../redux/hooks/useAppSelector.ts";

export const FooterComponent = () => {
    const {genres} = useAppSelector(state => state.genres);
    return (
        <footer className='footer__container'>
            <Link to={'/'}><img
                src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_square_1-5bdc75aaebeb75dc7ae79426ddd9be3b2be1e342510f8202baf6bffa71d7f5c4.svg"
                alt="" className='w-48'/></Link>
            <div className='footer__links'>
                <div className='footer__movies'>
                    <span className='text-lg'>Movies</span>
                    <ul className='flex flex-col gap-2'>
                        <li className="movie__item"><Link to={'/popular'}>Popular</Link></li>
                        <li className="movie__item"><Link to={'/upcoming'}>Upcoming</Link></li>
                        <li className="movie__item"><Link to={'/trending'}>Trending</Link></li>
                    </ul>
                </div>
                <div className='footer__genres__container'>
                    <span className='text-lg'>Genres</span>
                    <ul className='footer__genres'>
                        {
                            genres && genres.map(genre => (<li key={genre.id} className='genres__item'><Link
                                to={`/movie/genre/${genre.id}`}>{genre.name}</Link></li>))
                        }
                    </ul>
                </div>
            </div>
        </footer>
    );
};