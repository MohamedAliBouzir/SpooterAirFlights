import type { SxProps, Theme } from '@mui/material/styles';

export const flightFormStyles = {
    paper: (theme: Theme): SxProps<Theme> => ({
        p: { xs: 2, md: 4 },
        borderRadius: 4,
        background: theme.palette.mode === 'dark'
            ? 'rgba(10, 25, 41, 0.8)'
            : 'rgba(255, 255, 255, 0.9)',
        backdropFilter: 'blur(10px)',
        border: `1px solid ${theme.palette.divider}`,
        display: 'flex',
        flexDirection: 'column',
        gap: 3,
        width: '100%',
        margin: '0 auto',
        transform: { xs: 'none', md: 'translateY(-50px)' },
        position: 'relative',
        zIndex: 10,
        boxShadow: '0 20px 50px rgba(0,0,0,0.1)'
    }),

    tabs: {
        borderBottom: 1,
        borderColor: 'divider',
        mb: 2
    },

    tabsContainer: (theme: Theme) => ({
        '& .MuiTab-root': {
            color: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.6)',
            '&.Mui-selected': {
                color: theme.palette.mode === 'dark' ? '#fff' : theme.palette.primary.main,
            }
        }
    }),

    tabItem: {
        textTransform: 'none',
        fontWeight: 600
    },

    formContainer: {
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        gap: 2
    },

    gridContainer: {
        alignItems: { xs: 'stretch', md: 'center' }
    },

    locationGrid: {
        flex: { xs: '1 1 auto', md: 5 },
        display: 'grid',
        gridTemplateColumns: { xs: '1fr auto', md: '1fr auto 1fr' },
        gap: { xs: 2, md: 1 },
        alignItems: 'center'
    },

    swapButton: {
        bgcolor: 'action.hover'
    },

    destinationWrapper: {
        gridColumn: { xs: '1 / -1', md: 'auto' }
    },

    dateGrid: {
        flex: { xs: '1 1 auto', md: 4 },
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        gap: 1
    },

    passengersWrapper: {
        flex: { xs: '1 1 auto', md: 2 }
    },

    searchButtonWrapper: {
        flex: { xs: '1 1 auto', md: 1 }
    },

    searchButton: {
        height: '100%',
        minHeight: 56,
        borderRadius: 2,
        fontWeight: 'bold',
        fontSize: '1.1rem',
        textTransform: 'none'
    },

    textField: {
        '& .MuiOutlinedInput-root': {
            borderRadius: 2,
            bgcolor: 'background.paper'
        }
    },

    autocompleteOption: (isAirport: boolean) => ({
        py: 1,
        pl: isAirport ? 4 : 2,
        borderBottom: '1px solid',
        borderColor: 'divider'
    }),

    optionContent: {
        display: 'flex',
        alignItems: 'center',
        gap: 2,
        width: '100%'
    },

    optionIcon: {
        opacity: 0.7
    },

    optionTextWrapper: {
        display: 'flex',
        flexDirection: 'column',
        flexGrow: 1,
        overflow: 'hidden'
    },

    optionTitleRow: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%'
    },

    optionTitle: (isAirport: boolean) => ({
        fontWeight: isAirport ? 400 : 700
    }),

    optionCode: {
        fontWeight: 'bold',
        ml: 1,
        color: 'text.secondary'
    }
};
