import type { SxProps, Theme } from '@mui/material/styles';

export const comingSoonStyles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '70vh',
        textAlign: 'center',
        gap: 3
    },
    icon: {
        fontSize: 100,
        color: 'secondary.main',
        mb: 2
    },
    title: {
        background: 'linear-gradient(45deg, #005a9c 30%, #00d2ff 90%)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent'
    },
    button: {
        px: 4,
        py: 1.5,
        borderRadius: '100px',
        fontWeight: 'bold'
    }
};
