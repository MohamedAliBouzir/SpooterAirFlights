import type { SxProps, Theme } from '@mui/material/styles';

export const flightCardStyles = {
    root: (theme: Theme): SxProps<Theme> => ({
        p: 2,
        borderRadius: 2,
        mb: 1.5,
        border: `1px solid ${theme.palette.divider}`,
        transition: 'all 0.2s ease',
        cursor: 'pointer',
        '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: theme.palette.mode === 'dark'
                ? '0 8px 24px rgba(0,0,0,0.4)'
                : '0 8px 24px rgba(0,0,0,0.06)',
            borderColor: 'primary.main'
        }
    }),

    container: {
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        alignItems: { xs: 'stretch', md: 'center' },
        gap: { xs: 2.5, md: 3 },
        width: '100%'
    },

    airlineSection: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: { xs: 'space-between', md: 'flex-start' },
        gap: 1.5,
        minWidth: 140
    },

    airlineInfo: {
        display: 'flex',
        alignItems: 'center',
        gap: 1.5
    },

    logoWrapper: {
        background: 'transparent',
        border: 'none',
        width: 40,
        height: 40,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden'
    },

    logo: {
        width: 36,
        height: 36,
        borderRadius: 1,
        bgcolor: '#f5f5f5',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontWeight: 'bold',
        fontSize: '0.85rem',
        color: '#333',
        flexShrink: 0
    },

    airlineText: {
        lineHeight: 1.2
    },

    flightNumber: {
        fontSize: '0.7rem'
    },

    mobilePriceSection: {
        display: { xs: 'block', md: 'none' },
        textAlign: 'right'
    },

    mobilePrice: (theme: Theme) => ({
        color: theme.palette.mode === 'dark' ? '#00d2ff' : 'primary.main',
        lineHeight: 1
    }),

    flightDetails: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flex: 1,
        gap: 1
    },

    timeSection: {
        minWidth: 80,
        textAlign: { xs: 'left', md: 'center' }
    },

    time: {
        fontSize: '1.1rem',
        lineHeight: 1.2
    },

    airportCode: {
        fontSize: '0.75rem'
    },

    durationSection: {
        flex: 1,
        px: 2,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },

    durationRow: {
        display: 'flex',
        alignItems: 'center',
        gap: 1,
        mb: 0.5,
        width: '100%',
        justifyContent: 'center'
    },

    durationText: {
        fontSize: '0.7rem'
    },

    flightLine: {
        flex: 1,
        height: 2,
        bgcolor: 'divider',
        position: 'relative',
        maxWidth: 100
    },

    flightIcon: {
        fontSize: 12,
        position: 'absolute',
        left: '50%',
        top: '50%',
        transform: 'translate(-50%, -50%) rotate(90deg)',
        color: 'primary.main'
    },

    stopsChip: (stops: number) => ({
        height: 18,
        fontSize: '0.65rem',
        fontWeight: 600,
        bgcolor: stops === 0 ? 'success.light' : 'warning.light',
        color: stops === 0 ? 'success.dark' : 'warning.dark',
        '& .MuiChip-label': { px: 1 }
    }),

    priceSection: (theme: Theme) => ({
        minWidth: { md: 200 },
        textAlign: 'right',
        display: 'flex',
        flexDirection: { xs: 'row', md: 'column' },
        alignItems: { xs: 'center', md: 'flex-end' },
        justifyContent: { xs: 'space-between', md: 'center' },
        gap: { xs: 2, md: 0.5 },
        pl: { md: 3 },
        borderLeft: { md: `1px solid ${theme.palette.divider}` },
        pt: { xs: 2, md: 0 },
        borderTop: { xs: `1px solid ${theme.palette.divider}`, md: 'none' }
    }),

    desktopPriceSection: {
        display: { xs: 'none', md: 'flex' },
        flexDirection: 'column',
        alignItems: 'flex-end'
    },

    price: (theme: Theme) => ({
        color: theme.palette.mode === 'dark' ? '#00d2ff' : 'primary.main',
        lineHeight: 1,
        mb: 0.5
    }),

    priceLabel: {
        fontSize: '0.65rem',
        mb: 1
    },

    selectButton: (theme: Theme) => ({
        borderRadius: '100px',
        px: 3,
        py: 0.75,
        fontWeight: 700,
        fontSize: '0.8rem',
        textTransform: 'none',
        width: { xs: '100%', md: 'auto' },
        bgcolor: theme.palette.mode === 'dark' ? 'primary.main' : 'primary.dark',
        '&:hover': {
            bgcolor: theme.palette.mode === 'dark' ? 'primary.dark' : 'primary.main',
        }
    }),

    tag: {
        bgcolor: 'rgba(0, 210, 255, 0.15)',
        color: '#00d2ff',
        px: 1.5,
        py: 0.3,
        borderRadius: '4px',
        fontSize: '0.6rem',
        fontWeight: 700,
        textTransform: 'uppercase',
        letterSpacing: '0.05em',
        width: 'fit-content'
    }
};
