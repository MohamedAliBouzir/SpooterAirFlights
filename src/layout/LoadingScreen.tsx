import { Box, CircularProgress } from "@mui/material";
import { LoadingScreenStyle } from "@/styles/layout/LoadingScreen.style";

const LoadingScreen = () => {
    return (
        <Box sx={LoadingScreenStyle}>
            <CircularProgress />
        </Box>
    );
};

export default LoadingScreen;
