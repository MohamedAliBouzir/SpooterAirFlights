import type { SxProps, Theme } from '@mui/material/styles';

export const HeaderStyle = {
    appBar: (theme: Theme): SxProps<Theme> => ({
        bgcolor: 'background.paper',
        color: 'text.primary',
        boxShadow: 'none',
        borderBottom: `1px solid ${theme.palette.divider}`,
        position: 'sticky',
        top: 0,
        zIndex: 1100,
        width: '100%'
    }),
    toolbar: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        px: { xs: 2, md: 4 },
        maxWidth: '90%',
        margin: '0 auto',
        width: '100%',
        minHeight: '70px'
    },
    logoBox: {
        display: 'flex',
        alignItems: 'center',
        gap: 1,
        cursor: 'pointer',
        textDecoration: 'none',
        color: 'inherit'
    },
    logoText: {
        fontWeight: 900,
        fontSize: '1.5rem',
        letterSpacing: '-0.05em',
        background: 'linear-gradient(45deg, #005a9c 30%, #00d2ff 90%)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
    },
    navLinks: {
        display: { xs: 'none', md: 'flex' },
        gap: 3
    },
    navLink: (active: boolean): SxProps<Theme> => ({
        fontWeight: active ? 700 : 500,
        color: active ? 'primary.main' : 'text.secondary',
        textDecoration: 'none',
        '&:hover': {
            color: 'primary.main'
        }
    }),
    actionsBox: {
        display: 'flex',
        alignItems: 'center',
        gap: 1
    }
};
