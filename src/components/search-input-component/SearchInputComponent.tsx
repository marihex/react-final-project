import { useSearchParams } from 'react-router-dom';
import { TextField, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';


export const SearchInput = () => {
    const [searchParams, setSearchParams] = useSearchParams();

    // Получаем текущее значение поиска из URL (например, ?query=avatar)
    const currentQuery = searchParams.get('query') || '';

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const val = event.target.value;

        if (val) {
            // Если в инпуте что-то есть, записываем в URL
            setSearchParams({ query: val}); // Сбрасываем страницу на 1 при новом поиске
        } else {
            // Если инпут пустой, удаляем параметр из URL
            searchParams.delete('query');
            setSearchParams(searchParams);
        }
    };

    return (
        <TextField
            fullWidth
            variant="outlined"
            placeholder="Movie..."
            value={currentQuery}
            onChange={handleSearchChange}
            slotProps={{
                input: {
                    startAdornment: (
                        <InputAdornment position="start">
                            <SearchIcon sx={{ color: '#fff' }}/>
                        </InputAdornment>
                    ),
                },
            }}
            sx={{
                '& .MuiOutlinedInput-root': {
                    color: '#fff',
                    '& fieldset': { borderColor: 'rgba(255, 255, 255, 0.23)' },
                    '&:hover fieldset': { borderColor: '#fff' },
                },
            }}
        />
    );
};