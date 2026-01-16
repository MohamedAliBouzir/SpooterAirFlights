import type { SxProps, Theme } from '@mui/material/styles';

export const flightsPageStyles = {
    root: {
        bgcolor: 'background.default',
        minHeight: '100vh',
        width: '100%',
        pb: 8
    },
    header: (theme: Theme): SxProps<Theme> => ({
        pt: 10,
        pb: 15,
        position: 'relative',
        backgroundImage: 'url("https://images.unsplash.com/photo-1556388158-158ea5ccacbd?q=80&w=2070&auto=format&fit=crop")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        color: 'white',
        textAlign: 'center',
        mb: 0,
        '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: theme.palette.mode === 'dark'
                ? `linear-gradient(to bottom, ${theme.palette.primary.dark}CC 0%, ${theme.palette.background.default} 100%)`
                : `linear-gradient(to bottom, ${theme.palette.primary.main}CC 0%, ${theme.palette.background.default} 100%)`,
            zIndex: 1
        },
        '& > *': {
            position: 'relative',
            zIndex: 2
        }
    }),
    container: {
        maxWidth: { xs: '100%', lg: '1280px', xl: '1536px' },
        mx: 'auto',
        px: { xs: 2, sm: 3, md: 4 },
        position: 'relative',
        width: '100%'
    },
    contentGrid: {
        mt: { xs: 2, md: 4 }
    },
    filterSidebar: (): SxProps<Theme> => ({
        position: { xs: 'relative', md: 'sticky' },
        top: '100px',
        mb: { xs: 3, md: 0 }
    }),
    resultsHeader: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        mb: 3
    }
};
