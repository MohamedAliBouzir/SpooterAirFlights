import type { SxProps, Theme } from '@mui/material/styles';

export const hotelFormStyles = {
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
        gap: 2,
        width: '100%',
        margin: '0 auto',
        transform: { xs: 'none', md: 'translateY(-50px)' },
        position: 'relative',
        zIndex: 10,
        boxShadow: '0 20px 50px rgba(0,0,0,0.1)'
    }),
    gridContainer: {
        alignItems: 'center'
    },
    searchButton: {
        height: '56px',
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
    }
};
