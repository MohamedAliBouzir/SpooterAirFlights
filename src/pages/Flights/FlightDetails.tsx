import { useEffect, useMemo, Fragment } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Container, Typography, Button, Paper, Grid, Divider, useTheme, Chip, Stack, IconButton, CircularProgress } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import FlightLandIcon from '@mui/icons-material/FlightLand';
import Co2Icon from '@mui/icons-material/Co2';
import LuggageIcon from '@mui/icons-material/Luggage';
import WifiIcon from '@mui/icons-material/Wifi';
import PowerIcon from '@mui/icons-material/Power';
import PersonalVideoIcon from '@mui/icons-material/PersonalVideo';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import PaidIcon from '@mui/icons-material/Paid';
import AirlineSeatReclineExtraIcon from '@mui/icons-material/AirlineSeatReclineExtra';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Map, { Source, Layer, Marker } from 'react-map-gl/mapbox';
import 'mapbox-gl/dist/mapbox-gl.css';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useFlightStore } from '@/hooks/useFlightStore';
import { flightDetailsStyles } from '@/styles/pages/FlightDetails.style';

const MAPBOX_TOKEN = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;

const AIRPORT_COORDS: Record<string, [number, number]> = {
    'JFK': [-73.7781, 40.6413],
    'LAX': [-118.4085, 33.9416],
    'SFO': [-122.3748, 37.6189],
    'LHR': [-0.4543, 51.4700],
    'CDG': [2.5479, 49.0097],
    'DXB': [55.3644, 25.2528],
    'SIN': [103.9915, 1.3644],
    'HND': [139.7798, 35.5494],
    'ATL': [-84.4277, 33.6407],
    'ORD': [-87.9073, 41.9742],
    'DFW': [-97.0403, 32.8998],
    'DEN': [-104.6737, 39.8561],
    'SEA': [-122.3088, 47.4502],
    'EWR': [-74.1745, 40.6895],
    'MIA': [-80.2870, 25.7959],
    'BOS': [-71.0052, 42.3656],
    'CLT': [-80.9473, 35.2140],
    'MCO': [-81.3089, 28.4281],
    'LAS': [-115.1522, 36.0840],
    'PHX': [-112.0078, 33.4342],
    'FRA': [8.5622, 50.0379],
    'AMS': [4.7683, 52.3105],
    'IST': [28.7444, 41.2751],
    'MAD': [-3.5672, 40.4839],
    'BCN': [2.0833, 41.2974],
    'TUN': [10.2272, 36.8510],
    'DJE': [10.7755, 33.8750],
};

const FlightDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const theme = useTheme();
    const { results, priceTrends, priceInsights, bookingOptions, fetchBookingOptions, loading } = useFlightStore();

    const flight = useMemo(() => results.find(f => f.id === id), [results, id]);

    useEffect(() => {
        if (flight?.bookingToken) {
            fetchBookingOptions(flight.bookingToken);
        }
    }, [flight?.bookingToken, fetchBookingOptions]);

    useEffect(() => {
        if (!flight && results.length > 0) {
            // Scroll to top or handle error
        }
    }, [flight, results, navigate]);

    if (!flight) {
        return (
            <Container sx={{ py: 8, textAlign: 'center' }}>
                <Typography variant="h4" fontWeight="bold">Flight not found</Typography>
                <Typography color="text.secondary" sx={{ mt: 1, mb: 3 }}>This flight is no longer available.</Typography>
                <Button variant="contained" onClick={() => navigate('/flights')} sx={{ borderRadius: '100px', px: 4 }}>New Search</Button>
            </Container>
        );
    }

    const start = AIRPORT_COORDS[flight.departure.code] || [-73.7781, 40.6413];
    const end = AIRPORT_COORDS[flight.arrival.code] || [2.5479, 49.0097];

    const arcData = {
        type: 'Feature' as const,
        geometry: {
            type: 'LineString' as const,
            coordinates: [start, end]
        },
        properties: {}
    };

    const lineLayer = {
        id: 'route',
        type: 'line' as const,
        source: 'route',
        layout: {
            'line-join': 'round' as const,
            'line-cap': 'round' as const
        },
        paint: {
            'line-color': theme.palette.primary.main,
            'line-width': 4,
            'line-dasharray': [1, 2]
        }
    };

    const labelLayer = {
        id: 'route-label',
        type: 'symbol' as const,
        source: 'route',
        layout: {
            'symbol-placement': 'line' as const,
            'text-field': flight.duration,
            'text-size': 14,
            'text-font': ['Open Sans Bold', 'Arial Unicode MS Bold'],
            'text-offset': [0, -1],
            'text-allow-overlap': true
        },
        paint: {
            'text-color': theme.palette.mode === 'dark' ? '#fff' : theme.palette.primary.main,
            'text-halo-color': theme.palette.mode === 'dark' ? '#000' : '#fff',
            'text-halo-width': 2
        }
    };

    const formatTime = (timeStr: string) => {
        return new Date(timeStr).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };

    const formatDuration = (minutes: number) => {
        const h = Math.floor(minutes / 60);
        const m = minutes % 60;
        return `${h} hr ${m} min`;
    };

    // Statistical Price Insight Logic
    const priceAnalysis = useMemo(() => {
        const historyPrices = priceTrends.map(t => t.price);
        const currentPrices = results.map(r => r.price);
        const current = flight.price;

        // Smart range extraction/estimation
        let [typicalLow, typicalHigh] = priceInsights?.typicalPriceRange || [0, 0];

        // If API range is missing or looks suspicious (e.g. way below current results), estimate it
        const minResult = Math.min(...currentPrices, current);
        if (typicalHigh === 0 || typicalHigh < minResult * 0.4) {
            if (historyPrices.length > 10) {
                const sorted = [...historyPrices].sort((a, b) => a - b);
                typicalLow = sorted[Math.floor(sorted.length * 0.3)];
                typicalHigh = sorted[Math.floor(sorted.length * 0.7)];
            } else {
                typicalLow = minResult * 0.9;
                typicalHigh = minResult * 1.3;
            }
        }

        const allValues = [...historyPrices, typicalLow, typicalHigh, current].filter(v => v > 0);
        const minVal = Math.min(...allValues);
        const maxVal = Math.max(...allValues);

        // Add 15% padding to the bounds for better visualization
        const padding = (maxVal - minVal) * 0.15;
        const absMin = Math.max(0, minVal - padding);
        const absMax = maxVal + padding;
        const range = absMax - absMin;

        const getPos = (val: number) => ((val - absMin) / range) * 100;

        const lowPos = getPos(typicalLow);
        const highPos = getPos(typicalHigh);
        const currentPos = getPos(current);

        // Stats
        const avgPrice = historyPrices.length > 0
            ? historyPrices.reduce((a, b) => a + b, 0) / historyPrices.length
            : (typicalLow + typicalHigh) / 2;

        const cheaperThanCount = results.filter(r => r.price > current).length;
        const cheaperPercent = Math.round((cheaperThanCount / Math.max(1, results.length)) * 100);

        // Strict Price Level Assessment (matches the bar segments)
        let level = 'typical';
        if (current < typicalLow) level = 'low';
        else if (current > typicalHigh) level = 'high';

        return {
            absMin,
            absMax,
            lowPos,
            highPos,
            currentPos,
            typicalLow: Math.round(typicalLow),
            typicalHigh: Math.round(typicalHigh),
            avgPrice,
            cheaperPercent,
            diffFromAvg: current - avgPrice,
            level
        };
    }, [priceTrends, priceInsights, flight.price, results]);

    const priceLevel = priceAnalysis.level;

    const handleBookOption = (request?: { url: string; post_data: string }) => {
        if (!request) return;

        const form = document.createElement('form');
        form.method = 'POST';
        form.action = request.url;
        form.target = '_blank';

        const params = new URLSearchParams(request.post_data);
        for (const [key, value] of params) {
            const input = document.createElement('input');
            input.type = 'hidden';
            input.name = key;
            input.value = value;
            form.appendChild(input);
        }

        document.body.appendChild(form);
        form.submit();
        document.body.removeChild(form);
    };

    const groupedBookings = useMemo(() => {
        const groups: Record<string, any[]> = {};
        bookingOptions.forEach(opt => {
            const name = opt.together?.book_with || 'Other';
            if (!groups[name]) groups[name] = [];
            groups[name].push(opt);
        });
        return groups;
    }, [bookingOptions]);

    const primaryProvider = useMemo(() => {
        const names = Object.keys(groupedBookings);
        if (names.length === 0) return null;
        const airlineProvider = names.find(name => groupedBookings[name].some(opt => opt.together?.airline));
        return airlineProvider || names[0];
    }, [groupedBookings]);

    const getFeatureIcon = (text: string) => {
        const lowText = text.toLowerCase();
        if (lowText.includes('no refund') || lowText.includes('non-refundable')) return <CloseIcon sx={{ ...flightDetailsStyles.featureIcon, color: '#d93025' }} />;
        if (lowText.includes('standard seat') || lowText.includes('carry-on') || lowText.includes('included') || lowText.includes('free')) return <CheckIcon sx={{ ...flightDetailsStyles.featureIcon, color: '#188038' }} />;
        if (lowText.includes('change') || lowText.includes('fee')) return <PaidIcon sx={{ ...flightDetailsStyles.featureIcon, color: '#5f6368' }} />;
        if (lowText.includes('seat')) return <AirlineSeatReclineExtraIcon sx={{ ...flightDetailsStyles.featureIcon, color: '#5f6368' }} />;
        if (lowText.includes('bag')) return <LuggageIcon sx={{ ...flightDetailsStyles.featureIcon, color: '#5f6368' }} />;
        return <CheckIcon sx={{ ...flightDetailsStyles.featureIcon, color: '#188038' }} />;
    };

    // Format graph X-axis (e.g., "57 days ago")
    const formatGraphXAxis = (_tickItem: any, index: number) => {
        const total = priceTrends.length;
        const daysAgo = total - index - 1;
        if (daysAgo === 0) return 'Today';
        if (index % 10 === 0) return `${daysAgo} days ago`;
        return '';
    };

    return (
        <Box sx={flightDetailsStyles.root}>
            <Container maxWidth="lg" sx={{ py: 4 }}>
                <Button
                    startIcon={<ArrowBackIcon />}
                    onClick={() => navigate('/flights')}
                    sx={{ mb: 4, textTransform: 'none', fontWeight: 600, color: 'text.secondary' }}
                >
                    Back to results
                </Button>

                <Grid container spacing={4}>
                    <Grid size={{ xs: 12, md: 8 }}>
                        <Paper sx={flightDetailsStyles.infoCard(theme)}>
                            <Box sx={{ mb: 4 }}>
                                <Typography variant="h4" fontWeight="900" gutterBottom>Itinerary</Typography>
                                <Typography variant="subtitle1" color="text.secondary" fontWeight="600">
                                    {flight.stops === 0 ? 'Nonstop' : `${flight.stops} stop${flight.stops > 1 ? 's' : ''}`} • {flight.duration}
                                </Typography>
                            </Box>

                            <Box sx={flightDetailsStyles.timelineContainer}>
                                {flight.segments?.map((segment: any, idx: number) => (
                                    <Fragment key={idx}>
                                        <Box sx={{ mb: 6, position: 'relative' }}>
                                            {/* Airline Info Row */}
                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 4 }}>
                                                <Box sx={flightDetailsStyles.airlineLogo}>
                                                    <img src={segment.airline_logo} alt={segment.airline} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                                                </Box>
                                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap' }}>
                                                    <Typography sx={{ fontWeight: 700, fontSize: '0.9rem' }}>{segment.airline}</Typography>
                                                    <Typography sx={{ color: 'text.secondary', fontSize: '0.85rem' }}>• {segment.travel_class}</Typography>
                                                    <Typography sx={{ color: 'text.secondary', fontSize: '0.85rem' }}>• {segment.airplane}</Typography>
                                                    <Typography sx={{ color: 'text.secondary', fontSize: '0.85rem' }}>• {segment.flight_number}</Typography>
                                                </Box>
                                            </Box>

                                            <Box sx={{ position: 'relative', pl: 0.5 }}>
                                                {/* Vertical Dotted Line */}
                                                <Box sx={{
                                                    position: 'absolute',
                                                    left: 10,
                                                    top: 10,
                                                    bottom: 10,
                                                    width: 0,
                                                    borderLeft: `2px dotted ${theme.palette.divider}`,
                                                    zIndex: 1
                                                }} />

                                                {/* Departure Row */}
                                                <Box sx={{ display: 'flex', gap: 3, mb: 3, position: 'relative', zIndex: 2 }}>
                                                    <Box sx={{ ...flightDetailsStyles.timelineDot(theme), flexShrink: 0, mt: '6px' }} />
                                                    <Box sx={{ flex: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                                        <Box>
                                                            <Typography variant="body1" fontWeight="800" sx={{ lineHeight: 1.3, fontSize: '1.05rem', maxWidth: { xs: '100%', sm: 400 } }}>
                                                                {segment.departure_airport.name} ({segment.departure_airport.id})
                                                            </Typography>
                                                            <Typography variant="body2" color="text.secondary" fontWeight="700" sx={{ mt: 0.5 }}>
                                                                {formatTime(segment.departure_airport.time)}
                                                            </Typography>
                                                        </Box>
                                                        <Box sx={{ textAlign: 'right', display: { xs: 'none', sm: 'block' }, minWidth: 200 }}>
                                                            {segment.extensions?.map((ext: string, eIdx: number) => (
                                                                <Typography key={eIdx} sx={{ ...flightDetailsStyles.metadataText, fontSize: '0.75rem' }}>{ext}</Typography>
                                                            ))}
                                                        </Box>
                                                    </Box>
                                                </Box>

                                                {/* Travel Time Row */}
                                                <Box sx={{ display: 'flex', gap: 3, mb: 3, pl: 5.5 }}>
                                                    <Typography sx={{ ...flightDetailsStyles.travelTimeText, fontSize: '0.9rem' }}>
                                                        Travel time: {formatDuration(segment.duration)}
                                                    </Typography>
                                                </Box>

                                                {/* Arrival Row */}
                                                <Box sx={{ display: 'flex', gap: 3, position: 'relative', zIndex: 2 }}>
                                                    <Box sx={{ ...flightDetailsStyles.timelineDot(theme), flexShrink: 0, mt: '6px' }} />
                                                    <Box sx={{ flex: 1 }}>
                                                        <Typography variant="body1" fontWeight="800" sx={{ lineHeight: 1.3, fontSize: '1.05rem', maxWidth: { xs: '100%', sm: 400 } }}>
                                                            {segment.arrival_airport.name} ({segment.arrival_airport.id})
                                                        </Typography>
                                                        <Typography variant="body2" color="text.secondary" fontWeight="700" sx={{ mt: 0.5 }}>
                                                            {formatTime(segment.arrival_airport.time)}
                                                        </Typography>
                                                    </Box>
                                                </Box>
                                            </Box>
                                        </Box>

                                        {flight.layovers && flight.layovers[idx] && (
                                            <Box sx={flightDetailsStyles.layoverBox(theme)}>
                                                <Typography sx={flightDetailsStyles.layoverText}>
                                                    {formatDuration(flight.layovers[idx].duration)} layover • {flight.layovers[idx].name} ({flight.layovers[idx].id})
                                                </Typography>
                                            </Box>
                                        )}
                                    </Fragment>
                                ))}
                            </Box>

                            <Divider sx={{ my: 6 }} />

                            <Grid container spacing={3}>
                                <Grid size={{ xs: 12, md: 6 }}>
                                    <Typography variant="h6" fontWeight="900" gutterBottom>Carbon Emissions</Typography>
                                    {flight.emissions ? (
                                        <Box sx={flightDetailsStyles.carbonSection(theme)}>
                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                                                <Co2Icon color="success" />
                                                <Typography variant="subtitle2" fontWeight="700">Estimated footprint</Typography>
                                            </Box>
                                            <Typography variant="h4" fontWeight="900">{(flight.emissions.this_flight / 1000).toFixed(0)} kg CO₂</Typography>
                                            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                                                {flight.emissions.difference_percent > 0 ? '+' : ''}{flight.emissions.difference_percent}% compared to route average
                                            </Typography>
                                        </Box>
                                    ) : (
                                        <Typography variant="body2" color="text.secondary">Emission data not available for this flight.</Typography>
                                    )}
                                </Grid>
                                <Grid size={{ xs: 12, md: 6 }}>
                                    <Typography variant="h6" fontWeight="900" gutterBottom>Amenities</Typography>
                                    <Stack direction="row" useFlexGap flexWrap="wrap" spacing={1}>
                                        <Chip icon={<LuggageIcon />} label="Carry-on included" sx={flightDetailsStyles.amenityChip(theme)} />
                                        {flight.extensions?.map((ext: string, idx: number) => {
                                            let icon = null;
                                            if (ext.toLowerCase().includes('wifi')) icon = <WifiIcon />;
                                            if (ext.toLowerCase().includes('power')) icon = <PowerIcon />;
                                            if (ext.toLowerCase().includes('video')) icon = <PersonalVideoIcon />;
                                            return <Chip key={idx} icon={icon || undefined} label={ext} sx={flightDetailsStyles.amenityChip(theme)} />;
                                        })}
                                    </Stack>
                                </Grid>
                            </Grid>
                        </Paper>

                        {/* Booking Options Section */}
                        {bookingOptions && bookingOptions.length > 0 && (
                            <Paper sx={flightDetailsStyles.bookingCard(theme)}>
                                {/* Primary Provider Expanded Section */}
                                {primaryProvider && (
                                    <Box>
                                        <Box sx={{ p: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                                <Box sx={flightDetailsStyles.airlineLogo}>
                                                    <img src={groupedBookings[primaryProvider][0].together?.airline_logos?.[0]} alt="logo" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                                                </Box>
                                                <Typography variant="h6" fontWeight="800">Book with {primaryProvider}</Typography>
                                                {groupedBookings[primaryProvider].some(opt => opt.together?.airline) && (
                                                    <Chip label="Airline" size="small" sx={{ height: 20, fontSize: '0.65rem', fontWeight: 800, bgcolor: 'rgba(0,0,0,0.05)' }} />
                                                )}
                                            </Box>
                                            <Button variant="text" size="small" endIcon={<ExpandMoreIcon />} sx={{ textTransform: 'none', fontWeight: 700, borderRadius: '100px' }}>
                                                Hide options
                                            </Button>
                                        </Box>

                                        <Box sx={flightDetailsStyles.fareGrid}>
                                            {groupedBookings[primaryProvider].map((option, idx) => (
                                                <Box key={idx} sx={flightDetailsStyles.fareColumn(theme)}>
                                                    <Box sx={flightDetailsStyles.fareHeader}>
                                                        <Typography variant="subtitle2" fontWeight="800" color="text.primary">
                                                            {option.together?.option_title || 'Fare'}
                                                        </Typography>
                                                        <Box sx={{ textAlign: 'right' }}>
                                                            <Typography variant="h6" fontWeight="900" sx={{ lineHeight: 1 }}>
                                                                ${option.together?.price}
                                                            </Typography>
                                                        </Box>
                                                    </Box>

                                                    <Box sx={flightDetailsStyles.fareBody}>
                                                        {option.together?.extensions?.map((ext: string, eIdx: number) => (
                                                            <Box key={eIdx} sx={flightDetailsStyles.featureRow}>
                                                                {getFeatureIcon(ext)}
                                                                <Typography variant="caption" color="text.secondary" fontWeight="500">
                                                                    {ext}
                                                                </Typography>
                                                            </Box>
                                                        ))}
                                                        {(!option.together?.extensions || option.together.extensions.length === 0) && (
                                                            <Typography variant="caption" color="text.secondary">Standard fare rules apply</Typography>
                                                        )}
                                                    </Box>

                                                    <Box sx={flightDetailsStyles.fareFooter}>
                                                        <Button
                                                            variant="contained"
                                                            fullWidth
                                                            sx={{
                                                                ...flightDetailsStyles.continueButton,
                                                                bgcolor: idx === 0 ? '#1a73e8' : 'transparent',
                                                                color: idx === 0 ? 'white' : '#1a73e8',
                                                                border: idx === 0 ? 'none' : '1px solid #dadce0',
                                                                '&:hover': {
                                                                    bgcolor: idx === 0 ? '#1765cc' : '#f8f9fa'
                                                                }
                                                            }}
                                                            onClick={() => handleBookOption(option.together?.booking_request)}
                                                        >
                                                            Continue
                                                        </Button>
                                                    </Box>
                                                </Box>
                                            ))}
                                        </Box>

                                        <Box sx={{ p: 2, px: 3, borderBottom: `1px solid ${theme.palette.divider}` }}>
                                            <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.7rem' }}>
                                                Fare and baggage fees apply to your entire trip. Bag fees may be higher at the airport.
                                            </Typography>
                                        </Box>
                                    </Box>
                                )}

                                {/* Other Providers List Section */}
                                <Box>
                                    {Object.keys(groupedBookings)
                                        .filter(name => name !== primaryProvider)
                                        .map((name, idx) => {
                                            const option = groupedBookings[name][0]; // Show first fare for other providers
                                            return (
                                                <Box key={idx} sx={flightDetailsStyles.bookingOptionRow(theme)}>
                                                    <Box sx={flightDetailsStyles.bookingProvider}>
                                                        <Box sx={flightDetailsStyles.airlineLogo}>
                                                            <img src={option.together?.airline_logos?.[0]} alt="logo" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                                                        </Box>
                                                        <Typography variant="body2" fontWeight="800">Book with {name}</Typography>
                                                    </Box>

                                                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                                        <Box sx={flightDetailsStyles.bookingPrice}>
                                                            <Typography variant="subtitle1" fontWeight="900">
                                                                ${option.together?.price}
                                                            </Typography>
                                                        </Box>
                                                        <Button
                                                            variant="outlined"
                                                            sx={flightDetailsStyles.selectButton()}
                                                            onClick={() => handleBookOption(option.together?.booking_request)}
                                                        >
                                                            Continue
                                                        </Button>
                                                    </Box>
                                                </Box>
                                            );
                                        })
                                    }
                                </Box>
                            </Paper>
                        )}

                        {loading && !bookingOptions.length && (
                            <Paper sx={{ ...flightDetailsStyles.bookingCard(theme), p: 8, textAlign: 'center' }}>
                                <CircularProgress size={30} sx={{ mb: 2 }} />
                                <Typography color="text.secondary" fontWeight="500">Searching for direct airline booking options...</Typography>
                            </Paper>
                        )}

                        {!loading && flight.bookingToken && !bookingOptions.length && (
                            <Paper sx={{ ...flightDetailsStyles.bookingCard(theme), p: 8, textAlign: 'center' }}>
                                <Typography color="text.secondary" fontWeight="500">Direct booking options are currently unavailable for this flight.</Typography>
                                <Button
                                    sx={{ mt: 2, textTransform: 'none', fontWeight: 700 }}
                                    onClick={() => window.open(flight.bookingLink, '_blank')}
                                >
                                    Try booking on Google Flights instead
                                </Button>
                            </Paper>
                        )}

                        <Paper sx={{ ...flightDetailsStyles.priceInsightsCard(theme), mt: 4 }}>
                            {(() => {
                                const isDark = theme.palette.mode === 'dark';
                                const colors = {
                                    low: isDark ? '#81c995' : '#34a853',
                                    typical: isDark ? '#fdd663' : '#fbbc04',
                                    high: isDark ? '#f28b82' : '#ea4335',
                                    lowBg: isDark ? 'rgba(129, 201, 149, 0.15)' : '#e6f4ea',
                                    typicalBg: isDark ? 'rgba(253, 214, 99, 0.15)' : '#fef7e0',
                                    highBg: isDark ? 'rgba(242, 139, 130, 0.15)' : '#fce8e6',
                                    lowText: isDark ? '#81c995' : '#137333',
                                    typicalText: isDark ? '#fdd663' : '#b06000',
                                    highText: isDark ? '#f28b82' : '#c5221f',
                                };

                                return (
                                    <Box sx={{ p: 0 }}>
                                        <Box sx={flightDetailsStyles.priceHeader}>
                                            <Box>
                                                <Typography variant="h6" fontWeight="500" sx={{ fontSize: '1.2rem', color: theme.palette.text.primary }}>
                                                    Prices are currently{' '}
                                                    <Box component="span" sx={{
                                                        color: priceLevel === 'high' ? colors.high : priceLevel === 'low' ? colors.low : colors.typical,
                                                        fontWeight: 800
                                                    }}>
                                                        {priceLevel === 'low' ? 'low (Great Deal!)' : priceLevel}
                                                    </Box>
                                                    {' '}for your search
                                                </Typography>
                                            </Box>
                                            <IconButton size="small">
                                                <KeyboardArrowUpIcon />
                                            </IconButton>
                                        </Box>

                                        <Typography variant="body2" color="text.secondary" sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mb: 1, fontSize: '0.85rem' }}>
                                            {flight.arrival.code} search usually cost between ${priceAnalysis.typicalLow}–${priceAnalysis.typicalHigh}.
                                            <InfoOutlinedIcon sx={{ fontSize: 16, ml: 0.5, opacity: 0.7 }} />
                                        </Typography>

                                        <Box sx={flightDetailsStyles.priceLevelBar}>
                                            <Box sx={{ ...flightDetailsStyles.priceBarSegment(colors.low), flex: `0 0 ${priceAnalysis.lowPos}%` }} />
                                            <Box sx={{ ...flightDetailsStyles.priceBarSegment(colors.typical), flex: `0 0 ${priceAnalysis.highPos - priceAnalysis.lowPos}%` }} />
                                            <Box sx={{ ...flightDetailsStyles.priceBarSegment(colors.high), flex: `0 0 ${100 - priceAnalysis.highPos}%` }} />

                                            <Box sx={{ ...flightDetailsStyles.priceMarker, left: `${priceAnalysis.currentPos}%` }}>
                                                <Box sx={{
                                                    ...flightDetailsStyles.priceMarkerPopup,
                                                    bgcolor: priceLevel === 'low' ? colors.lowBg : priceLevel === 'high' ? colors.highBg : colors.typicalBg,
                                                    color: priceLevel === 'low' ? colors.lowText : priceLevel === 'high' ? colors.highText : colors.typicalText,
                                                    border: isDark ? `1px solid ${priceLevel === 'low' ? 'rgba(129, 201, 149, 0.3)' : priceLevel === 'high' ? 'rgba(242, 139, 130, 0.3)' : 'rgba(253, 214, 99, 0.3)'}` : 'none',
                                                    '&:after': {
                                                        ...flightDetailsStyles.priceMarkerPopup['&:after'],
                                                        borderTopColor: isDark ? (priceLevel === 'low' ? 'rgba(129, 201, 149, 0.3)' : priceLevel === 'high' ? 'rgba(242, 139, 130, 0.3)' : 'rgba(253, 214, 99, 0.15)') : (priceLevel === 'low' ? '#e6f4ea' : priceLevel === 'high' ? '#fce8e6' : '#fef7e0'),
                                                    }
                                                }}>
                                                    ${flight.price} is {priceLevel}
                                                </Box>
                                                <Box sx={{
                                                    ...flightDetailsStyles.priceDot,
                                                    bgcolor: priceLevel === 'low' ? colors.low : priceLevel === 'high' ? colors.high : colors.typical,
                                                    boxShadow: isDark ? `0 0 10px ${priceLevel === 'low' ? colors.low : priceLevel === 'high' ? colors.high : colors.typical}` : 'none'
                                                }} />
                                            </Box>
                                        </Box>
                                    </Box>
                                );
                            })()}

                            <Box sx={{ display: 'flex', mt: -3, mb: 4, px: 0, position: 'relative', height: 20 }}>
                                <Typography variant="caption" color="text.secondary" fontWeight="700" sx={{
                                    position: 'absolute',
                                    left: `${priceAnalysis.lowPos}%`,
                                    transform: 'translateX(-50%)',
                                    fontSize: '0.65rem'
                                }}>
                                    ${priceAnalysis.typicalLow}
                                </Typography>
                                <Typography variant="caption" color="text.secondary" fontWeight="700" sx={{
                                    position: 'absolute',
                                    left: `${priceAnalysis.highPos}%`,
                                    transform: 'translateX(-50%)',
                                    fontSize: '0.65rem'
                                }}>
                                    ${priceAnalysis.typicalHigh}
                                </Typography>
                            </Box>

                            <Box sx={{ bgcolor: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.02)', p: 2, borderRadius: 3, mb: 3 }}>
                                <Typography variant="subtitle2" fontWeight="800" sx={{ fontSize: '0.8rem', color: 'primary.main', textTransform: 'uppercase' }}>
                                    Statistics
                                </Typography>
                                <Grid container spacing={2}>
                                    <Grid size={{ xs: 6 }}>
                                        <Typography variant="caption" color="text.secondary">Average</Typography>
                                        <Typography variant="body2" fontWeight="700">${Math.round(priceAnalysis.avgPrice)}</Typography>
                                    </Grid>
                                    <Grid size={{ xs: 6 }}>
                                        <Typography variant="caption" color="text.secondary">Market</Typography>
                                        <Typography variant="body2" fontWeight="700">Cheaper than {priceAnalysis.cheaperPercent}%</Typography>
                                    </Grid>
                                </Grid>
                            </Box>

                            <Box sx={flightDetailsStyles.chartContainer}>
                                <ResponsiveContainer width="100%" height={250}>
                                    <AreaChart data={priceTrends} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                                        <defs>
                                            <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor={theme.palette.mode === 'dark' ? '#fff' : theme.palette.primary.main} stopOpacity={0.2} />
                                                <stop offset="95%" stopColor={theme.palette.mode === 'dark' ? '#fff' : theme.palette.primary.main} stopOpacity={0} />
                                            </linearGradient>
                                        </defs>
                                        <CartesianGrid strokeDasharray="0" vertical={false} stroke={theme.palette.divider} opacity={0.5} />
                                        <XAxis
                                            dataKey="date"
                                            axisLine={false}
                                            tickLine={false}
                                            tickFormatter={formatGraphXAxis}
                                            tick={{ fill: theme.palette.text.secondary, fontSize: 10, fontWeight: 500 }}
                                            interval={0}
                                        />
                                        <YAxis
                                            axisLine={false}
                                            tickLine={false}
                                            tick={{ fill: theme.palette.text.secondary, fontSize: 10, fontWeight: 500 }}
                                            domain={['dataMin - 100', 'dataMax + 100']}
                                            tickFormatter={(val) => `$${val}`}
                                            orientation="left"
                                        />
                                        <Tooltip
                                            contentStyle={{
                                                backgroundColor: theme.palette.mode === 'dark' ? '#1e1e1e' : '#ffffff',
                                                borderRadius: '12px',
                                                border: `1px solid ${theme.palette.divider}`,
                                                boxShadow: '0 8px 32px rgba(0,0,0,0.15)',
                                                padding: '12px',
                                                fontSize: '0.85rem'
                                            }}
                                            itemStyle={{ color: theme.palette.mode === 'dark' ? '#fff' : theme.palette.primary.main, fontWeight: 800, padding: 0 }}
                                            labelStyle={{ color: theme.palette.text.secondary, fontWeight: 600, marginBottom: 6 }}
                                            formatter={(value: any) => [`$${value}`, 'Price']}
                                            cursor={{ stroke: theme.palette.mode === 'dark' ? '#fff' : theme.palette.primary.main, strokeWidth: 1, strokeDasharray: '4 4' }}
                                        />
                                        <Area
                                            type="stepAfter"
                                            dataKey="price"
                                            stroke={theme.palette.mode === 'dark' ? '#fff' : theme.palette.primary.main}
                                            strokeWidth={2.5}
                                            fillOpacity={1}
                                            fill="url(#colorPrice)"
                                            animationDuration={1500}
                                        />
                                    </AreaChart>
                                </ResponsiveContainer>
                            </Box>
                            <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 3, textAlign: 'center', fontSize: '0.75rem', opacity: 0.8 }}>
                                Historical pricing for the last 60 days
                            </Typography>
                        </Paper>
                    </Grid>

                    <Grid size={{ xs: 12, md: 4 }}>
                        <Box sx={{ position: 'sticky', top: 90, zIndex: 10 }}>
                            <Paper sx={flightDetailsStyles.mapCard(theme)}>
                                <Box sx={{ p: 3, borderBottom: `1px solid ${theme.palette.divider}` }}>
                                    <Typography variant="h6" fontWeight="900">Route Map</Typography>
                                </Box>
                                <Box sx={flightDetailsStyles.mapContainer}>
                                    <Map
                                        initialViewState={{
                                            longitude: (start[0] + end[0]) / 2,
                                            latitude: (start[1] + end[1]) / 2,
                                            zoom: 3,
                                            pitch: 60,
                                            bearing: -20
                                        }}
                                        style={{ width: '100%', height: '100%' }}
                                        mapStyle="mapbox://styles/mapbox/outdoors-v12"
                                        mapboxAccessToken={MAPBOX_TOKEN}
                                        terrain={{ source: 'mapbox-dem', exaggeration: 1.5 }}
                                    >
                                        <Source id="mapbox-dem" type="raster-dem" url="mapbox://mapbox.mapbox-terrain-dem-v1" tileSize={512} maxzoom={14} />

                                        <Marker longitude={start[0]} latitude={start[1]}>
                                            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                                <FlightTakeoffIcon sx={{ color: 'primary.main', fontSize: 24, mb: -0.5, transform: 'rotate(-45deg)' }} />
                                                <Box sx={{ bgcolor: 'primary.main', px: 1, borderRadius: 1, my: 0.5 }}>
                                                    <Typography sx={{ color: 'white', fontSize: '0.7rem', fontWeight: 900 }}>
                                                        {formatTime(flight.departure.at)}
                                                    </Typography>
                                                </Box>
                                                <Box sx={{ width: 12, height: 12, bgcolor: 'primary.main', borderRadius: '50%', border: '2px solid white' }} />
                                            </Box>
                                        </Marker>

                                        <Marker longitude={end[0]} latitude={end[1]}>
                                            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                                <FlightLandIcon sx={{ color: 'secondary.main', fontSize: 24, mb: -0.5, transform: 'rotate(45deg)' }} />
                                                <Box sx={{ bgcolor: 'secondary.main', px: 1, borderRadius: 1, my: 0.5 }}>
                                                    <Typography sx={{ color: 'white', fontSize: '0.7rem', fontWeight: 900 }}>
                                                        {formatTime(flight.arrival.at)}
                                                    </Typography>
                                                </Box>
                                                <Box sx={{ width: 12, height: 12, bgcolor: 'secondary.main', borderRadius: '50%', border: '2px solid white' }} />
                                            </Box>
                                        </Marker>

                                        <Source id="route" type="geojson" data={arcData}>
                                            <Layer {...lineLayer} />
                                            <Layer {...labelLayer} />
                                        </Source>
                                    </Map>
                                </Box>
                                <Box sx={{ p: 3 }}>
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                                        <Typography variant="caption" color="text.secondary" fontWeight="700">FROM</Typography>
                                        <Typography variant="caption" color="text.secondary" fontWeight="700">TO</Typography>
                                    </Box>
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                        <Typography variant="h6" fontWeight="900">{flight.departure.code}</Typography>
                                        <Box sx={{ height: 2, bgcolor: 'divider', flex: 1, mx: 2, alignSelf: 'center', position: 'relative' }}>
                                            <Box sx={{ position: 'absolute', right: 0, top: -4, width: 8, height: 8, bgcolor: 'primary.main', borderRadius: '50%' }} />
                                        </Box>
                                        <Typography variant="h6" fontWeight="900">{flight.arrival.code}</Typography>
                                    </Box>
                                </Box>
                            </Paper>
                        </Box>
                    </Grid>
                </Grid>
            </Container>
        </Box >
    );
};

export default FlightDetails;
