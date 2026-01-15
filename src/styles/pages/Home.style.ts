import type { SxProps, Theme } from '@mui/material/styles';

export const homeStyles = {
    root: {
        bgcolor: 'background.default',
        pb: 10,
        width: '100%'
    },
    hero: (theme: Theme): SxProps<Theme> => ({
        height: { xs: 'auto', md: '75vh' },
        minHeight: '500px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden',
        textAlign: 'center',
        pt: { xs: 10, md: 0 },
        pb: { xs: 15, md: 0 },
        px: 2,
        '&::after': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: theme.palette.mode === 'dark'
                ? 'rgba(0,0,0,0.4)'
                : 'rgba(255,255,255,0.1)',
            zIndex: 1
        }
    }),
    heroBgOverlay: (theme: Theme): SxProps<Theme> => ({
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: `linear-gradient(to bottom, transparent 0%, ${theme.palette.background.default} 100%)`,
        zIndex: 2
    }),
    heroBgCarousel: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 0,
        '& .swiper': {
            width: '100%',
            height: '100%'
        },
        '& img': {
            width: '100%',
            height: '100%',
            objectFit: 'cover'
        }
    },
    heroContent: {
        position: 'relative',
        zIndex: 3,
        maxWidth: 800
    },
    heroTitle: (theme: Theme): SxProps<Theme> => ({
        mb: 2,
        color: theme.palette.mode === 'dark' ? 'white' : 'text.primary',
        fontSize: { xs: '2.5rem', sm: '3.5rem', md: '4.5rem' },
        fontWeight: 900,
        letterSpacing: '-0.02em',
        lineHeight: 1.1,
        textShadow: theme.palette.mode === 'dark' ? '0 2px 10px rgba(0,0,0,0.5)' : 'none'
    }),
    heroSubtitle: (theme: Theme): SxProps<Theme> => ({
        mb: 6,
        color: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.8)' : 'text.secondary',
        maxWidth: 700,
        mx: 'auto',
        fontSize: { xs: '1rem', md: '1.25rem' },
        lineHeight: 1.6,
        textShadow: theme.palette.mode === 'dark' ? '0 1px 5px rgba(0,0,0,0.3)' : 'none'
    }),
    heroButton: (theme: Theme): SxProps<Theme> => ({
        borderRadius: '100px',
        px: 6,
        py: 2,
        fontSize: '1.1rem',
        boxShadow: `0 20px 40px ${theme.palette.secondary.main}44`,
        '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: `0 25px 50px ${theme.palette.secondary.main}66`,
        }
    }),
    container: {
        mt: -10,
        position: 'relative',
        zIndex: 4
    },
    valuePropPaper: (theme: Theme): SxProps<Theme> => ({
        p: 4,
        borderRadius: 6,
        height: '100%',
        border: `1px solid ${theme.palette.divider}`,
        background: theme.palette.background.paper,
        boxShadow: '0 10px 30px rgba(0,0,0,0.03)',
        '&:hover': {
            boxShadow: '0 20px 40px rgba(0,0,0,0.06)',
            borderColor: theme.palette.secondary.light
        }
    }),
    travelProsTitle: (theme: Theme): SxProps<Theme> => ({
        mb: 4,
        fontSize: { xs: '1.75rem', md: '2.5rem' },
        color: theme.palette.text.primary,
        fontWeight: 800,
        textAlign: 'left'
    }),
    carouselCard: (theme: Theme): SxProps<Theme> => ({
        p: 2.5,
        borderRadius: 6,
        height: { xs: 400, md: 480 },
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: theme.palette.background.paper,
        border: `1px solid ${theme.palette.divider}`,
        overflow: 'hidden',
        position: 'relative',
        boxShadow: '0 4px 20px rgba(0,0,0,0.04)',
        transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
        '&:hover': {
            transform: 'translateY(-12px)',
            boxShadow: '0 20px 40px rgba(0,0,0,0.08)',
            borderColor: theme.palette.secondary.light
        }
    }),
    carouselImage: {
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        borderRadius: 4
    },
    travelProsSwiper: {
        '& .swiper': {
            padding: '20px 4px 40px 4px', // Space for the lift and shadow
            margin: '-20px -4px -40px -4px'
        }
    }
};
