import {Pagination} from "@mui/material";
import type {FC} from "react";
import {useSearchParams} from "react-router-dom";

type PaginationProps = {
    totalPages: number;
    currentPage: number;
}

const PaginationComponent: FC <PaginationProps> = ({totalPages, currentPage}) => {

    const [,setSearchParams] = useSearchParams();
    const paginationHandler = ( _: React.ChangeEvent<unknown>, page: number) => {
        {
            if (page === 1) {
                setSearchParams({});
            } else {
                setSearchParams({ page: page.toString() });
            }
        }
    }

    return (
        <div>
            <Pagination count={totalPages}
                        page={currentPage}
                        onChange={paginationHandler}
                        shape={"rounded"}
                        color={"primary"}
                        variant={"outlined"}
                        sx={{
                            '& .MuiPaginationItem-root': {
                                color: '#fff',
                                borderColor: 'rgba(255, 255, 255, 0.23)',
                            },
                            '& .MuiPaginationItem-root.Mui-selected': {
                                color: '#fff',
                                backgroundColor: 'primary.main',
                            }
                        }}
            />

        </div>
    );
};

export default PaginationComponent;
