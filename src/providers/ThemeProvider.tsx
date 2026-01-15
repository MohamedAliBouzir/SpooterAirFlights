import { ThemeProvider as MuiThemeProvider, CssBaseline } from '@mui/material';
import { useAppStore } from '@/hooks/useAppStore';
import { getTheme } from '@/styles/theme';
import type { ReactNode } from 'react';

export const AppThemeProvider = ({ children }: { children: ReactNode }) => {
    const mode = useAppStore((state) => state.mode);
    const theme = getTheme(mode);

    return (
        <MuiThemeProvider theme={theme}>
            <CssBaseline />
            {children}
        </MuiThemeProvider>
    );
};
