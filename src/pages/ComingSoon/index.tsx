import { Box, Typography, Button, Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ConstructionIcon from '@mui/icons-material/Construction';
import { motion } from 'framer-motion';
import { comingSoonStyles } from '@/styles/pages/ComingSoon.style';

const ComingSoon = ({ title }: { title: string }) => {
    const navigate = useNavigate();

    return (
        <Container maxWidth="md">
            <Box sx={comingSoonStyles.container}>
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', damping: 10 }}
                >
                    <ConstructionIcon sx={comingSoonStyles.icon} />
                </motion.div>

                <Typography variant="h2" fontWeight="900" sx={comingSoonStyles.title}>
                    {title}
                </Typography>

                <Typography variant="h5" color="text.secondary">
                    We're currently building this feature. Check back soon for the best deals on {title.toLowerCase()}!
                </Typography>

                <Button
                    variant="contained"
                    color="primary"
                    size="large"
                    onClick={() => navigate('/')}
                    sx={comingSoonStyles.button}
                >
                    Back to Home
                </Button>
            </Box>
        </Container>
    );
};

export default ComingSoon;
