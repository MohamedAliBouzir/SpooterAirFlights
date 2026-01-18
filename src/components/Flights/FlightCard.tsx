import { Paper, Typography, Box, Button, Chip, useTheme } from '@mui/material';
import type { Flight } from '@/hooks/useFlightStore';
import { useNavigate } from 'react-router-dom';
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import { flightCardStyles } from '@/styles/components/Flights/FlightCard.style';

interface FlightCardProps {
    flight: Flight;
}

const FlightCard = ({ flight }: FlightCardProps) => {
    const theme = useTheme();
    const navigate = useNavigate();

    const handleSelect = () => {
        navigate(`/flights/${flight.id}`);
    };

    const formatTime = (timeStr: string) => {
        try {
            return new Date(timeStr).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        } catch (e) {
            return timeStr.split(' ')[1] || timeStr;
        }
    };

    return (
        <Paper sx={flightCardStyles.root(theme)}>
            <Box sx={flightCardStyles.container}>
                <Box sx={flightCardStyles.airlineSection}>
                    <Box sx={flightCardStyles.airlineInfo}>
                        <Box sx={flightCardStyles.logoWrapper}>
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
                            <Typography variant="body2" fontWeight="600" sx={flightCardStyles.airlineText}>
                                {flight.airline}
                            </Typography>
                            <Typography variant="caption" color="text.secondary" sx={flightCardStyles.flightNumber}>
                                {flight.flightNumber}
                            </Typography>
                        </Box>
                    </Box>

                    <Box sx={flightCardStyles.mobilePriceSection}>
                        <Typography variant="h6" fontWeight="900" sx={flightCardStyles.mobilePrice}>
                            ${flight.price}
                        </Typography>
                    </Box>
                </Box>

                <Box sx={flightCardStyles.flightDetails}>
                    <Box sx={flightCardStyles.timeSection}>
                        <Typography variant="h6" fontWeight="700" sx={flightCardStyles.time}>
                            {formatTime(flight.departure.at)}
                        </Typography>
                        <Typography variant="caption" color="text.secondary" fontWeight="600" sx={flightCardStyles.airportCode}>
                            {flight.departure.code}
                        </Typography>
                    </Box>

                    <Box sx={flightCardStyles.durationSection}>
                        <Box sx={flightCardStyles.durationRow}>
                            <Typography variant="caption" color="text.secondary" sx={flightCardStyles.durationText}>
                                {flight.duration}
                            </Typography>
                            <Box sx={flightCardStyles.flightLine}>
                                <FlightTakeoffIcon sx={flightCardStyles.flightIcon} />
                            </Box>
                        </Box>
                        <Chip
                            label={flight.stops === 0 ? 'Direct' : `${flight.stops} stop(s)`}
                            size="small"
                            sx={flightCardStyles.stopsChip(flight.stops)}
                        />
                    </Box>

                    <Box sx={flightCardStyles.timeSection}>
                        <Typography variant="h6" fontWeight="700" sx={flightCardStyles.time}>
                            {formatTime(flight.arrival.at)}
                        </Typography>
                        <Typography variant="caption" color="text.secondary" fontWeight="600" sx={flightCardStyles.airportCode}>
                            {flight.arrival.code}
                        </Typography>
                    </Box>
                </Box>

                <Box sx={flightCardStyles.priceSection(theme)}>
                    <Box sx={flightCardStyles.desktopPriceSection}>
                        {flight.isBestDeal && (
                            <Box sx={flightCardStyles.tag}>Best Deal</Box>
                        )}
                        <Typography variant="h5" fontWeight="900" sx={flightCardStyles.price}>
                            ${flight.price}
                        </Typography>
                        <Typography variant="caption" color="text.secondary" sx={flightCardStyles.priceLabel}>
                            Total price
                        </Typography>
                    </Box>

                    <Button
                        variant="contained"
                        size="small"
                        fullWidth={false}
                        onClick={handleSelect}
                        sx={flightCardStyles.selectButton(theme)}
                    >
                        Select
                    </Button>
                </Box>
            </Box>
        </Paper>
    );
};

export default FlightCard;
