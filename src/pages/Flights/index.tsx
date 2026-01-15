import { useEffect, useMemo } from 'react';
import { Box, Typography, useTheme } from '@mui/material';
import Grid from '@mui/material/Grid';
import FlightSearchForm from '@/components/Flights/FlightSearchForm';
import FlightList from '@/components/Flights/FlightList';
import FlightFilters from '@/components/Flights/FlightFilters';
import PriceGraph from '@/components/Flights/PriceGraph';
import { useFlightStore } from '@/hooks/useFlightStore';
import { dummyFlights, dummyPriceTrends } from '@/assets/data/dummyFlights';
import { flightsPageStyles } from '@/styles/pages/Flights.style';

const Flights = () => {
    const theme = useTheme();
    const {
        loading,
        results,
        filters,
        setResults,
        setPriceTrends,
        setLoading,
    } = useFlightStore();

    // Initial Load: Display data on mount as requested
    useEffect(() => {
        if (results.length === 0 && !loading) {
            setLoading(true);
            const timer = setTimeout(() => {
                setResults(dummyFlights);
                setPriceTrends(dummyPriceTrends);
                setLoading(false);
            }, 800);
            return () => clearTimeout(timer);
        }
    }, [results.length, loading, setLoading, setResults, setPriceTrends]);

    // Complex filtering logic
    const filteredResults = useMemo(() => {
        return results.filter(flight => {
            if (filters.maxPrice !== null && flight.price > filters.maxPrice) return false;
            if (filters.maxStops !== null && flight.stops > filters.maxStops) return false;
            if (filters.airlines.length > 0 && !filters.airlines.includes(flight.airline)) return false;
            return true;
        });
    }, [results, filters]);

    // Live update for Price Graph based on filters
    const filteredTrends = useMemo(() => {
        if (filteredResults.length === 0) return [];
        return dummyPriceTrends.map(t => ({
            ...t,
            price: t.price + (filteredResults.length * 2),
            count: Math.max(0, t.count - (dummyFlights.length - filteredResults.length))
        }));
    }, [filteredResults]);

    useEffect(() => {
        if (results.length > 0) {
            setPriceTrends(filteredTrends);
        }
    }, [filteredTrends, setPriceTrends, results.length]);

    return (
        <Box sx={flightsPageStyles.root}>
            {/* Header Section */}
            <Box sx={flightsPageStyles.header(theme)}>
                <Typography variant="h2" fontWeight={900} sx={{
                    letterSpacing: '-0.03em',
                    textShadow: '0 2px 10px rgba(0,0,0,0.2)'
                }}>
                    Flights
                </Typography>
                <Typography variant="h6" sx={{ opacity: 0.9 }}>
                    Search and compare across 1,000+ travel sites
                </Typography>
            </Box>

            {/* Content Section */}
            <Box sx={flightsPageStyles.container}>
                <FlightSearchForm />

                <Grid container spacing={4} sx={flightsPageStyles.contentGrid}>
                    {/* Filters Sidebar */}
                    <Grid size={{ xs: 12, md: 3 }}>
                        <Box sx={flightsPageStyles.filterSidebar()}>
                            <FlightFilters />
                        </Box>
                    </Grid>

                    {/* Main Content Area */}
                    <Grid size={{ xs: 12, md: 9 }}>
                        <Box sx={flightsPageStyles.resultsHeader}>
                            <Typography variant="h5" fontWeight="bold">
                                {loading ? 'Finding the best deals...' : `${filteredResults.length} flights found`}
                            </Typography>
                        </Box>

                        <Box sx={{ mb: 6, width: '100%' }}>
                            <FlightList flights={filteredResults} />
                        </Box>

                        <Box sx={{ width: '100%' }}>
                            <Typography variant="h5" fontWeight="black" gutterBottom sx={{ mb: 4 }}>
                                Price insights
                            </Typography>
                            <PriceGraph />
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    );
};

export default Flights;
