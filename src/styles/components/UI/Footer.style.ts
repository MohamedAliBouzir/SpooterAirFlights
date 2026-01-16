import type { SxProps, Theme } from '@mui/material/styles';

export const footerStyles = {
    root: (theme: Theme, detail: boolean): SxProps<Theme> => ({
        pt: detail ? 8 : 2,
        pb: 4,
        bgcolor: 'background.paper',
        borderTop: `1px solid ${theme.palette.divider}`,
        mt: 'auto',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    }),
    container: {
        maxWidth: 'lg'
    },
    gridItem: {
        display: 'flex',
        flexDirection: 'column',
        gap: 1
    },
    link: {
        fontSize: '0.85rem'
    },
    appLinkBox: {
        display: 'flex',
        flexDirection: 'column',
        gap: 1
    },
    appBadge: {
        width: 120,
        cursor: 'pointer'
    },
    bottomBar: (isMobile: boolean): SxProps<Theme> => ({
        display: 'flex',
        flexDirection: isMobile ? 'column' : 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: 2
    }),
    legalLinks: (isMobile: boolean): SxProps<Theme> => ({
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: isMobile ? 'center' : 'flex-start',
        gap: 2,
        alignItems: 'center'
    }),
    socialBox: {
        display: 'flex',
        gap: 1
    },
    partnerBar: (isMobile: boolean): SxProps<Theme> => ({
        mt: 4,
        display: 'flex',
        flexDirection: isMobile ? 'column' : 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: 2,
        opacity: 0.6
    }),
    partnerLinks: {
        display: 'flex',
        gap: 2,
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'center'
    },
    settingLinks: {
        display: 'flex',
        gap: 2
    }
};
