import { useAppDispatch } from "../../redux/hooks/useAppDispatch.ts";
import { useAppSelector } from "../../redux/hooks/useAppSelector.ts";
import {filterActions} from "../../redux/filterSlice/filterSlice.ts";
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
                            ? "bg-purple-700/20 text-white border-purple-500 shadow-[0_0_10px_rgba(168,85,247,0.35)]"
                            : "bg-[#0c0a0f] text-purple-400 border-purple-900/40 hover:border-purple-600 hover:text-purple-300"
                    }
                >
                    {item.label}
                </button>
            ))}
        </>
    );
};