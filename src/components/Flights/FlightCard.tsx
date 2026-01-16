import { Paper, Typography, Box, Button, Chip, useTheme } from '@mui/material';
import type { Flight } from '@/hooks/useFlightStore';
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import { flightCardStyles } from '@/styles/components/Flights/FlightCard.style';

interface FlightCardProps {
    flight: Flight;
}

const FlightCard = ({ flight }: FlightCardProps) => {
    const theme = useTheme();

    const formatTime = (timeStr: string) => {
        try {
            return new Date(timeStr).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        } catch (e) {
            return timeStr.split(' ')[1] || timeStr;
        }
    };

    return (
        <Paper sx={flightCardStyles.root(theme)}>
            <Box sx={{
                display: 'flex',
                flexDirection: { xs: 'column', md: 'row' },
                alignItems: { xs: 'stretch', md: 'center' },
                gap: { xs: 2.5, md: 3 },
                width: '100%'
            }}>
                <Box sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: { xs: 'space-between', md: 'flex-start' },
                    gap: 1.5,
                    minWidth: 140
                }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                        <Box sx={{
                            ...flightCardStyles.logo,
                            background: 'transparent',
                            border: 'none',
                            width: 40,
                            height: 40,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            overflow: 'hidden'
                        }}>
                            {flight.airlineLogo ? (
                                <img
                                    src={flight.airlineLogo}
                                    alt={flight.airline}
                                    style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                                    onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                                />
                            ) : (
                                <Typography variant="h6">{flight.airline.charAt(0)}</Typography>
                            )}
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

                    <Box sx={{ display: { xs: 'block', md: 'none' }, textAlign: 'right' }}>
                        <Typography
                            variant="h6"
                            fontWeight="900"
                            sx={{
                                color: theme.palette.mode === 'dark' ? '#00d2ff' : 'primary.main',
                                lineHeight: 1
                            }}
                        >
                            ${flight.price}
                        </Typography>
                    </Box>
                </Box>

                <Box sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    flex: 1,
                    gap: 1
                }}>
                    <Box sx={{ minWidth: 80, textAlign: { xs: 'left', md: 'center' } }}>
                        <Typography variant="h6" fontWeight="700" sx={{ fontSize: '1.1rem', lineHeight: 1.2 }}>
                            {formatTime(flight.departure.at)}
                        </Typography>
                        <Typography variant="caption" color="text.secondary" fontWeight="600" sx={{ fontSize: '0.75rem' }}>
                            {flight.departure.code}
                        </Typography>
                    </Box>

                    <Box sx={{ flex: 1, px: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5, width: '100%', justifyContent: 'center' }}>
                            <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.7rem' }}>
                                {flight.duration}
                            </Typography>
                            <Box sx={{ flex: 1, height: 2, bgcolor: 'divider', position: 'relative', maxWidth: 100 }}>
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

                    <Box sx={{ minWidth: 80, textAlign: { xs: 'right', md: 'center' } }}>
                        <Typography variant="h6" fontWeight="700" sx={{ fontSize: '1.1rem', lineHeight: 1.2 }}>
                            {formatTime(flight.arrival.at)}
                        </Typography>
                        <Typography variant="caption" color="text.secondary" fontWeight="600" sx={{ fontSize: '0.75rem' }}>
                            {flight.arrival.code}
                        </Typography>
                    </Box>
                </Box>

                <Box sx={{
                    minWidth: { md: 200 },
                    textAlign: 'right',
                    display: 'flex',
                    flexDirection: { xs: 'row', md: 'column' },
                    alignItems: { xs: 'center', md: 'flex-end' },
                    justifyContent: { xs: 'space-between', md: 'center' },
                    gap: { xs: 2, md: 0.5 },
                    pl: { md: 3 },
                    borderLeft: { md: `1px solid ${theme.palette.divider}` },
                    pt: { xs: 2, md: 0 },
                    borderTop: { xs: `1px solid ${theme.palette.divider}`, md: 'none' }
                }}>
                    <Box sx={{ display: { xs: 'none', md: 'flex' }, flexDirection: 'column', alignItems: 'flex-end' }}>
                        {flight.isBestDeal && (
                            <Box sx={flightCardStyles.tag}>Best Deal</Box>
                        )}
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
                            Total price
                        </Typography>
                    </Box>

                    <Button
                        variant="contained"
                        size="small"
                        fullWidth={false}
                        sx={{
                            borderRadius: '100px',
                            px: 3,
                            py: 0.75,
                            fontWeight: 700,
                            fontSize: '0.8rem',
                            textTransform: 'none',
                            width: { xs: '100%', md: 'auto' },
                            bgcolor: theme.palette.mode === 'dark' ? 'primary.main' : 'primary.dark',
                            '&:hover': {
                                bgcolor: theme.palette.mode === 'dark' ? 'primary.dark' : 'primary.main',
                            }
                        }}
                    >
                        Select
                    </Button>
                </Box>
            </Box>
        </Paper>
    );
};

export default FlightCard;
