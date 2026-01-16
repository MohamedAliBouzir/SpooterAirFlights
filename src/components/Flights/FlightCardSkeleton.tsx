import { Paper, Grid, Skeleton, Box } from '@mui/material';
import { flightCardSkeletonStyles } from '@/styles/components/Flights/FlightCardSkeleton.style';

const FlightCardSkeleton = () => {
    return (
        <Paper
            elevation={0}
            sx={flightCardSkeletonStyles.paper}
        >
            <Grid container alignItems="center" spacing={2}>
                <Grid size={{ xs: 12, sm: 3 }}>
                    <Box sx={flightCardSkeletonStyles.logoContainer}>
                        <Skeleton variant="circular" width={40} height={40} />
                        <Box>
                            <Skeleton variant="text" width={100} />
                            <Skeleton variant="text" width={60} />
                        </Box>
                    </Box>
                </Grid>

                <Grid size={{ xs: 12, sm: 6 }}>
                    <Box sx={flightCardSkeletonStyles.flightInfoContainer}>
                        <Skeleton variant="rectangular" width={40} height={20} />
                        <Box sx={flightCardSkeletonStyles.flightDetails}>
                            <Skeleton variant="text" width={60} />
                            <Skeleton variant="rectangular" width="100%" height={2} sx={{ my: 1 }} />
                            <Skeleton variant="rounded" width={60} height={20} />
                        </Box>
                        <Skeleton variant="rectangular" width={40} height={20} />
                    </Box>
                </Grid>

                <Grid size={{ xs: 12, sm: 3 }}>
                    <Box sx={flightCardSkeletonStyles.priceContainer}>
                        <Skeleton variant="text" width={80} height={40} />
                        <Skeleton variant="rounded" width="100%" height={36} sx={{ borderRadius: 50 }} />
                    </Box>
                </Grid>
            </Grid>
        </Paper>
    );
};

export default FlightCardSkeleton;
