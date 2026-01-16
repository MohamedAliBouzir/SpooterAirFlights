import type { SxProps, Theme } from '@mui/material/styles';

export const newsSectionStyles = {
    sectionContainer: (theme: Theme): SxProps<Theme> => ({
        py: 8,
        bgcolor: theme.palette.mode === 'dark' ? '#0a1929' : '#f5f7fa',
    }),
    headerContainer: {
        mb: 6,
        textAlign: 'center',
    },
    title: { // Removed the function signature as it's not dynamic based on theme, simplified to object
        fontWeight: 800,
        mb: 2,
        background: 'linear-gradient(45deg, #FF6B6B 30%, #4ECDC4 90%)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
    },
    card: (theme: Theme): SxProps<Theme> => ({
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        borderRadius: 4,
        overflow: 'hidden',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        '&:hover': {
            transform: 'translateY(-8px)',
            boxShadow: theme.shadows[8],
        }
    }),
    imageContainer: {
        position: 'relative',
        paddingTop: '56.25%', // 16:9 aspect ratio
        overflow: 'hidden',
    },
    image: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        transition: 'transform 0.5s ease',
        '&:hover': {
            transform: 'scale(1.05)',
        }
    },
    content: {
        flexGrow: 1,
        p: 3,
        display: 'flex',
        flexDirection: 'column',
    },
    sourceContainer: {
        display: 'flex',
        alignItems: 'center',
        gap: 1,
        mb: 2
    },
    sourceIcon: {
        width: 20,
        height: 20,
        borderRadius: '50%',
    },
    articleTitle: {
        fontWeight: 'bold',
        mb: 2,
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        display: '-webkit-box',
        WebkitLineClamp: 3,
        WebkitBoxOrient: 'vertical',
        flexGrow: 1,
    },
    date: {
        mt: 'auto',
        textAlign: 'right',
        fontSize: '0.75rem',
        opacity: 0.7
    }
};
