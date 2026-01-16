import {
    Box,
    Typography,
    Paper,
    Slider,
    Rating,
    FormGroup,
    FormControlLabel,
    Checkbox,
    Button,
    useTheme,
    Divider
} from '@mui/material';
import { useHotelStore } from '@/hooks/useHotelStore';
import FilterListIcon from '@mui/icons-material/FilterList';
import { hotelFiltersStyles } from '@/styles/components/Hotels/HotelFilters.style';

const HotelFilters = () => {
    const theme = useTheme();
    const { filters, setFilters } = useHotelStore();

    const handlePriceChange = (_event: Event, newValue: number | number[]) => {
        const [min, max] = newValue as number[];
        setFilters({ minPrice: min, maxPrice: max });
    };

    const handleRatingChange = (_event: any, newValue: number | null) => {
        setFilters({ rating: newValue });
    };

    const handleReset = () => {
        setFilters({
            minPrice: null,
            maxPrice: null,
            rating: null,
            propertyType: null,
        });
    };

    return (
        <Paper sx={hotelFiltersStyles.paper(theme)}>
            <Box sx={hotelFiltersStyles.header}>
                <Typography variant="h6" sx={hotelFiltersStyles.title}>
                    <FilterListIcon fontSize="small" /> Filters
                </Typography>
                <Button variant="text" size="small" onClick={handleReset}>Reset</Button>
            </Box>

            <Box sx={hotelFiltersStyles.section}>
                <Typography variant="subtitle2" fontWeight="bold" gutterBottom>Price Range</Typography>
                <Slider
                    value={[filters.minPrice || 0, filters.maxPrice || 1000]}
                    onChange={handlePriceChange}
                    valueLabelDisplay="auto"
                    min={0}
                    max={1000}
                    step={10}
                    sx={hotelFiltersStyles.slider}
                />
                <Box sx={hotelFiltersStyles.rangeLabels}>
                    <Typography variant="caption" color="text.secondary">${filters.minPrice || 0}</Typography>
                    <Typography variant="caption" color="text.secondary">${filters.maxPrice || 1000}+</Typography>
                </Box>
            </Box>

            <Divider sx={{ my: 3 }} />

            <Box sx={hotelFiltersStyles.section}>
                <Typography variant="subtitle2" fontWeight="bold" gutterBottom>Minimum Rating</Typography>
                <Box sx={hotelFiltersStyles.ratingContainer}>
                    <Rating
                        value={filters.rating}
                        onChange={handleRatingChange}
                        precision={0.5}
                    />
                </Box>
            </Box>

            <Divider sx={{ my: 3 }} />

            <Box>
                <Typography variant="subtitle2" fontWeight="bold" gutterBottom>Property Type</Typography>
                <FormGroup>
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={filters.propertyType === 'hotel'}
                                onChange={(e) => setFilters({ propertyType: e.target.checked ? 'hotel' : null })}
                            />
                        }
                        label="Hotels"
                    />
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={filters.propertyType === 'vacation_rental'}
                                onChange={(e) => setFilters({ propertyType: e.target.checked ? 'vacation_rental' : null })}
                            />
                        }
                        label="Vacation Rentals"
                    />
                </FormGroup>
            </Box>
        </Paper>
    );
};

export default HotelFilters;
