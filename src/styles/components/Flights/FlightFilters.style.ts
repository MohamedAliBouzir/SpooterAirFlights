import type { SxProps, Theme } from '@mui/material/styles';

export const filterStyles = {
    paper: (theme: Theme): SxProps<Theme> => ({
        p: 3,
        borderRadius: 4,
        border: `1px solid ${theme.palette.divider}`,
        background: theme.palette.background.paper,
        position: 'sticky',
        top: 100,
        boxShadow: '0 4px 20px rgba(0,0,0,0.03)'
    }),
    section: {
        mb: 4
    },
    title: {
        fontWeight: 'bold',
        mb: 2,
        fontSize: '1rem',
        display: 'flex',
        alignItems: 'center',
        gap: 1
    },
    resetButton: {
        textTransform: 'none',
        fontWeight: 'bold',
        fontSize: '0.8rem',
        p: 0,
        minWidth: 'auto',
        ml: 'auto'
    }
};
