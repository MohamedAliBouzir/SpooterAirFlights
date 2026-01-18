import { Box, Typography, useTheme, Button } from '@mui/material';
import { useMemo, useEffect, useState } from 'react';
import FilterListIcon from '@mui/icons-material/FilterList';
import HotelSearchForm from '@/components/Hotels/HotelSearchForm';
import HotelFilters from '@/components/Hotels/HotelFilters';
import HotelList from '@/components/Hotels/HotelList';
import { hotelPageStyles } from '@/styles/pages/Hotels.style';
import { useHotelStore } from '@/hooks/useHotelStore';

const Hotels = () => {
    const theme = useTheme();
    const { results, filters, loading, error, searchHotels } = useHotelStore();

    const [showFilters, setShowFilters] = useState(false);

    useEffect(() => {
        if (results.length === 0 && !loading) {
            searchHotels();
        }
    }, [results.length]);


    const filteredResults = useMemo(() => {
        return results.filter(hotel => {
            const price = hotel.rate_per_night?.extracted_lowest || 0;
            if (filters.minPrice !== null && price < filters.minPrice) return false;
            if (filters.maxPrice !== null && price > filters.maxPrice) return false;
            if (filters.rating !== null && (hotel.overall_rating || 0) < filters.rating) return false;
            // Note: propertyType filter not applied - HotelResult doesn't include type property yet

            return true;
        });
    }, [results, filters]);

    return (
        <Box sx={hotelPageStyles.root(theme)}>
            <Box sx={hotelPageStyles.header(theme)}>
                <Typography variant="h2" fontWeight="bold" sx={{ fontSize: { xs: '2rem', md: '4rem' } }}>
                    Find Your Perfect Stay
                </Typography>
                <Typography variant="h6" sx={{ opacity: 0.9, maxWidth: 600, mt: 1 }}>
                    Discover hotels and vacation rentals worldwide with Spotter
                </Typography>
            </Box>

            <Box sx={hotelPageStyles.container}>
                <HotelSearchForm />

                <Box sx={{
                    display: 'flex',
                    flexDirection: { xs: 'column', md: 'row' },
                    gap: 4,
                    mt: { xs: 4, md: 8 }
                }}>
                    <Box sx={{ width: { xs: '100%', md: '300px' }, minWidth: { md: 280 }, flexShrink: 0 }}>
                        <Button
                            variant="outlined"
                            fullWidth
                            startIcon={<FilterListIcon />}
                            onClick={() => setShowFilters(!showFilters)}
                            sx={{ mb: 2, display: { md: 'none' } }}
                        >
                            {showFilters ? 'Hide Filters' : 'Show Filters'}
                        </Button>

                        <Box sx={{
                            display: { xs: showFilters ? 'block' : 'none', md: 'block' },
                            ...hotelPageStyles.filterSidebar()
                        }}>
                            <HotelFilters />
                        </Box>
                    </Box>

                    <Box sx={{ flex: 1, minWidth: 0 }}>
                        <Typography variant="h5" fontWeight="bold" sx={{ mb: 3 }}>
                            Explore Properties
                        </Typography>
                        <HotelList hotels={filteredResults} loading={loading} error={error} />
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

export default Hotels;
