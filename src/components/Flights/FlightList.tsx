import { Box, Typography, useTheme } from '@mui/material';
import { useFlightStore, type Flight } from '@/hooks/useFlightStore';
import FlightCard from './FlightCard';
import FlightCardSkeleton from './FlightCardSkeleton';
import { motion, AnimatePresence } from 'framer-motion';
import { flightListStyles } from '@/styles/components/Flights/FlightList.style';

interface FlightListProps {
    flights?: Flight[];
}

const FlightList = ({ flights }: FlightListProps) => {
    const theme = useTheme();
    const { results, loading } = useFlightStore();
    const displayFlights = flights || results;

    if (loading) {
        return (
            <Box>
                {[1, 2, 3, 4].map((n) => <FlightCardSkeleton key={n} />)}
            </Box>
        )
    }

    if (!displayFlights || displayFlights.length === 0) {
        return (
            <Box sx={flightListStyles.emptyState(theme)}>
                <Typography variant="h6" color="text.secondary" fontWeight="bold">No flights match your filters.</Typography>
                <Typography variant="body2" color="text.secondary">Try adjusting your price or airline preferences.</Typography>
            </Box>
        );
    }

    return (
        <Box>
            <AnimatePresence mode='popLayout'>
                {displayFlights.map((flight) => (
                    <motion.div
                        key={flight.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.98 }}
                        transition={{ duration: 0.2 }}
                        layout
                    >
                        <FlightCard flight={flight} />
                    </motion.div>
                ))}
            </AnimatePresence>
        </Box>
    );
};

export default FlightList;
