import type { SxProps, Theme } from '@mui/material/styles';

export const hotelCardStyles = {
    root: (theme: Theme): SxProps<Theme> => ({
        display: 'flex',
        flexDirection: { xs: 'column', sm: 'row' },
        mb: 2,
        borderRadius: 3,
        overflow: 'hidden',
        transition: 'all 0.3s ease',
        '&:hover': {
            boxShadow: theme.shadows[8],
            transform: 'translateY(-4px)'
        },
        background: theme.palette.background.paper,
        border: `1px solid ${theme.palette.divider}`
    }),
    imageContainer: {
        width: { xs: '100%', sm: 240 },
        height: { xs: 200, sm: 'auto' },
        position: 'relative'
    },
    image: {
        width: '100%',
        height: '100%',
        objectFit: 'cover'
    },
    content: {
        flex: 1,
        p: 3,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between'
    },
    priceSection: (theme: Theme): SxProps<Theme> => ({
        minWidth: { sm: 180 },
        p: 3,
        display: 'flex',
        flexDirection: 'column',
        alignItems: { xs: 'flex-start', sm: 'flex-end' },
        justifyContent: 'center',
        borderLeft: { sm: `1px solid ${theme.palette.divider}` },
        borderTop: { xs: `1px solid ${theme.palette.divider}`, sm: 'none' },
        bgcolor: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.01)'
    }),
    rating: {
        display: 'flex',
        alignItems: 'center',
        gap: 0.5,
        bgcolor: 'primary.main',
        color: 'white',
        px: 1,
        py: 0.5,
        borderRadius: 1,
        fontWeight: 'bold',
        fontSize: '0.9rem'
    }
};
