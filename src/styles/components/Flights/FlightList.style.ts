import type { SxProps, Theme } from '@mui/material/styles';

export const flightListStyles = {
    emptyState: (theme: Theme): SxProps<Theme> => ({
        textAlign: 'center',
        py: 10,
        bgcolor: 'background.paper',
        borderRadius: 4,
        border: '1px dashed',
        borderColor: theme.palette.divider
    })
};
