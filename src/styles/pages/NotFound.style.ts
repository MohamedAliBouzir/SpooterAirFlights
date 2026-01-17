import type { Theme } from '@mui/material';

export const notFoundStyles = {
    root: (theme: Theme) => ({
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: theme.palette.mode === 'dark'
            ? 'linear-gradient(135deg, #0a1929 0%, #1a2332 50%, #0a1929 100%)'
            : 'linear-gradient(135deg, #e3f2fd 0%, #bbdefb 50%, #e3f2fd 100%)',
        position: 'relative',
        overflow: 'hidden',
        py: 8
    }),

    container: {
        textAlign: 'center',
        position: 'relative',
        zIndex: 2
    },

    iconContainer: {
        mb: 4,
        display: 'flex',
        justifyContent: 'center'
    },

    planeIcon: (theme: Theme) => ({
        fontSize: { xs: 80, md: 120 },
        color: theme.palette.mode === 'dark' ? '#00d2ff' : theme.palette.primary.main,
        filter: 'drop-shadow(0 10px 30px rgba(0, 210, 255, 0.3))'
    }),

    errorCode: (theme: Theme) => ({
        fontSize: { xs: '8rem', md: '12rem' },
        fontWeight: 900,
        lineHeight: 1,
        mb: 2,
        background: theme.palette.mode === 'dark'
            ? 'linear-gradient(45deg, #00d2ff 0%, #3a7bd5 100%)'
            : `linear-gradient(45deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
        textShadow: theme.palette.mode === 'dark'
            ? '0 0 80px rgba(0, 210, 255, 0.5)'
            : '0 0 80px rgba(25, 118, 210, 0.3)',
        letterSpacing: '-0.05em'
    }),

    title: (theme: Theme) => ({
        fontWeight: 800,
        mb: 2,
        color: theme.palette.text.primary,
        fontSize: { xs: '2rem', md: '3rem' },
        letterSpacing: '-0.02em'
    }),

    subtitle: {
        color: 'text.secondary',
        mb: 3,
        fontWeight: 500,
        fontSize: { xs: '1rem', md: '1.25rem' }
    },

    description: {
        color: 'text.secondary',
        mb: 6,
        maxWidth: 600,
        mx: 'auto',
        fontSize: { xs: '0.95rem', md: '1.1rem' },
        lineHeight: 1.6
    },

    buttonContainer: {
        display: 'flex',
        gap: 2,
        justifyContent: 'center',
        flexWrap: 'wrap',
        mb: 8
    },

    primaryButton: (theme: Theme) => ({
        borderRadius: '100px',
        px: 4,
        py: 1.5,
        fontWeight: 700,
        fontSize: '1rem',
        textTransform: 'none',
        boxShadow: theme.palette.mode === 'dark'
            ? '0 8px 24px rgba(0, 210, 255, 0.3)'
            : '0 8px 24px rgba(25, 118, 210, 0.2)',
        background: theme.palette.mode === 'dark'
            ? 'linear-gradient(45deg, #00d2ff 0%, #3a7bd5 100%)'
            : theme.palette.primary.main,
        '&:hover': {
            boxShadow: theme.palette.mode === 'dark'
                ? '0 12px 32px rgba(0, 210, 255, 0.4)'
                : '0 12px 32px rgba(25, 118, 210, 0.3)',
            transform: 'translateY(-2px)'
        }
    }),

    secondaryButton: (theme: Theme) => ({
        borderRadius: '100px',
        px: 4,
        py: 1.5,
        fontWeight: 700,
        fontSize: '1rem',
        textTransform: 'none',
        borderWidth: 2,
        borderColor: theme.palette.mode === 'dark' ? '#00d2ff' : theme.palette.primary.main,
        color: theme.palette.mode === 'dark' ? '#00d2ff' : theme.palette.primary.main,
        '&:hover': {
            borderWidth: 2,
            borderColor: theme.palette.mode === 'dark' ? '#00d2ff' : theme.palette.primary.main,
            bgcolor: theme.palette.mode === 'dark' ? 'rgba(0, 210, 255, 0.1)' : 'rgba(25, 118, 210, 0.05)',
            transform: 'translateY(-2px)'
        }
    }),

    decorativeElements: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        pointerEvents: 'none',
        zIndex: 1
    },

    cloud: (index: number) => ({
        position: 'absolute',
        width: { xs: 60, md: 100 },
        height: { xs: 30, md: 50 },
        bgcolor: 'rgba(255, 255, 255, 0.1)',
        borderRadius: '50%',
        top: `${20 + index * 15}%`,
        left: `${10 + index * 18}%`,
        '&::before': {
            content: '""',
            position: 'absolute',
            width: '50%',
            height: '50%',
            bgcolor: 'rgba(255, 255, 255, 0.1)',
            borderRadius: '50%',
            top: '-25%',
            left: '10%'
        },
        '&::after': {
            content: '""',
            position: 'absolute',
            width: '60%',
            height: '60%',
            bgcolor: 'rgba(255, 255, 255, 0.1)',
            borderRadius: '50%',
            top: '-30%',
            right: '10%'
        }
    })
};
