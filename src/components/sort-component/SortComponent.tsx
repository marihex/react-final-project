import { useAppDispatch } from "../../redux/hooks/useAppDispatch.ts";
import { useAppSelector } from "../../redux/hooks/useAppSelector.ts";
import {filterActions} from "../../redux/sortSlice/sortSlice.ts";
import { sortHelper } from "../../config/sortHelper.ts";
import './sort-styles.css'

export const SortComponent = () => {
    const { selected } = useAppSelector((state) => state.sorted);
    const dispatch = useAppDispatch();

    return (
        <>
            <span className='text-[#b8b2b2] text-[1.2rem] tracking-[0.02rem]'>Sort results by:</span>
            {sortHelper.map((item) => (
                <button
                    key={item.value}
                    onClick={() =>
                        dispatch(
                            filterActions.loadSortedMovies({
                                page: 1,
                                sort: item.value,
                            })
                        )
                    }
                    className={
                        selected === item.value
                            ? "bg-white/5 text-white border-white/20"
                            : "bg-transparent text-zinc-400 border-white/10 hover:bg-white/5 hover:text-white/80 hover:border-white/20"
                    }
                >
                    {item.label}
                </button>
            ))}
        </>
    );
};