import { Box, Typography, Button, Paper, Chip, useTheme } from '@mui/material';
import { type HotelResult } from '@/services/serpApi';
import { hotelCardStyles } from '@/styles/components/Hotels/HotelCard.style';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import StarIcon from '@mui/icons-material/Star';
import { useState } from 'react';

interface HotelCardProps {
    hotel: HotelResult;
}

const HotelCard = ({ hotel }: HotelCardProps) => {
    const theme = useTheme();
    const [showAllAmenities, setShowAllAmenities] = useState(false);

    return (
        <Paper sx={hotelCardStyles.root(theme)} elevation={1}>
            <Box sx={hotelCardStyles.imageContainer}>
                <img
                    src={hotel.images?.[0]?.thumbnail || 'https://via.placeholder.com/300x200?text=No+Image'}
                    alt={hotel.name}
                    style={hotelCardStyles.image as any}
                />
                {hotel.overall_rating && (
                    <Box sx={{ position: 'absolute', top: 12, left: 12 }}>
                        <Box sx={hotelCardStyles.rating}>
                            {hotel.overall_rating} <StarIcon sx={{ fontSize: 16 }} />
                        </Box>
                    </Box>
                )}
            </Box>

            <Box sx={hotelCardStyles.content}>
                <Box>
                    <Typography variant="h6" fontWeight="bold" gutterBottom>
                        {hotel.name}
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mb: 1, color: 'text.secondary' }}>
                        <LocationOnIcon sx={{ fontSize: 18, color: 'primary.main' }} />
                        <Typography variant="body2">
                            {hotel.description || 'View on map'}
                        </Typography>
                    </Box>

                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mt: 2 }}>
                        {hotel.amenities?.slice(0, showAllAmenities ? hotel.amenities.length : 4).map((amenity, idx) => (
                            <Chip
                                key={idx}
                                label={amenity}
                                size="small"
                                variant="outlined"
                                sx={{ borderRadius: 1.5, fontSize: '0.7rem' }}
                            />
                        ))}
                        {hotel.amenities?.length > 4 && (
                            <Chip
                                label={showAllAmenities ? 'Show less' : `+${hotel.amenities.length - 4} more`}
                                size="small"
                                variant="filled"
                                onClick={() => setShowAllAmenities(!showAllAmenities)}
                                sx={{
                                    borderRadius: 1.5,
                                    fontSize: '0.7rem',
                                    cursor: 'pointer',
                                    bgcolor: theme.palette.mode === 'dark' ? 'primary.dark' : 'primary.light',
                                    color: theme.palette.mode === 'dark' ? 'white' : 'primary.main',
                                    '&:hover': {
                                        bgcolor: theme.palette.mode === 'dark' ? 'primary.main' : 'primary.main',
                                        color: 'white'
                                    }
                                }}
                            />
                        )}
                    </Box>
                </Box>

                <Box sx={{ mt: 2, display: { xs: 'flex', sm: 'none' }, justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="h5" color="primary" fontWeight="bold">
                        {hotel.rate_per_night?.lowest || 'N/A'}
                    </Typography>
                    <Button variant="contained" size="small">View Detail</Button>
                </Box>
            </Box>

            <Box sx={hotelCardStyles.priceSection(theme)}>
                <Typography variant="body2" color="text.secondary">Price from</Typography>
                <Typography variant="h4" color="primary" fontWeight="bold" sx={{ my: 1 }}>
                    {hotel.rate_per_night?.lowest || 'N/A'}
                </Typography>
                <Typography variant="caption" color="text.secondary" sx={{ mb: 2 }}>
                    Per night (Excl. taxes)
                </Typography>
                <Button
                    fullWidth
                    variant="contained"
                    color="primary"
                    href={hotel.link}
                    target="_blank"
                    sx={{ borderRadius: 2, display: { xs: 'none', sm: 'block' } }}
                >
                    View Prices
                </Button>
            </Box>
        </Paper>
    );
};

export default HotelCard;
