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

    const [originOptions, setOriginOptions] = useState<AutocompleteResult[]>([]);
    const [destOptions, setDestOptions] = useState<AutocompleteResult[]>([]);
    const [loadingOrigin, setLoadingOrigin] = useState(false);
    const [loadingDest, setLoadingDest] = useState(false);

    const [originValue, setOriginValue] = useState<AutocompleteResult | null>(null);
    const [destValue, setDestValue] = useState<AutocompleteResult | null>(null);

    const [originQuery, setOriginQuery] = useState('');
    const [destQuery, setDestQuery] = useState('');

    const getHybridOptions = async (query: string): Promise<AutocompleteResult[]> => {
        try {
            const apiResults = await serpApiService.getAutocomplete(query);
            if (apiResults && apiResults.length > 0) return apiResults;
        } catch (err) {
            console.warn("SerpApi Autocomplete failed, falling back to local:", err);
        }

        const localAirports = searchAirports(query, 20);
        return localAirports.map(a => ({
            id: a.id,
            title: a.name,
            subtitle: `${a.city}, ${a.country}`,
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

    useEffect(() => {
        const syncValue = (code: string, currentVal: AutocompleteResult | null, setter: (v: AutocompleteResult | null) => void) => {
            if (!code) {
                if (currentVal) setter(null);
                return;
            }
            if (currentVal && currentVal.id === code) return;

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


    return (
        <Paper sx={flightFormStyles.paper(theme)}>
            <Box sx={flightFormStyles.tabs}>
                <Tabs
                    value={tabValue}
                    onChange={handleTabChange}
                    textColor="primary"
                    indicatorColor="primary"
                    sx={flightFormStyles.tabsContainer(theme)}
                >
                    <Tab label="Round-trip" sx={flightFormStyles.tabItem} />
                    <Tab label="One-way" sx={flightFormStyles.tabItem} />
                </Tabs>
            </Box>

            <Box sx={flightFormStyles.formContainer}>
                <Box sx={flightFormStyles.locationGrid}>
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
                                <Box component="li" key={option.id} {...optionProps} sx={flightFormStyles.autocompleteOption(isAirport)}>
                                    <Box sx={flightFormStyles.optionContent}>
                                        {isAirport ? (
                                            <FlightIcon fontSize="small" color="secondary" sx={flightFormStyles.optionIcon} />
                                        ) : (
                                            <LocationOnIcon fontSize="small" color="primary" />
                                        )}
                                        <Box sx={flightFormStyles.optionTextWrapper}>
                                            <Box sx={flightFormStyles.optionTitleRow}>
                                                <Typography variant="body2" noWrap sx={flightFormStyles.optionTitle(isAirport)}>
                                                    {option.title}
                                                </Typography>
                                                {isAirport && (
                                                    <Typography variant="caption" sx={flightFormStyles.optionCode}>
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
                        sx={flightFormStyles.swapButton}
                    >
                        <SyncAltIcon />
                    </IconButton>

                    <Box sx={flightFormStyles.destinationWrapper}>
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
                                    <Box component="li" key={option.id} {...optionProps} sx={flightFormStyles.autocompleteOption(isAirport)}>
                                        <Box sx={flightFormStyles.optionContent}>
                                            {isAirport ? (
                                                <FlightIcon fontSize="small" color="secondary" sx={flightFormStyles.optionIcon} />
                                            ) : (
                                                <LocationOnIcon fontSize="small" color="primary" />
                                            )}
                                            <Box sx={flightFormStyles.optionTextWrapper}>
                                                <Box sx={flightFormStyles.optionTitleRow}>
                                                    <Typography variant="body2" noWrap sx={flightFormStyles.optionTitle(isAirport)}>
                                                        {option.title}
                                                    </Typography>
                                                    {isAirport && (
                                                        <Typography variant="caption" sx={flightFormStyles.optionCode}>
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

                <Box sx={flightFormStyles.dateGrid}>
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

                <Box sx={flightFormStyles.passengersWrapper}>
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

                <Box sx={flightFormStyles.searchButtonWrapper}>
                    <Button
                        fullWidth
                        variant="contained"
                        color="secondary"
                        onClick={handleSearch}
                        disabled={searchLoading}
                        sx={flightFormStyles.searchButton}
                    >
                        {searchLoading ? <CircularProgress size={24} color="inherit" /> : <SearchIcon />}
                    </Button>
                </Box>
            </Box>
        </Paper>
    );
};

export default FlightSearchForm;
