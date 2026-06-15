import { useAppDispatch } from "../../redux/hooks/useAppDispatch.ts";
import { useAppSelector } from "../../redux/hooks/useAppSelector.ts";
import {filterActions} from "../../redux/filterSlice/filterSlice.ts";
import { sortHelper } from "../../config/sortHelper.ts";

export const SortComponent = () => {
    const { selected } = useAppSelector((state) => state.sorted);
    const dispatch = useAppDispatch();

    return (
        <>
            <span className='text-lg text-white'>Sort results by:</span>
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
                            ? "bg-cyan-600 text-white border border-indigo-900"
                            : "bg-gray-700 text-cyan-600 border border-gray-200"
                    }
                >
                    {item.label}
                </button>
            ))}
        </>
    );
};