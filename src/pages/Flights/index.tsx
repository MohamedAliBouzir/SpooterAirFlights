import { useEffect, useMemo } from 'react';
import { Box, Typography, useTheme } from '@mui/material';
import FlightSearchForm from '@/components/Flights/FlightSearchForm';
import FlightList from '@/components/Flights/FlightList';
import FlightFilters from '@/components/Flights/FlightFilters';
import PriceGraph from '@/components/Flights/PriceGraph';
import { useFlightStore, type Flight } from '@/hooks/useFlightStore';
import { flightsPageStyles } from '@/styles/pages/Flights.style';

const generateTrendsFromFlights = (flights: Flight[]) => {
    if (flights.length === 0) return [];

    const buckets: { [key: string]: { sum: number; count: number } } = {};

    flights.forEach(f => {
        const date = new Date(f.departure.at);
        if (isNaN(date.getTime())) return;
        const key = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

        if (!buckets[key]) buckets[key] = { sum: 0, count: 0 };
        buckets[key].sum += f.price;
        buckets[key].count += 1;
    });

    return Object.entries(buckets)
        .map(([time, data]) => ({
            date: time,
            price: Math.floor(data.sum / data.count),
            count: data.count
        }))
        .sort((a, b) => {
            return a.date.localeCompare(b.date);
        });
};

const Flights = () => {
    const theme = useTheme();
    const {
        loading,
        results,
        filters,
        searchParams,
        searchFlights,
        setPriceTrends
    } = useFlightStore();

    useEffect(() => {
        if (results.length === 0 && !loading) {
            searchFlights();
        }
    }, [results.length]);

    const filteredResults = useMemo(() => {
        return results.filter(flight => {
            if (searchParams.origin && flight.departure.code !== searchParams.origin) return false;
            if (searchParams.destination && flight.arrival.code !== searchParams.destination) return false;

            if (filters.maxPrice !== null && flight.price > filters.maxPrice) return false;

            if (filters.maxStops !== null && flight.stops > filters.maxStops) return false;

            if (filters.airlines.length > 0 && !filters.airlines.includes(flight.airline)) return false;

            return true;
        });
    }, [results, filters, searchParams]);

    const filteredTrends = useMemo(() => {
        return generateTrendsFromFlights(filteredResults);
    }, [filteredResults]);

    useEffect(() => {
        setPriceTrends(filteredTrends);
    }, [filteredTrends, setPriceTrends]);


    return (
        <Box sx={flightsPageStyles.root}>
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

            <Box sx={flightsPageStyles.container}>
                <FlightSearchForm />

                <Box sx={{
                    display: 'flex',
                    flexDirection: { xs: 'column', md: 'row' },
                    gap: 4,
                    ...flightsPageStyles.contentGrid
                }}>
                    <Box sx={{ width: { xs: '100%', md: '25%' }, minWidth: { md: 280 } }}>
                        <Box sx={flightsPageStyles.filterSidebar()}>
                            <FlightFilters />
                        </Box>
                    </Box>

                    <Box sx={{ width: { xs: '100%', md: '75%' }, flex: 1 }}>
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
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

export default Flights;
