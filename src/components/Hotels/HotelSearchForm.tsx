import { Box, Paper, TextField, Button, useTheme, InputAdornment, Autocomplete } from '@mui/material';
import { useState, useCallback, useEffect } from 'react';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import PersonIcon from '@mui/icons-material/Person';
import SearchIcon from '@mui/icons-material/Search';
import { useHotelStore } from '@/hooks/useHotelStore';
import { hotelFormStyles } from '@/styles/components/Hotels/HotelSearchForm.style';
import { type HotelAutocompleteResult } from '@/services/serpApi';

const HotelSearchForm = () => {
    const theme = useTheme();
    const { searchParams, setSearchParams, searchHotels } = useHotelStore();

    const [allLocations, setAllLocations] = useState<HotelAutocompleteResult[]>([]);
    const [options, setOptions] = useState<HotelAutocompleteResult[]>([]);

    useEffect(() => {
        const loadLocations = async () => {
            try {
                const response = await fetch('/google-countries.json');
                const countries = await response.json();
                const formattedCountries = countries.map((c: any) => ({
                    id: c.country_code,
                    title: c.country_name,
                    subtitle: 'Country',
                    type: 'location'
                }));

                const popularCities = [
                    { id: 'city-paris', title: 'Paris', subtitle: 'France', type: 'location' },
                    { id: 'city-london', title: 'London', subtitle: 'United Kingdom', type: 'location' },
                    { id: 'city-ny', title: 'New York', subtitle: 'USA', type: 'location' },
                    { id: 'city-la', title: 'Los Angeles', subtitle: 'USA', type: 'location' },
                    { id: 'city-dubai', title: 'Dubai', subtitle: 'United Arab Emirates', type: 'location' },
                    { id: 'city-sousse', title: 'Sousse', subtitle: 'Tunisia', type: 'location' },
                    { id: 'city-tokyo', title: 'Tokyo', subtitle: 'Japan', type: 'location' },
                    { id: 'city-rome', title: 'Rome', subtitle: 'Italy', type: 'location' },
                    { id: 'city-barcelona', title: 'Barcelona', subtitle: 'Spain', type: 'location' },
                    { id: 'city-istanbul', title: 'Istanbul', subtitle: 'Turkey', type: 'location' },
                    { id: 'city-bangkok', title: 'Bangkok', subtitle: 'Thailand', type: 'location' },
                    { id: 'city-singapore', title: 'Singapore', subtitle: 'Singapore', type: 'location' },
                ];

                const combined = [...popularCities, ...formattedCountries];
                setAllLocations(combined);

                setOptions(combined.slice(0, 20));
            } catch (error) {
                console.error("Failed to load locations", error);
            }
        };
        loadLocations();
    }, []);

    const fetchOptions = useCallback((query: string) => {
        if (!query) {
            setOptions(allLocations.slice(0, 20));
            return;
        }

        const lowerQuery = query.toLowerCase();
        const filtered = allLocations.filter(loc =>
            loc.title.toLowerCase().includes(lowerQuery) ||
            loc.subtitle.toLowerCase().includes(lowerQuery)
        ).slice(0, 20);

        setOptions(filtered);
    }, [allLocations]);

    const handleSearch = () => {
        searchHotels();
    };

    return (
        <Paper sx={hotelFormStyles.paper(theme)}>
            <Box sx={{
                display: 'grid',
                gridTemplateColumns: { xs: '1fr', md: 'repeat(12, 1fr)' },
                gap: 2,
                ...hotelFormStyles.gridContainer
            }}>
                <Box sx={{ gridColumn: { xs: 'span 1', md: 'span 6', lg: 'span 3' } }}>
                    <Autocomplete
                        fullWidth
                        options={options}
                        getOptionLabel={(option) => {
                            if (typeof option === 'string') return option;
                            return option.title || '';
                        }}
                        isOptionEqualToValue={(option, value) => {
                            if (typeof value === 'string') return option.title === value;
                            return option.id === value.id;
                        }}
                        filterOptions={(x) => x}
                        value={searchParams.q}
                        onChange={(_, newValue) => {
                            const val = typeof newValue === 'string' ? newValue : newValue?.title || '';
                            setSearchParams({ q: val });
                        }}
                        onInputChange={(_, newInputValue) => {
                            setSearchParams({ q: newInputValue });
                            fetchOptions(newInputValue);
                        }}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label="Where to?"
                                placeholder="City or Landmark"
                                sx={hotelFormStyles.textField}
                                inputProps={{
                                    ...params.inputProps,
                                    id: 'hotel-location-input' // Ensure unique ID for testing
                                }}
                                InputProps={{
                                    ...params.InputProps,
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <LocationOnIcon color="action" />
                                        </InputAdornment>
                                    ),
                                    endAdornment: (
                                        <>
                                            {params.InputProps.endAdornment}
                                        </>
                                    ),
                                }}
                            />
                        )}
                        renderOption={(props, option) => {
                            const { key, ...optionProps } = props as any;
                            return (
                                <Box component="li" key={option.id} {...optionProps}>
                                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                                        <Box sx={{ fontWeight: 'bold' }}>{option.title}</Box>
                                        <Box sx={{ fontSize: '0.8rem', color: 'text.secondary' }}>{option.subtitle}</Box>
                                    </Box>
                                </Box>
                            );
                        }}
                        freeSolo
                    />
                </Box>

                <Box sx={{
                    gridColumn: { xs: 'span 1', md: 'span 6', lg: 'span 5' },
                    display: 'flex',
                    flexDirection: { xs: 'column', sm: 'row' },
                    gap: { xs: 2, sm: 1 }
                }}>
                    <TextField
                        fullWidth
                        label="Check-in"
                        type="date"
                        value={searchParams.checkInDate}
                        onChange={(e) => setSearchParams({ checkInDate: e.target.value })}
                        sx={hotelFormStyles.textField}
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
                    <TextField
                        fullWidth
                        label="Check-out"
                        type="date"
                        value={searchParams.checkOutDate}
                        onChange={(e) => setSearchParams({ checkOutDate: e.target.value })}
                        sx={hotelFormStyles.textField}
                        InputLabelProps={{ shrink: true }}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <CalendarMonthIcon color="action" />
                                </InputAdornment>
                            ),
                            inputProps: {
                                min: searchParams.checkInDate || new Date().toISOString().split('T')[0]
                            }
                        }}
                    />
                </Box>

                <Box sx={{ gridColumn: { xs: 'span 1', md: 'span 6', lg: 'span 2' } }}>
                    <TextField
                        fullWidth
                        label="Adults"
                        value={searchParams.adults}
                        onChange={(e) => setSearchParams({ adults: parseInt(e.target.value) || 1 })}
                        type="number"
                        sx={hotelFormStyles.textField}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <PersonIcon color="action" />
                                </InputAdornment>
                            ),
                            inputProps: { min: 1 }
                        }}
                    />
                </Box>

                <Box sx={{ gridColumn: { xs: 'span 1', md: 'span 6', lg: 'span 2' } }}>
                    <Button
                        fullWidth
                        variant="contained"
                        color="primary"
                        onClick={handleSearch}
                        sx={{ ...hotelFormStyles.searchButton, height: '100%', minHeight: 56 }}
                    >
                        <SearchIcon />
                    </Button>
                </Box>
            </Box>
        </Paper>
    );
};

export default HotelSearchForm;
