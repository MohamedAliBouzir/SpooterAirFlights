import { Container, Typography, Box, Button, useTheme, Grid, Paper, Avatar, AvatarGroup, IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay, EffectFade } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/autoplay';
import 'swiper/css/effect-fade';

import { homeStyles } from '@/styles/pages/Home.style';
import NewsSection from '@/components/Home/NewsSection';

// Import images
import aiAssistantImg from '@/assets/home/ai_travel_assistant.png';
import exploreImg from '@/assets/home/explore.png';
import tripsImg from '@/assets/home/trips.png';
import priceAlertsImg from '@/assets/home/price_alerts.png';
import flightTrackerImg from '@/assets/home/flight_tracker.png';
import bestTimeImg from '@/assets/home/best_time_to_travel.png';

const Home = () => {
    const theme = useTheme();
    const navigate = useNavigate();

    const heroImages = [
        "https://images.unsplash.com/photo-1542296332-2e4473faf563?q=80&w=2070&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=2070&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1506012787146-f92b2d7d6d96?q=80&w=2069&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=2070&auto=format&fit=crop"
    ];

    const valueProps = [
        {
            title: "Save when you compare",
            description: "More deals. More sites. One search.",
            icon: (
                <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                    {['✈️', '🏨', '🚗'].map((emoji, i) => (
                        <Avatar key={i} sx={{ width: 32, height: 32, fontSize: '1rem', bgcolor: theme.palette.mode === 'dark' ? 'primary.dark' : '#f5f7f9', border: `1px solid ${theme.palette.divider}` }}>{emoji}</Avatar>
                    ))}
                </Box>
            )
        },
        {
            title: "41,000,000+",
            description: "searches this week",
            icon: (
                <AvatarGroup max={3} sx={{ mb: 2, justifyContent: 'flex-start', '& .MuiAvatar-root': { width: 32, height: 32 } }}>
                    <Avatar alt="User 1" src="https://i.pravatar.cc/150?u=11" />
                    <Avatar alt="User 2" src="https://i.pravatar.cc/150?u=22" />
                    <Avatar alt="User 3" src="https://i.pravatar.cc/150?u=33" />
                </AvatarGroup>
            )
        },
        {
            title: "Travelers love us",
            description: "1M+ ratings on our app",
            icon: (
                <Box sx={{ mb: 2, display: 'flex', gap: 0.5 }}>
                    {[1, 2, 3, 4, 5].map(i => <Typography key={i} sx={{ color: '#ff9800', fontSize: '1.2rem' }}>★</Typography>)}
                </Box>
            )
        }
    ];

    const travelProCards = [
        { title: "SPOOTER.ai", subtitle: "BETA", description: "Get travel questions answered", image: aiAssistantImg },
        { title: "Explore", description: "See destinations on your budget", image: exploreImg },
        { title: "Trips", description: "Keep all your plans in one place", image: tripsImg },
        { title: "Price Alerts", description: "Know when prices change", image: priceAlertsImg },
        { title: "Flight Tracker", description: "See real-time delays", image: flightTrackerImg },
        { title: "Best Time to Travel", description: "Know when to save", image: bestTimeImg }
    ];

    return (
        <Box sx={homeStyles.root}>
            <Box sx={homeStyles.hero(theme)}>
                <Box sx={homeStyles.heroBgCarousel}>
                    <Swiper
                        modules={[Autoplay, EffectFade]}
                        effect="fade"
                        autoplay={{ delay: 5000, disableOnInteraction: false }}
                        loop={true}
                    >
                        {heroImages.map((img, i) => (
                            <SwiperSlide key={i}>
                                <Box component="img" src={img} alt={`Slide ${i}`} />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </Box>
                <Box sx={homeStyles.heroBgOverlay(theme)} />

                <Box sx={homeStyles.heroContent}>
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <Typography variant="h1" sx={homeStyles.heroTitle(theme)}>
                            Explore the World <br /> with Spooter Air
                        </Typography>
                        <Typography variant="h5" sx={homeStyles.heroSubtitle(theme)}>
                            Discover the fastest routes and lowest fares with our next-generation flight search engine.
                        </Typography>
                        <Button
                            variant="contained"
                            size="large"
                            color="secondary"
                            endIcon={<FlightTakeoffIcon />}
                            onClick={() => navigate('/flights')}
                            sx={homeStyles.heroButton(theme)}
                        >
                            Start Searching
                        </Button>
                    </motion.div>
                </Box>
            </Box>

            <Container maxWidth="lg" sx={homeStyles.container}>
                <Grid container spacing={3}>
                    {valueProps.map((prop, index) => (
                        <Grid size={{ xs: 12, sm: 6, md: 4 }} key={index}>
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <Paper sx={homeStyles.valuePropPaper(theme)}>
                                    {prop.icon}
                                    <Typography variant="h6" fontWeight="bold" gutterBottom>{prop.title}</Typography>
                                    <Typography variant="body2" color="text.secondary">{prop.description}</Typography>
                                </Paper>
                            </motion.div>
                        </Grid>
                    ))}
                </Grid>

                <Box sx={{ mt: 15 }}>
                    <Typography variant="h3" sx={homeStyles.travelProsTitle(theme)}>
                        Future Features
                    </Typography>

                    <Box sx={{ position: 'relative', ...homeStyles.travelProsSwiper }}>
                        <Swiper
                            modules={[Navigation]}
                            spaceBetween={24}
                            slidesPerView={1.2}
                            breakpoints={{
                                600: { slidesPerView: 2.2 },
                                900: { slidesPerView: 3.2 },
                                1200: { slidesPerView: 4 }
                            }}
                            navigation={{
                                prevEl: '.swiper-button-prev-pros',
                                nextEl: '.swiper-button-next-pros',
                            }}
                        >
                            {travelProCards.map((card, index) => (
                                <SwiperSlide key={index}>
                                    <Paper sx={homeStyles.carouselCard(theme)}>
                                        <Box sx={{ mb: 3 }}>
                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                                                <Typography variant="h5" fontWeight="bold">{card.title}</Typography>
                                                {card.subtitle && (
                                                    <Typography variant="caption" sx={{
                                                        bgcolor: 'primary.main',
                                                        color: 'white',
                                                        px: 1.5,
                                                        py: 0.3,
                                                        borderRadius: '100px',
                                                        fontWeight: 800,
                                                        fontSize: '0.65rem',
                                                        letterSpacing: '0.05em',
                                                        display: 'inline-flex'
                                                    }}>
                                                        {card.subtitle}
                                                    </Typography>
                                                )}
                                            </Box>
                                            <Typography variant="body2" color="text.secondary">{card.description}</Typography>
                                        </Box>

                                        <Box sx={{
                                            flexGrow: 1,
                                            display: 'flex',
                                            alignItems: 'flex-end',
                                            justifyContent: 'center',
                                            overflow: 'hidden'
                                        }}>
                                            <Box
                                                component="img"
                                                src={card.image}
                                                alt={card.title}
                                                sx={homeStyles.carouselImage}
                                            />
                                        </Box>
                                    </Paper>
                                </SwiperSlide>
                            ))}
                        </Swiper>

                        <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mt: 3 }}>
                            <IconButton className="swiper-button-prev-pros" sx={{ bgcolor: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.05)' : '#f5f7f9', '&:hover': { bgcolor: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.1)' : '#eef1f4' } }}>
                                <KeyboardArrowLeftIcon />
                            </IconButton>
                            <IconButton className="swiper-button-next-pros" sx={{ bgcolor: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.05)' : '#f5f7f9', '&:hover': { bgcolor: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.1)' : '#eef1f4' } }}>
                                <KeyboardArrowRightIcon />
                            </IconButton>
                        </Box>
                    </Box>
                </Box>
            </Container>

            <NewsSection />
        </Box>
    );
};

export default Home;
