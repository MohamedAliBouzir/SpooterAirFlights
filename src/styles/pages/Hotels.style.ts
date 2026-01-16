import type { SxProps, Theme } from '@mui/material/styles';

export const hotelPageStyles = {
    root: (theme: Theme): SxProps<Theme> => ({
        minHeight: '100vh',
        bgcolor: theme.palette.mode === 'dark' ? '#050a10' : '#f8f9fa',
        pb: 8
    }),
    header: (theme: Theme): SxProps<Theme> => ({
        height: { xs: '35vh', md: '50vh' },
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        color: 'white',
        textAlign: 'center',
        px: 2,
        overflow: 'hidden',
        '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: 'url("https://images.unsplash.com/photo-1571896349842-33c89424de2d?q=80&w=2680&auto=format&fit=crop")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            zIndex: 0
        },
        '&::after': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: `linear-gradient(to bottom, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.4) 60%, ${theme.palette.background.default} 100%)`,
            zIndex: 1
        },
        '& > *': {
            position: 'relative',
            zIndex: 2
        }
    }),
    container: {
        maxWidth: { xs: '100%', lg: '1280px', xl: '1536px' },
        margin: '0 auto',
        px: { xs: 2, md: 4 },
        position: 'relative',
        mt: { xs: 2, md: 0 }
    },
    filterSidebar: (): SxProps<Theme> => ({
        position: { xs: 'relative', md: 'sticky' },
        top: '100px',
        mb: { xs: 3, md: 0 }
    })
};
