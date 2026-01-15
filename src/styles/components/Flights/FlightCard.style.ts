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
    tag: {
        bgcolor: (theme: Theme) => theme.palette.mode === 'dark' ? 'rgba(0, 210, 255, 0.15)' : 'secondary.light',
        color: (theme: Theme) => theme.palette.mode === 'dark' ? '#00d2ff' : 'secondary.contrastText',
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
