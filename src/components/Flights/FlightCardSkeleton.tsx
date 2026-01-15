import { Paper, Grid, Skeleton, Box } from '@mui/material';

const FlightCardSkeleton = () => {
    return (
        <Paper
            elevation={0}
            sx={{
                p: 2,
                borderRadius: 3,
                mb: 2,
                border: '1px solid rgba(0,0,0,0.1)'
            }}
        >
            <Grid container alignItems="center" spacing={2}>
                <Grid size={{ xs: 12, sm: 3 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Skeleton variant="circular" width={40} height={40} />
                        <Box>
                            <Skeleton variant="text" width={100} />
                            <Skeleton variant="text" width={60} />
                        </Box>
                    </Box>
                </Grid>

                <Grid size={{ xs: 12, sm: 6 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', px: 2 }}>
                        <Skeleton variant="rectangular" width={40} height={20} />
                        <Box sx={{ flex: 1, px: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <Skeleton variant="text" width={60} />
                            <Skeleton variant="rectangular" width="100%" height={2} sx={{ my: 1 }} />
                            <Skeleton variant="rounded" width={60} height={20} />
                        </Box>
                        <Skeleton variant="rectangular" width={40} height={20} />
                    </Box>
                </Grid>

                <Grid size={{ xs: 12, sm: 3 }}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1 }}>
                        <Skeleton variant="text" width={80} height={40} />
                        <Skeleton variant="rounded" width="100%" height={36} sx={{ borderRadius: 50 }} />
                    </Box>
                </Grid>
            </Grid>
        </Paper>
    );
};

export default FlightCardSkeleton;
