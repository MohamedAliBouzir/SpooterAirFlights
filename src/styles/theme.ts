import { createTheme } from '@mui/material/styles';
import { palette } from './global.style';

export const getTheme = (mode: 'light' | 'dark') => {
    return createTheme({
        palette: {
            mode,
            primary: palette.primary,
            secondary: palette.secondary,
            background: {
                default: mode === 'dark' ? palette.background.dark : palette.background.default,
                paper: mode === 'dark' ? palette.primary.light : palette.background.paper,
            },
            text: {
                primary: mode === 'dark' ? '#ffffff' : palette.text.primary,
                secondary: mode === 'dark' ? '#b0bec5' : palette.text.secondary,
            },
        },
        typography: {
            fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
            h1: {
                fontSize: '2.5rem',
                fontWeight: 600,
            },
        },
        components: {
            MuiButton: {
                styleOverrides: {
                    root: {
                        textTransform: 'none',
                        borderRadius: 8,
                        fontWeight: 600,
                    },
                },
            },
            MuiPaper: {
                styleOverrides: {
                    root: {
                        boxShadow: mode === 'dark' ? '0px 4px 20px rgba(0,0,0,0.5)' : '0px 4px 20px rgba(0,0,0,0.05)',
                    },
                },
            },
        },
    });
};
