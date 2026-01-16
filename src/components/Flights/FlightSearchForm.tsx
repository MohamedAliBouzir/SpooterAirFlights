import { Box, Paper, TextField, Button, Tabs, Tab, useTheme, IconButton, InputAdornment, Autocomplete, CircularProgress, Typography } from '@mui/material';
import { useState, useCallback, useEffect } from 'react';
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import FlightLandIcon from '@mui/icons-material/FlightLand';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import PersonIcon from '@mui/icons-material/Person';
import SearchIcon from '@mui/icons-material/Search';
import SyncAltIcon from '@mui/icons-material/SyncAlt';
import FlightIcon from '@mui/icons-material/Flight';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { useFlightStore } from '@/hooks/useFlightStore';
import { useNavigate } from 'react-router-dom';
import { flightFormStyles } from '@/styles/components/Flights/FlightSearchForm.style';
import { getAirportByCode, searchAirports } from '@/data/airports';
import { serpApiService, type AutocompleteResult } from '@/services/serpApi';
import { debounce } from 'lodash';

const FlightSearchForm = () => {
    const theme = useTheme();
    const navigate = useNavigate();
    const { searchParams, setSearchParams, searchFlights, swapLocations } = useFlightStore();
    const [tabValue, setTabValue] = useState(0);
    const [searchLoading, setSearchLoading] = useState(false);

    // Autocomplete states
    const [originOptions, setOriginOptions] = useState<AutocompleteResult[]>([]);
    const [destOptions, setDestOptions] = useState<AutocompleteResult[]>([]);
    const [loadingOrigin, setLoadingOrigin] = useState(false);
    const [loadingDest, setLoadingDest] = useState(false);

    const [originValue, setOriginValue] = useState<AutocompleteResult | null>(null);
    const [destValue, setDestValue] = useState<AutocompleteResult | null>(null);

    // Queries
    const [originQuery, setOriginQuery] = useState('');
    const [destQuery, setDestQuery] = useState('');

    // Helper to fallback to local data
    const getHybridOptions = async (query: string): Promise<AutocompleteResult[]> => {
        try {
            // Only search Flights Autocomplete to avoid Hotels showing up
            const apiResults = await serpApiService.getAutocomplete(query);
            if (apiResults && apiResults.length > 0) return apiResults;
        } catch (err) {
            console.warn("SerpApi Autocomplete failed, falling back to local:", err);
        }

        // Local fallback
        const localAirports = searchAirports(query, 20);

        // Map local airports to AutocompleteResult
        // We do NOT add fake "City" headers as selectable options to avoid ID errors.
        // Instead, we rely on the UI to group them if we want, or just list them.
        // Given the goal is "list of airports", returning them directly is safest.
        return localAirports.map(a => ({
            id: a.id,
            title: a.name,
            subtitle: `${a.city}, ${a.country}`, // This can be used for grouping
            type: 'airport'
        }));
    };

    const fetchOriginOptions = useCallback(
        debounce(async (query: string) => {
            if (!query) {
                setOriginOptions([]);
                return;
            }
            setLoadingOrigin(true);
            try {
                const results = await getHybridOptions(query);
                setOriginOptions(results);
            } finally {
                setLoadingOrigin(false);
            }
        }, 500),
        []
    );

    const fetchDestOptions = useCallback(
        debounce(async (query: string) => {
            if (!query) {
                setDestOptions([]);
                return;
            }
            setLoadingDest(true);
            try {
                const results = await getHybridOptions(query);
                setDestOptions(results);
            } finally {
                setLoadingDest(false);
            }
        }, 500),
        []
    );

    // Initialize/Sync values with SearchParams
    useEffect(() => {
        const syncValue = (code: string, currentVal: AutocompleteResult | null, setter: (v: AutocompleteResult | null) => void) => {
            if (!code) {
                if (currentVal) setter(null);
                return;
            }
            // If we already have the correct object, don't change it
            if (currentVal && currentVal.id === code) return;

            // Try to resolve from local DB as fallback
            const local = getAirportByCode(code);
            if (local) {
                const localAny = local as any;
                setter({
                    id: localAny.id || localAny.code || code,
                    title: localAny.name || localAny.title || code,
                    subtitle: localAny.city || localAny.country || 'Airport',
                    type: 'airport'
                });
            } else {
                // If not in local, just set a placeholder with the code
                setter({
                    id: code,
                    title: code,
                    subtitle: 'Selected',
                    type: 'airport'
                });
            }
        };

        syncValue(searchParams.origin, originValue, setOriginValue);
        syncValue(searchParams.destination, destValue, setDestValue);
    }, [searchParams.origin, searchParams.destination]);

    const handleTabChange = (_: any, newValue: number) => {
        setTabValue(newValue);
        const tripTypes: ('round-trip' | 'one-way')[] = ['round-trip', 'one-way'];
        setSearchParams({ tripType: tripTypes[newValue] });

        // Clear return date for one-way trips
        if (newValue === 1) {
            setSearchParams({ returnDate: null });
        }
    };

    const handleSearch = async () => {
        setSearchLoading(true);
        try {
            await searchFlights();
            navigate('/flights');
        } finally {
            setSearchLoading(false);
        }
    };

    // Debounced search function
    const debouncedSearch = useCallback(
        debounce(() => {
            handleSearch();
        }, 500),
        []
    );

    // Auto-search when both origin and destination are selected
    useEffect(() => {
        if (searchParams.origin && searchParams.destination) {
            debouncedSearch();
        }
        return () => {
            debouncedSearch.cancel();
        };
    }, [searchParams.origin, searchParams.destination, debouncedSearch]);

    return (
        <Paper sx={flightFormStyles.paper(theme)}>
            <Box sx={flightFormStyles.tabs}>
                <Tabs
                    value={tabValue}
                    onChange={handleTabChange}
                    textColor="primary"
                    indicatorColor="primary"
                    sx={{
                        '& .MuiTab-root': {
                            color: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.6)',
                            '&.Mui-selected': {
                                color: theme.palette.mode === 'dark' ? '#fff' : theme.palette.primary.main,
                            }
                        }
                    }}
                >
                    <Tab label="Round-trip" sx={{ textTransform: 'none', fontWeight: 600 }} />
                    <Tab label="One-way" sx={{ textTransform: 'none', fontWeight: 600 }} />
                </Tabs>
            </Box>

            <Box sx={{
                display: 'flex',
                flexDirection: { xs: 'column', md: 'row' },
                gap: 2,
                ...flightFormStyles.gridContainer
            }}>
                {/* Origin & Destination */}
                {/* Origin & Destination */}
                {/* Origin & Destination */}
                <Box sx={{
                    flex: { xs: '1 1 auto', md: 5 },
                    display: 'grid',
                    gridTemplateColumns: { xs: '1fr auto', md: '1fr auto 1fr' },
                    gap: { xs: 2, md: 1 },
                    alignItems: 'center'
                }}>
                    <Autocomplete
                        fullWidth
                        options={originOptions}
                        loading={loadingOrigin}
                        value={originValue}
                        onChange={(_, newValue) => {
                            if (newValue) {
                                setOriginValue(newValue);
                                setSearchParams({ origin: newValue.id });
                            } else {
                                setOriginValue(null);
                                setSearchParams({ origin: '' });
                            }
                        }}
                        inputValue={originQuery}
                        onInputChange={(_, newInputValue) => {
                            setOriginQuery(newInputValue);
                            fetchOriginOptions(newInputValue);
                        }}
                        getOptionLabel={(option) => option.title || ''}
                        isOptionEqualToValue={(option, value) => option.id === value.id}
                        filterOptions={(x) => x}
                        groupBy={(option) => option.type === 'airport' ? option.subtitle : ''}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label="From"
                                placeholder="City or Airport"
                                sx={flightFormStyles.textField}
                                InputProps={{
                                    ...params.InputProps,
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <FlightTakeoffIcon color="action" />
                                        </InputAdornment>
                                    ),
                                    endAdornment: (
                                        <>
                                            {loadingOrigin ? <CircularProgress color="inherit" size={20} /> : null}
                                            {params.InputProps.endAdornment}
                                        </>
                                    ),
                                }}
                            />
                        )}
                        renderOption={(props, option) => {
                            const { key, ...optionProps } = props as any;
                            const isAirport = option.type === 'airport';
                            return (
                                <Box component="li" key={option.id} {...optionProps} sx={{
                                    py: 1,
                                    pl: isAirport ? 4 : 2,
                                    borderBottom: '1px solid',
                                    borderColor: 'divider'
                                }}>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, width: '100%' }}>
                                        {isAirport ? (
                                            <FlightIcon fontSize="small" color="secondary" sx={{ opacity: 0.7 }} />
                                        ) : (
                                            <LocationOnIcon fontSize="small" color="primary" />
                                        )}
                                        <Box sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1, overflow: 'hidden' }}>
                                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                                                <Typography variant="body2" noWrap sx={{ fontWeight: isAirport ? 400 : 700 }}>
                                                    {option.title}
                                                </Typography>
                                                {isAirport && (
                                                    <Typography variant="caption" sx={{ fontWeight: 'bold', ml: 1, color: 'text.secondary' }}>
                                                        {option.id}
                                                    </Typography>
                                                )}
                                            </Box>
                                            <Typography variant="caption" color="text.secondary" noWrap>
                                                {option.subtitle}
                                            </Typography>
                                        </Box>
                                    </Box>
                                </Box>
                            );
                        }}
                    />

                    <IconButton
                        onClick={swapLocations}
                        sx={{ bgcolor: 'action.hover' }}
                    >
                        <SyncAltIcon />
                    </IconButton>

                    <Box sx={{ gridColumn: { xs: '1 / -1', md: 'auto' } }}>
                        <Autocomplete
                            fullWidth
                            options={destOptions}
                            loading={loadingDest}
                            value={destValue}
                            onChange={(_, newValue) => {
                                if (newValue) {
                                    setDestValue(newValue);
                                    setSearchParams({ destination: newValue.id });
                                } else {
                                    setDestValue(null);
                                    setSearchParams({ destination: '' });
                                }
                            }}
                            inputValue={destQuery}
                            onInputChange={(_, newInputValue) => {
                                setDestQuery(newInputValue);
                                fetchDestOptions(newInputValue);
                            }}
                            getOptionLabel={(option) => option.title || ''}
                            isOptionEqualToValue={(option, value) => option.id === value.id}
                            filterOptions={(x) => x}
                            groupBy={(option) => option.type === 'airport' ? option.subtitle : ''}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label="To"
                                    placeholder="City or Airport"
                                    sx={flightFormStyles.textField}
                                    InputProps={{
                                        ...params.InputProps,
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <FlightLandIcon color="action" />
                                            </InputAdornment>
                                        ),
                                        endAdornment: (
                                            <>
                                                {loadingDest ? <CircularProgress color="inherit" size={20} /> : null}
                                                {params.InputProps.endAdornment}
                                            </>
                                        ),
                                    }}
                                />
                            )}
                            renderOption={(props, option) => {
                                const { key, ...optionProps } = props as any;
                                const isAirport = option.type === 'airport';
                                return (
                                    <Box component="li" key={option.id} {...optionProps} sx={{
                                        py: 1,
                                        pl: isAirport ? 4 : 2,
                                        borderBottom: '1px solid',
                                        borderColor: 'divider'
                                    }}>
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, width: '100%' }}>
                                            {isAirport ? (
                                                <FlightIcon fontSize="small" color="secondary" sx={{ opacity: 0.7 }} />
                                            ) : (
                                                <LocationOnIcon fontSize="small" color="primary" />
                                            )}
                                            <Box sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1, overflow: 'hidden' }}>
                                                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                                                    <Typography variant="body2" noWrap sx={{ fontWeight: isAirport ? 400 : 700 }}>
                                                        {option.title}
                                                    </Typography>
                                                    {isAirport && (
                                                        <Typography variant="caption" sx={{ fontWeight: 'bold', ml: 1, color: 'text.secondary' }}>
                                                            {option.id}
                                                        </Typography>
                                                    )}
                                                </Box>
                                                <Typography variant="caption" color="text.secondary" noWrap>
                                                    {option.subtitle}
                                                </Typography>
                                            </Box>
                                        </Box>
                                    </Box>
                                );
                            }}
                        />
                    </Box>
                </Box>

                {/* Dates */}
                <Box sx={{
                    flex: { xs: '1 1 auto', md: 4 },
                    display: 'flex',
                    flexDirection: { xs: 'column', md: 'row' },
                    gap: 1
                }}>
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
                            inputProps: {
                                min: new Date().toISOString().split('T')[0]
                            }
                        }}
                    />
                    {searchParams.tripType === 'round-trip' && (
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
                                inputProps: {
                                    min: searchParams.departureDate || new Date().toISOString().split('T')[0]
                                }
                            }}
                        />
                    )}
                </Box>

                {/* Travelers */}
                <Box sx={{ flex: { xs: '1 1 auto', md: 2 } }}>
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
                </Box>

                {/* Search Button */}
                <Box sx={{ flex: { xs: '1 1 auto', md: 1 } }}>
                    <Button
                        fullWidth
                        variant="contained"
                        color="secondary"
                        onClick={handleSearch}
                        disabled={searchLoading}
                        sx={{ ...flightFormStyles.searchButton, height: '100%', minHeight: 56 }}
                    >
                        {searchLoading ? <CircularProgress size={24} color="inherit" /> : <SearchIcon />}
                    </Button>
                </Box>
            </Box>
        </Paper>
    );
};

export default FlightSearchForm;
