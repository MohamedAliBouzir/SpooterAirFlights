import { Box, Paper, TextField, Button, Grid, Tabs, Tab, useTheme, IconButton, InputAdornment } from '@mui/material';
import { useState } from 'react';
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import FlightLandIcon from '@mui/icons-material/FlightLand';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import PersonIcon from '@mui/icons-material/Person';
import SearchIcon from '@mui/icons-material/Search';
import SyncAltIcon from '@mui/icons-material/SyncAlt';
import { useFlightStore } from '@/hooks/useFlightStore';
import { useNavigate } from 'react-router-dom';
import { flightFormStyles } from '@/styles/components/Flights/FlightSearchForm.style';

const FlightSearchForm = () => {
    const theme = useTheme();
    const navigate = useNavigate();
    const { searchParams, setSearchParams, searchFlights } = useFlightStore();
    const [tabValue, setTabValue] = useState(0);

    const handleTabChange = (_: any, newValue: number) => {
        setTabValue(newValue);
    };

    const handleSearch = () => {
        searchFlights();
        navigate('/flights');
    };

    return (
        <Paper sx={flightFormStyles.paper(theme)}>
            <Box sx={flightFormStyles.tabs}>
                <Tabs value={tabValue} onChange={handleTabChange} textColor="primary" indicatorColor="primary">
                    <Tab label="Round-trip" sx={{ textTransform: 'none', fontWeight: 600 }} />
                    <Tab label="One-way" sx={{ textTransform: 'none', fontWeight: 600 }} />
                    <Tab label="Multi-city" sx={{ textTransform: 'none', fontWeight: 600 }} />
                </Tabs>
            </Box>

            <Grid container spacing={2} sx={flightFormStyles.gridContainer}>
                <Grid size={{ xs: 12, md: 5 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <TextField
                            fullWidth
                            label="From"
                            placeholder="Departure City"
                            value={searchParams.origin}
                            onChange={(e) => setSearchParams({ origin: e.target.value })}
                            sx={flightFormStyles.textField}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <FlightTakeoffIcon color="action" />
                                    </InputAdornment>
                                ),
                            }}
                        />
                        <IconButton sx={{ bgcolor: 'action.hover' }}>
                            <SyncAltIcon />
                        </IconButton>
                        <TextField
                            fullWidth
                            label="To"
                            placeholder="Arrival City"
                            value={searchParams.destination}
                            onChange={(e) => setSearchParams({ destination: e.target.value })}
                            sx={flightFormStyles.textField}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <FlightLandIcon color="action" />
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </Box>
                </Grid>

                <Grid size={{ xs: 12, md: 4 }}>
                    <Box sx={{ display: 'flex', gap: 1 }}>
                        <TextField
                            fullWidth
                            label="Departure"
                            type="date"
                            value={searchParams.departureDate || ''}
                            onChange={(e) => setSearchParams({ departureDate: e.target.value })}
                            sx={flightFormStyles.textField}
                            InputLabelProps={{ shrink: true }}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <CalendarMonthIcon color="action" />
                                    </InputAdornment>
                                ),
                            }}
                        />
                        <TextField
                            fullWidth
                            label="Return"
                            type="date"
                            value={searchParams.returnDate || ''}
                            onChange={(e) => setSearchParams({ returnDate: e.target.value })}
                            sx={flightFormStyles.textField}
                            InputLabelProps={{ shrink: true }}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <CalendarMonthIcon color="action" />
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </Box>
                </Grid>

                <Grid size={{ xs: 12, md: 2 }}>
                    <TextField
                        fullWidth
                        label="Travelers"
                        value={searchParams.passengers}
                        onChange={(e) => setSearchParams({ passengers: parseInt(e.target.value) || 1 })}
                        type="number"
                        sx={flightFormStyles.textField}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <PersonIcon color="action" />
                                </InputAdornment>
                            ),
                        }}
                    />
                </Grid>

                <Grid size={{ xs: 12, md: 1 }}>
                    <Button
                        fullWidth
                        variant="contained"
                        color="secondary"
                        onClick={handleSearch}
                        sx={flightFormStyles.searchButton}
                    >
                        <SearchIcon />
                    </Button>
                </Grid>
            </Grid>
        </Paper>
    );
};

export default FlightSearchForm;
