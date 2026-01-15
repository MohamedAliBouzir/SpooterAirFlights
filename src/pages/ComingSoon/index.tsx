import { Box, Typography, Button, Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ConstructionIcon from '@mui/icons-material/Construction';
import { motion } from 'framer-motion';

const ComingSoon = ({ title }: { title: string }) => {
    const navigate = useNavigate();

    return (
        <Container maxWidth="md">
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '70vh',
                textAlign: 'center',
                gap: 3
            }}>
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', damping: 10 }}
                >
                    <ConstructionIcon sx={{ fontSize: 100, color: 'secondary.main', mb: 2 }} />
                </motion.div>

                <Typography variant="h2" fontWeight="900" sx={{
                    background: 'linear-gradient(45deg, #005a9c 30%, #00d2ff 90%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                }}>
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
                    sx={{ px: 4, py: 1.5, borderRadius: '100px', fontWeight: 'bold' }}
                >
                    Back to Home
                </Button>
            </Box>
        </Container>
    );
};

export default ComingSoon;
