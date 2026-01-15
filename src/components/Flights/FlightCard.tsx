import { Paper, Typography, Box, Button, Chip, useTheme } from '@mui/material';
import type { Flight } from '@/hooks/useFlightStore';
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import { flightCardStyles } from '@/styles/components/Flights/FlightCard.style';

interface FlightCardProps {
    flight: Flight;
}

const FlightCard = ({ flight }: FlightCardProps) => {
    const theme = useTheme();

    return (
        <Paper sx={flightCardStyles.root(theme)}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 3, width: '100%' }}>
                {/* Airline Logo & Name */}
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, minWidth: 140 }}>
                    <Box sx={flightCardStyles.logo}>
                        {flight.airline.charAt(0)}
                    </Box>
                    <Box>
                        <Typography variant="body2" fontWeight="600" sx={{ lineHeight: 1.2 }}>
                            {flight.airline}
                        </Typography>
                        <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.7rem' }}>
                            {flight.flightNumber}
                        </Typography>
                    </Box>
                </Box>

                {/* Departure Time & Code */}
                <Box sx={{ minWidth: 80, textAlign: 'center' }}>
                    <Typography variant="h6" fontWeight="700" sx={{ fontSize: '1.1rem', lineHeight: 1.2 }}>
                        {flight.departure.at.split('T')[1].substring(0, 5)}
                    </Typography>
                    <Typography variant="caption" color="text.secondary" fontWeight="600" sx={{ fontSize: '0.75rem' }}>
                        {flight.departure.code}
                    </Typography>
                </Box>

                {/* Flight Path & Duration */}
                <Box sx={{ flex: 1, minWidth: 200, px: 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                        <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.7rem' }}>
                            {flight.duration}
                        </Typography>
                        <Box sx={{ flex: 1, height: 2, bgcolor: 'divider', position: 'relative' }}>
                            <FlightTakeoffIcon sx={{
                                fontSize: 12,
                                position: 'absolute',
                                left: '50%',
                                top: '50%',
                                transform: 'translate(-50%, -50%) rotate(90deg)',
                                color: 'primary.main'
                            }} />
                        </Box>
                    </Box>
                    <Chip
                        label={flight.stops === 0 ? 'Direct' : `${flight.stops} stop(s)`}
                        size="small"
                        sx={{
                            height: 18,
                            fontSize: '0.65rem',
                            fontWeight: 600,
                            bgcolor: flight.stops === 0 ? 'success.light' : 'warning.light',
                            color: flight.stops === 0 ? 'success.dark' : 'warning.dark',
                            '& .MuiChip-label': { px: 1 }
                        }}
                    />
                </Box>

                {/* Arrival Time & Code */}
                <Box sx={{ minWidth: 80, textAlign: 'center' }}>
                    <Typography variant="h6" fontWeight="700" sx={{ fontSize: '1.1rem', lineHeight: 1.2 }}>
                        {flight.arrival.at.split('T')[1].substring(0, 5)}
                    </Typography>
                    <Typography variant="caption" color="text.secondary" fontWeight="600" sx={{ fontSize: '0.75rem' }}>
                        {flight.arrival.code}
                    </Typography>
                </Box>

                {/* Price & CTA */}
                <Box sx={{
                    minWidth: 200,
                    textAlign: 'right',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-end',
                    gap: 0.5,
                    pl: 3,
                    borderLeft: `1px solid ${theme.palette.divider}`
                }}>
                    <Box sx={flightCardStyles.tag}>Cheapest</Box>
                    <Typography
                        variant="h5"
                        fontWeight="900"
                        sx={{
                            color: theme.palette.mode === 'dark' ? '#00d2ff' : 'primary.main',
                            lineHeight: 1,
                            mb: 0.5
                        }}
                    >
                        ${flight.price}
                    </Typography>
                    <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.65rem', mb: 1 }}>
                        Total price for all travelers
                    </Typography>
                    <Button
                        variant="contained"
                        size="small"
                        sx={{
                            borderRadius: '100px',
                            px: 3,
                            py: 0.75,
                            fontWeight: 700,
                            fontSize: '0.8rem',
                            textTransform: 'none',
                            bgcolor: theme.palette.mode === 'dark' ? 'primary.main' : 'primary.dark',
                            '&:hover': {
                                bgcolor: theme.palette.mode === 'dark' ? 'primary.dark' : 'primary.main',
                            }
                        }}
                    >
                        View Deal
                    </Button>
                </Box>
            </Box>
        </Paper>
    );
};

export default FlightCard;
