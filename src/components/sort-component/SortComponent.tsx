import {useAppSelector} from "../../redux/hooks/useAppSelector.ts";
import {sortHelper} from "../../config/sortHelper.ts";
import {useAppDispatch} from "../../redux/hooks/useAppDispatch.ts";
import {filterActions} from "../../redux/filterSlice/filterSlice.ts";

export const SortComponent = () => {
    const {selected} = useAppSelector(state => state.sorted)
    const dispatch = useAppDispatch()


    return (
        <>
            {
                sortHelper.map((item, i) => <button key={i}
                                                    onClick={() => {
                                                        dispatch(filterActions.setSelected(item.value))
                                                        dispatch(item.action(1))
                                                    }
                                                    }
                                                    className={selected === item.value ? 'bg-cyan-600 text-white border border-indigo-900' : 'bg-gray-700 text-cyan-600 border border-gray-200'}
                >{item.label}</button>)
            }
        </>
    );
};