import { Box, Typography, Skeleton, Alert } from '@mui/material';
import HotelCard from './HotelCard';
import { type HotelResult } from '@/services/serpApi';
import { motion, AnimatePresence } from 'framer-motion';
import { hotelListStyles } from '@/styles/components/Hotels/HotelList.style';

interface HotelListProps {
    hotels?: HotelResult[];
    loading?: boolean;
    error?: string | null;
}

const HotelList = ({ hotels, loading, error }: HotelListProps) => {
    const displayResults = hotels || [];

    if (loading) {
        return (
            <Box sx={hotelListStyles.skeletonContainer}>
                {[1, 2, 3].map((i) => (
                    <Skeleton
                        key={i}
                        variant="rectangular"
                        height={200}
                        sx={hotelListStyles.skeleton}
                    />
                ))}
            </Box>
        );
    }

    if (error) {
        return (
            <Alert severity="error" sx={hotelListStyles.errorAlert}>
                {error}
            </Alert>
        );
    }

    if (displayResults.length === 0) {
        return (
            <Box sx={hotelListStyles.emptyState}>
                <Typography variant="h6" color="text.secondary">
                    No hotels found for this search.
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Try another location or adjust your dates.
                </Typography>
            </Box>
        );
    }

    return (
        <Box sx={hotelListStyles.container}>
            <Typography variant="subtitle1" fontWeight="bold" gutterBottom sx={hotelListStyles.countText}>
                Showing {displayResults.length} properties
            </Typography>

            <AnimatePresence mode="popLayout">
                {displayResults.map((hotel, index) => (
                    <motion.div
                        key={hotel.hotel_id || index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.3, delay: index * 0.05 }}
                    >
                        <HotelCard hotel={hotel} />
                    </motion.div>
                ))}
            </AnimatePresence>
        </Box>
    );
};

export default HotelList;
