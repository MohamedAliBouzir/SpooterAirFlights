import { Paper, Typography, Box, Slider, FormGroup, FormControlLabel, Checkbox, RadioGroup, Radio, Divider, Button, useTheme } from '@mui/material';
import { useFlightStore } from '@/hooks/useFlightStore';
import { useMemo } from 'react';
import FilterListIcon from '@mui/icons-material/FilterList';
import { filterStyles } from '@/styles/components/Flights/FlightFilters.style';

const FlightFilters = () => {
    const theme = useTheme();
    const { filters, setFilters, results } = useFlightStore();

    const handlePriceChange = (_event: Event, newValue: number | number[]) => {
        setFilters({ maxPrice: newValue as number });
    };

    const handleStopChange = (value: number | null) => {
        setFilters({ maxStops: value });
    };

    const handleReset = () => {
        setFilters({
            maxPrice: 1000,
            maxStops: null,
            airlines: []
        });
    };

    const availableAirlines = useMemo(() => {
        const names = results.map(f => f.airline);
        return Array.from(new Set(names)).sort();
    }, [results]);

    const handleAirlineToggle = (airline: string) => {
        const current = filters.airlines;
        const newAirlines = current.includes(airline)
            ? current.filter(a => a !== airline)
            : [...current, airline];
        setFilters({ airlines: newAirlines });
    };

    return (
        <Paper sx={filterStyles.paper(theme)}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                <Typography sx={filterStyles.title}>
                    <FilterListIcon fontSize="small" /> Filters
                </Typography>
                <Button
                    variant="text"
                    sx={filterStyles.resetButton}
                    onClick={handleReset}
                >
                    Reset all
                </Button>
            </Box>

            <Box sx={filterStyles.section}>
                <Typography variant="subtitle2" fontWeight="bold" gutterBottom>Max Price</Typography>
                <Slider
                    value={filters.maxPrice || 1000}
                    min={100}
                    max={1000}
                    step={50}
                    onChange={handlePriceChange}
                    valueLabelDisplay="auto"
                    sx={{ color: 'primary.main' }}
                />
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="caption" color="text.secondary">$100</Typography>
                    <Typography variant="caption" color="text.secondary">${filters.maxPrice || 1000}</Typography>
                </Box>
            </Box>

            <Divider sx={{ my: 3 }} />

            <Box sx={filterStyles.section}>
                <Typography variant="subtitle2" fontWeight="bold" gutterBottom>Stops</Typography>
                <RadioGroup
                    value={filters.maxStops === null ? 'any' : filters.maxStops}
                    onChange={(e) => handleStopChange(e.target.value === 'any' ? null : Number(e.target.value))}
                >
                    <FormControlLabel value="any" control={<Radio size="small" />} label={<Typography variant="body2">Any</Typography>} />
                    <FormControlLabel value={0} control={<Radio size="small" />} label={<Typography variant="body2">Direct only</Typography>} />
                    <FormControlLabel value={1} control={<Radio size="small" />} label={<Typography variant="body2">1 Stop max</Typography>} />
                </RadioGroup>
            </Box>

            <Divider sx={{ my: 3 }} />

            <Box>
                <Typography variant="subtitle2" fontWeight="bold" gutterBottom>Airlines</Typography>
                {availableAirlines.length > 0 ? (
                    <FormGroup>
                        {availableAirlines.map((airline) => (
                            <FormControlLabel
                                key={airline}
                                control={
                                    <Checkbox
                                        size="small"
                                        checked={filters.airlines.includes(airline)}
                                        onChange={() => handleAirlineToggle(airline)}
                                    />
                                }
                                label={<Typography variant="body2">{airline}</Typography>}
                            />
                        ))}
                    </FormGroup>
                ) : (
                    <Typography variant="caption" color="text.secondary">No airlines visible</Typography>
                )}
            </Box>
        </Paper>
    );
};

export default FlightFilters;
