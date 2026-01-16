import type { SxProps, Theme } from '@mui/material/styles';

export const priceGraphStyles = {
    paper: (theme: Theme): SxProps<Theme> => ({
        p: 3,
        borderRadius: 4,
        background: theme.palette.mode === 'dark' ? theme.palette.background.paper : '#ffffff',
        height: '100%',
        minHeight: 300
    }),
    title: {
        mb: 2,
        fontWeight: 600
    },
    chartContainer: {
        width: '100%',
        height: 250
    }
};
