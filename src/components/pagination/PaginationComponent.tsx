import {Pagination} from "@mui/material";
import type {FC} from "react";
import {useSearchParams} from "react-router-dom";

type PaginationProps = {
    totalPages: number;
    currentPage: number;
}

const PaginationComponent: FC <PaginationProps> = ({totalPages, currentPage}) => {

    const [searchParams, setSearchParams] = useSearchParams();

    const handlePageChange = (
        _: React.ChangeEvent<unknown>,
        page: number
    ) => {
        const query = searchParams.get("query") || "";

        setSearchParams({
            query,
            page: page.toString(),
        });
    };

    return (
        <div className='mt-5 pb-5'>
            <Pagination count={totalPages}
                        page={currentPage}
                        onChange={handlePageChange}
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
