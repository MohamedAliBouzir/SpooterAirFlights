import type { SxProps, Theme } from '@mui/material/styles';

export const hotelFiltersStyles = {
    paper: (theme: Theme): SxProps<Theme> => ({
        p: 3,
        borderRadius: 4,
        bgcolor: theme.palette.background.paper,
        border: `1px solid ${theme.palette.divider}`
    }),
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        mb: 3
    },
    title: {
        display: 'flex',
        alignItems: 'center',
        gap: 1,
        fontWeight: 'bold'
    },
    section: {
        mb: 4
    },
    rangeLabels: {
        display: 'flex',
        justifyContent: 'space-between'
    },
    slider: {
        color: 'primary.main',
        mt: 2
    },
    ratingContainer: {
        mt: 1
    }
};
