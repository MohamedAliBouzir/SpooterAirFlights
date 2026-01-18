import type { Theme } from '@mui/material';

export const flightDetailsStyles = {
    root: {
        minHeight: '100vh',
        bgcolor: 'background.default',
        pb: 8,
    },

    notFoundContainer: {
        py: 8,
        textAlign: 'center'
    },

    notFoundText: {
        mt: 1,
        mb: 3
    },

    notFoundButton: {
        borderRadius: '100px',
        px: 4
    },

    container: {
        py: 4
    },

    backButton: {
        mb: 4,
        textTransform: 'none',
        fontWeight: 600,
        color: 'text.secondary'
    },

    itineraryHeader: {
        mb: 4
    },

    segmentContainer: {
        mb: 6,
        position: 'relative'
    },

    airlineInfoRow: {
        display: 'flex',
        alignItems: 'center',
        gap: 2,
        mb: 4
    },

    airlineDetailsRow: {
        display: 'flex',
        alignItems: 'center',
        gap: 1,
        flexWrap: 'wrap'
    },

    airlineText: {
        fontWeight: 700,
        fontSize: '0.9rem'
    },

    airlineMetadata: {
        color: 'text.secondary',
        fontSize: '0.85rem'
    },

    timelineWrapper: {
        position: 'relative',
        pl: 0.5
    },

    verticalLine: (theme: Theme) => ({
        position: 'absolute',
        left: 10,
        top: 10,
        bottom: 10,
        width: 0,
        borderLeft: `2px dotted ${theme.palette.divider}`,
        zIndex: 1
    }),

    departureRow: {
        display: 'flex',
        gap: 3,
        mb: 3,
        position: 'relative',
        zIndex: 2
    },

    dotWrapper: (theme: Theme) => ({
        ...flightDetailsStyles.timelineDot(theme),
        flexShrink: 0,
        mt: '6px'
    }),

    locationRow: {
        flex: 1,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start'
    },

    locationText: {
        lineHeight: 1.3,
        fontSize: '1.05rem',
        maxWidth: { xs: '100%', sm: 400 }
    },

    timeText: {
        mt: 0.5
    },

    extensionsBox: {
        textAlign: 'right',
        display: { xs: 'none', sm: 'block' },
        minWidth: 200
    },

    extensionText: {
        fontSize: '0.75rem'
    },

    travelTimeRow: {
        display: 'flex',
        gap: 3,
        mb: 3,
        pl: 5.5
    },

    travelTimeLabel: {
        fontSize: '0.9rem'
    },

    arrivalRow: {
        display: 'flex',
        gap: 3,
        position: 'relative',
        zIndex: 2
    },

    arrivalContent: {
        flex: 1
    },

    divider: {
        my: 6
    },

    carbonHeader: {
        display: 'flex',
        alignItems: 'center',
        gap: 2,
        mb: 2
    },

    carbonValue: {
        mt: 1
    },

    bookingHeader: {
        p: 3,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
    },

    bookingProviderInfo: {
        display: 'flex',
        alignItems: 'center',
        gap: 2
    },

    airlineChip: {
        height: 20,
        fontSize: '0.65rem',
        fontWeight: 800,
        bgcolor: 'rgba(0,0,0,0.05)'
    },

    hideOptionsButton: {
        textTransform: 'none',
        fontWeight: 700,
        borderRadius: '100px'
    },

    farePrice: {
        textAlign: 'right'
    },

    farePriceText: {
        lineHeight: 1
    },

    continueButtonPrimary: {
        bgcolor: '#1a73e8',
        color: 'white',
        border: 'none',
        '&:hover': {
            bgcolor: '#1765cc'
        }
    },

    continueButtonSecondary: {
        bgcolor: 'transparent',
        color: '#1a73e8',
        border: '1px solid #dadce0',
        '&:hover': {
            bgcolor: '#f8f9fa'
        }
    },

    fareDisclaimer: (theme: Theme) => ({
        p: 2,
        px: 3,
        borderBottom: `1px solid ${theme.palette.divider}`
    }),

    disclaimerText: {
        fontSize: '0.7rem'
    },

    bookingOptionsContainer: {
        display: 'flex',
        alignItems: 'center'
    },

    loadingContainer: (theme: Theme) => ({
        ...flightDetailsStyles.bookingCard(theme),
        p: 8,
        textAlign: 'center'
    }),

    loadingSpinner: {
        mb: 2
    },

    noBookingContainer: (theme: Theme) => ({
        ...flightDetailsStyles.bookingCard(theme),
        p: 8,
        textAlign: 'center'
    }),

    tryGoogleButton: {
        mt: 2,
        textTransform: 'none',
        fontWeight: 700
    },

    priceInsightColors: (theme: Theme) => {
        const isDark = theme.palette.mode === 'dark';
        const colors = {
            low: isDark ? '#81c995' : '#34a853',
            typical: isDark ? '#fdd663' : '#fbbc04',
            high: isDark ? '#f28b82' : '#ea4335',
            lowBg: isDark ? 'rgba(129, 201, 149, 0.15)' : '#e6f4ea',
            typicalBg: isDark ? 'rgba(253, 214, 99, 0.15)' : '#fef7e0',
            highBg: isDark ? 'rgba(242, 139, 130, 0.15)' : '#fce8e6',
            lowText: isDark ? '#81c995' : '#137333',
            typicalText: isDark ? '#fdd663' : '#b06000',
            highText: isDark ? '#f28b82' : '#c5221f',
        };
        return colors;
    },

    priceInsightContent: {
        p: 0
    },

    priceInsightTitle: (theme: Theme) => ({
        fontSize: '1.2rem',
        color: theme.palette.text.primary
    }),

    priceLevelText: (priceLevel: string, colors: any) => ({
        color: priceLevel === 'high' ? colors.high : priceLevel === 'low' ? colors.low : colors.typical,
        fontWeight: 800
    }),

    priceRangeText: {
        display: 'flex',
        alignItems: 'center',
        gap: 0.5,
        mb: 1,
        fontSize: '0.85rem'
    },

    infoIcon: {
        fontSize: 16,
        ml: 0.5,
        opacity: 0.7
    },

    priceMarkerDot: (priceLevel: string, colors: any, isDark: boolean) => ({
        bgcolor: priceLevel === 'low' ? colors.low : priceLevel === 'high' ? colors.high : colors.typical,
        boxShadow: isDark ? `0 0 10px ${priceLevel === 'low' ? colors.low : priceLevel === 'high' ? colors.high : colors.typical}` : 'none'
    }),

    priceMarkerLabel: (priceLevel: string, colors: any, isDark: boolean) => ({
        bgcolor: priceLevel === 'low' ? colors.lowBg : priceLevel === 'high' ? colors.highBg : colors.typicalBg,
        color: priceLevel === 'low' ? colors.lowText : priceLevel === 'high' ? colors.highText : colors.typicalText,
        border: isDark ? `1px solid ${priceLevel === 'low' ? 'rgba(129, 201, 149, 0.3)' : priceLevel === 'high' ? 'rgba(242, 139, 130, 0.3)' : 'rgba(253, 214, 99, 0.3)'}` : 'none',
        '&:after': {
            borderTopColor: isDark ? (priceLevel === 'low' ? 'rgba(129, 201, 149, 0.3)' : priceLevel === 'high' ? 'rgba(242, 139, 130, 0.3)' : 'rgba(253, 214, 99, 0.15)') : (priceLevel === 'low' ? '#e6f4ea' : priceLevel === 'high' ? '#fce8e6' : '#fef7e0'),
        }
    }),

    priceLabelRow: {
        display: 'flex',
        mt: -3,
        mb: 4,
        px: 0,
        position: 'relative',
        height: 20
    },

    priceLabelLow: (lowPos: number) => ({
        position: 'absolute',
        left: `${lowPos}%`,
        transform: 'translateX(-50%)',
        fontSize: '0.65rem'
    }),

    priceLabelHigh: (highPos: number) => ({
        position: 'absolute',
        left: `${highPos}%`,
        transform: 'translateX(-50%)',
        fontSize: '0.65rem'
    }),

    statsContainer: (theme: Theme) => ({
        bgcolor: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.02)',
        p: 2,
        borderRadius: 3,
        mb: 3
    }),

    statsTitle: {
        fontSize: '0.8rem',
        color: 'primary.main',
        textTransform: 'uppercase'
    },

    chartHistoryText: {
        display: 'block',
        mt: 3,
        textAlign: 'center',
        fontSize: '0.75rem',
        opacity: 0.8
    },

    mapHeader: (theme: Theme) => ({
        p: 3,
        borderBottom: `1px solid ${theme.palette.divider}`
    }),

    mapRouteInfo: {
        p: 3
    },

    mapRouteHeader: {
        display: 'flex',
        justifyContent: 'space-between',
        mb: 1
    },

    mapRouteRow: {
        display: 'flex',
        justifyContent: 'space-between'
    },

    mapRouteLine: {
        height: 2,
        bgcolor: 'divider',
        flex: 1,
        mx: 2,
        alignSelf: 'center',
        position: 'relative'
    },

    mapRouteDot: {
        position: 'absolute',
        right: 0,
        top: -4,
        width: 8,
        height: 8,
        bgcolor: 'primary.main',
        borderRadius: '50%'
    },

    markerContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },

    markerIcon: {
        color: 'primary.main',
        fontSize: 24,
        mb: -0.5,
        transform: 'rotate(-45deg)'
    },

    markerIconLanding: {
        color: 'secondary.main',
        fontSize: 24,
        mb: -0.5,
        transform: 'rotate(45deg)'
    },

    markerTimeBox: {
        bgcolor: 'primary.main',
        px: 1,
        borderRadius: 1,
        my: 0.5
    },

    markerTimeBoxLanding: {
        bgcolor: 'secondary.main',
        px: 1,
        borderRadius: 1,
        my: 0.5
    },

    markerTimeText: {
        color: 'primary.contrastText',
        fontSize: '0.7rem',
        fontWeight: 900
    },

    markerDot: {
        width: 12,
        height: 12,
        bgcolor: 'primary.main',
        borderRadius: '50%',
        border: '2px solid white'
    },

    markerDotLanding: {
        width: 12,
        height: 12,
        bgcolor: 'secondary.main',
        borderRadius: '50%',
        border: '2px solid white'
    },

    stickyContainer: {
        position: 'sticky',
        top: 90,
        zIndex: 10
    },

    infoCard: (theme: Theme) => ({
        p: { xs: 2, md: 4 },
        borderRadius: { xs: 3, md: 5 },
        boxShadow: theme.palette.mode === 'dark'
            ? '0 20px 50px rgba(0,0,0,0.5)'
            : '0 20px 50px rgba(0,0,0,0.05)',
        border: `1px solid ${theme.palette.divider}`,
        bgcolor: 'background.paper',
        position: 'relative',
        overflow: 'hidden',
    }),
    airlineLogo: {
        width: 32,
        height: 32,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        p: 0.5,
        borderRadius: 1,
        bgcolor: 'white',
        boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
        overflow: 'hidden',
    },
    timelineContainer: {
        display: 'flex',
        flexDirection: 'column',
        gap: 0,
        mt: 4,
    },
    segmentWrapper: {
        display: 'flex',
        position: 'relative',
        py: 1,
    },
    timelineColumn: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: 40,
        flexShrink: 0,
    },
    timelineDot: (theme: Theme) => ({
        width: 10,
        height: 10,
        borderRadius: '50%',
        border: `2px solid ${theme.palette.text.secondary}`,
        bgcolor: 'background.paper',
        zIndex: 2,
    }),
    timelineLine: (theme: Theme) => ({
        flex: 1,
        width: 2,
        borderLeft: `2px dotted ${theme.palette.divider}`,
        my: 0.5,
    }),
    contentColumn: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
    },
    timeLocationRow: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        gap: 2,
    },
    locationInfo: {
        flex: 1,
    },
    metadataColumn: {
        textAlign: 'right',
        display: 'flex',
        flexDirection: 'column',
        gap: 0.5,
        minWidth: { xs: 120, md: 180 },
    },
    metadataText: {
        fontSize: '0.8rem',
        color: 'text.secondary',
        fontWeight: 500,
        lineHeight: 1.4,
    },
    travelTimeText: {
        fontSize: '0.85rem',
        color: 'text.secondary',
        fontWeight: 600,
    },
    segmentFooter: {
        display: 'flex',
        alignItems: 'center',
        gap: 1.5,
        mt: 1,
        flexWrap: 'wrap',
    },
    footerText: {
        fontSize: '0.75rem',
        color: 'text.secondary',
        fontWeight: 500,
        opacity: 0.8,
    },
    layoverBox: (theme: Theme) => ({
        ml: 5,
        my: 2,
        py: 2,
        borderTop: `1px solid ${theme.palette.divider}`,
        borderBottom: `1px solid ${theme.palette.divider}`,
    }),
    layoverText: {
        fontSize: '0.85rem',
        fontWeight: 600,
        color: 'text.primary',
    },
    mapCard: (theme: Theme) => ({
        borderRadius: { xs: 3, md: 5 },
        overflow: 'hidden',
        boxShadow: theme.palette.mode === 'dark'
            ? '0 20px 50px rgba(0,0,0,0.5)'
            : '0 20px 50px rgba(0,0,0,0.05)',
        border: `1px solid ${theme.palette.divider}`,
        height: '100%',
        bgcolor: 'background.paper',
    }),
    mapContainer: {
        height: 400,
        width: '100%',
        position: 'relative',
    },
    priceInsightsCard: (theme: Theme) => ({
        mt: 3,
        p: 3,
        borderRadius: { xs: 3, md: 5 },
        boxShadow: theme.palette.mode === 'dark'
            ? '0 20px 50px rgba(0,0,0,0.5)'
            : '0 20px 50px rgba(0,0,0,0.05)',
        border: `1px solid ${theme.palette.divider}`,
        bgcolor: 'background.paper',
    }),
    priceHeader: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        mb: 2,
    },
    priceLevelBar: {
        width: '100%',
        height: 4,
        borderRadius: 2,
        display: 'flex',
        position: 'relative',
        mt: 5,
        mb: 4,
    },
    priceBarSegment: (color: string) => ({
        flex: 1,
        height: '100%',
        bgcolor: color,
        '&:first-of-type': { borderTopLeftRadius: 2, borderBottomLeftRadius: 2 },
        '&:last-of-type': { borderTopRightRadius: 2, borderBottomRightRadius: 2 },
    }),
    priceMarker: {
        position: 'absolute',
        top: '50%',
        transform: 'translate(-50%, -50%)',
        zIndex: 2,
    },
    priceDot: {
        width: 12,
        height: 12,
        borderRadius: '50%',
        bgcolor: '#4285f4',
        border: '2px solid #fff',
        boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
    },
    priceMarkerPopup: {
        position: 'absolute',
        bottom: 18,
        left: '50%',
        transform: 'translateX(-50%)',
        bgcolor: '#e8f0fe',
        color: '#1967d2',
        px: 1,
        py: 0.5,
        borderRadius: 10,
        whiteSpace: 'nowrap',
        fontSize: '0.75rem',
        fontWeight: 700,
        boxShadow: '0 1px 2px rgba(0,0,0,0.1)',
        '&:after': {
            content: '""',
            position: 'absolute',
            top: '100%',
            left: '50%',
            transform: 'translateX(-50%)',
            border: '5px solid transparent',
            borderTopColor: '#e8f0fe',
        },
    },
    chartContainer: {
        width: '100%',
        height: 200,
        mt: 2
    },
    amenityChip: (theme: Theme) => ({
        borderRadius: '10px',
        fontWeight: 600,
        fontSize: '0.75rem',
        height: 32,
        bgcolor: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.03)',
        border: `1px solid ${theme.palette.divider}`,
    }),
    carbonSection: (theme: Theme) => ({
        mt: 4,
        p: 3,
        borderRadius: 4,
        bgcolor: theme.palette.mode === 'dark' ? 'rgba(76, 175, 80, 0.08)' : 'rgba(76, 175, 80, 0.04)',
        border: `1px solid ${theme.palette.mode === 'dark' ? 'rgba(76, 175, 80, 0.2)' : 'rgba(76, 175, 80, 0.1)'}`,
    }),
    bookButton: (theme: Theme) => ({
        mt: 6,
        py: 2,
        borderRadius: '14px',
        fontWeight: 900,
        fontSize: '1.1rem',
        textTransform: 'none',
        boxShadow: '0 10px 20px rgba(0,0,0,0.1)',
        backgroundImage: theme.palette.mode === 'dark'
            ? 'linear-gradient(45deg, #00d2ff 0%, #3a7bd5 100%)'
            : `linear-gradient(45deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.light} 100%)`,
        '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: '0 15px 30px rgba(0,0,0,0.2)',
        }
    }),
    bookingCard: (theme: Theme) => ({
        mt: 4,
        p: 0,
        borderRadius: { xs: 3, md: 5 },
        boxShadow: theme.palette.mode === 'dark'
            ? '0 20px 50px rgba(0,0,0,0.5)'
            : '0 20px 50px rgba(0,0,0,0.05)',
        border: `1px solid ${theme.palette.divider}`,
        bgcolor: 'background.paper',
        overflow: 'hidden',
    }),
    bookingOptionRow: (theme: Theme) => ({
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        p: 3,
        borderBottom: `1px solid ${theme.palette.divider}`,
        transition: 'background-color 0.2s',
        '&:hover': {
            bgcolor: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.01)',
        },
        '&:last-child': {
            borderBottom: 'none',
        }
    }),
    bookingProvider: {
        display: 'flex',
        alignItems: 'center',
        gap: 3,
        flex: 1,
    },
    bookingPrice: {
        textAlign: 'right',
        mr: 2,
    },
    selectButton: () => ({
        borderRadius: '100px',
        px: 3,
        py: 0.8,
        fontWeight: 700,
        textTransform: 'none',
        minWidth: 100,
        fontSize: '0.85rem',
        border: '1px solid #dadce0',
        color: '#1a73e8',
        '&:hover': {
            bgcolor: '#f8f9fa',
            border: '1px solid #dadce0',
        }
    }),
    fareGrid: {
        display: 'flex',
        gap: 2,
        px: 3,
        pb: 4,
        overflowX: 'auto',
    },
    fareColumn: (theme: Theme) => ({
        flex: 1,
        minWidth: 260,
        borderRadius: 2,
        border: `1px solid ${theme.palette.divider}`,
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
    }),
    fareHeader: {
        p: 2,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
    },
    fareBody: {
        p: 2,
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        gap: 1.5,
        bgcolor: 'rgba(0,0,0,0.01)',
    },
    fareFooter: {
        p: 2,
        borderTop: '1px solid transparent',
    },
    featureRow: {
        display: 'flex',
        alignItems: 'flex-start',
        gap: 1.5,
    },
    featureIcon: {
        fontSize: 18,
        mt: 0.2,
    },
    continueButton: {
        borderRadius: '100px',
        py: 1.2,
        fontWeight: 700,
        textTransform: 'none',
        fontSize: '0.9rem',
    }
};
