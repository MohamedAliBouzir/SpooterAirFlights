import { Box, Container, Typography, Button, useTheme } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import { notFoundStyles } from '@/styles/pages/NotFound.style';

const NotFound = () => {
    const theme = useTheme();
    const navigate = useNavigate();

    return (
        <Box sx={notFoundStyles.root(theme)}>
            <Container maxWidth="md" sx={notFoundStyles.container}>
                <motion.div
                    initial={{ opacity: 0, y: -50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <Box sx={notFoundStyles.iconContainer}>
                        <motion.div
                            animate={{
                                y: [0, -20, 0],
                                rotate: [0, 10, -10, 0]
                            }}
                            transition={{
                                duration: 3,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }}
                        >
                            <FlightTakeoffIcon sx={notFoundStyles.planeIcon(theme)} />
                        </motion.div>
                    </Box>

                    <Typography variant="h1" sx={notFoundStyles.errorCode(theme)}>
                        404
                    </Typography>

                    <Typography variant="h3" sx={notFoundStyles.title(theme)}>
                        Oops! Flight Not Found
                    </Typography>

                    <Typography variant="h6" sx={notFoundStyles.subtitle}>
                        Looks like this destination doesn't exist in our flight map.
                    </Typography>

                    <Typography variant="body1" sx={notFoundStyles.description}>
                        The page you're looking for seems to have taken off without us.
                        Don't worry, we'll help you get back on track!
                    </Typography>

                    <Box sx={notFoundStyles.buttonContainer}>
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <Button
                                variant="contained"
                                size="large"
                                startIcon={<HomeIcon />}
                                onClick={() => navigate('/')}
                                sx={notFoundStyles.primaryButton(theme)}
                            >
                                Back to Home
                            </Button>
                        </motion.div>

                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <Button
                                variant="outlined"
                                size="large"
                                startIcon={<SearchIcon />}
                                onClick={() => navigate('/flights')}
                                sx={notFoundStyles.secondaryButton(theme)}
                            >
                                Search Flights
                            </Button>
                        </motion.div>
                    </Box>

                    <Box sx={notFoundStyles.decorativeElements}>
                        {[...Array(5)].map((_, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, scale: 0 }}
                                animate={{ opacity: 0.1, scale: 1 }}
                                transition={{
                                    duration: 1,
                                    delay: index * 0.2,
                                    repeat: Infinity,
                                    repeatType: "reverse"
                                }}
                            >
                                <Box sx={notFoundStyles.cloud(index)} />
                            </motion.div>
                        ))}
                    </Box>
                </motion.div>
            </Container>
        </Box>
    );
};

export default NotFound;
