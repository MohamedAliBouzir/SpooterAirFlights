import { useEffect, useState } from 'react';
import { Box, Container, Typography, Grid, Card, CardContent, Avatar, Link, Skeleton } from '@mui/material';
import { serpApiService, type NewsArticle } from '@/services/serpApi';
import { newsSectionStyles } from '@/styles/components/Home/NewsSection.style';
import { useTheme } from '@mui/material/styles';

const NewsSection = () => {
    const theme = useTheme();
    const [news, setNews] = useState<NewsArticle[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchNews = async () => {
            try {
                const response = await serpApiService.fetchFlightNews();
                if (response.news_results) {
                    setNews(response.news_results.slice(0, 8));
                } else {
                    setError('Failed to load news');
                }
            } catch (err) {
                console.error(err);
                setError('Failed to load news');
            } finally {
                setLoading(false);
            }
        };

        fetchNews();
    }, []);

    if (error) return null;

    return (
        <Box sx={newsSectionStyles.sectionContainer(theme)}>
            <Container maxWidth="lg">
                <Box sx={newsSectionStyles.headerContainer}>
                    <Typography variant="h3" sx={newsSectionStyles.title}>
                        Latest Flight News
                    </Typography>
                    <Typography variant="h6" color="text.secondary">
                        Stay updated with the latest trends and announcements in the aviation world.
                    </Typography>
                </Box>

                <Grid container spacing={4}>
                    {loading ? (
                        Array.from(new Array(4)).map((_, index) => (
                            <Grid size={{ xs: 12, sm: 6, md: 3 }} key={index}>
                                <Skeleton variant="rectangular" height={200} sx={{ borderRadius: 4, mb: 1 }} />
                                <Skeleton variant="text" />
                                <Skeleton variant="text" width="60%" />
                            </Grid>
                        ))
                    ) : (
                        news.map((item) => (
                            <Grid size={{ xs: 12, sm: 6, md: 3 }} key={item.position}>
                                <Card sx={newsSectionStyles.card(theme)} component={Link} href={item.link} target="_blank" underline="none">
                                    <Box sx={newsSectionStyles.imageContainer}>
                                        <Box
                                            component="img"
                                            src={item.thumbnail || item.source?.icon || 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=1000&auto=format&fit=crop'}
                                            alt={item.title}
                                            sx={newsSectionStyles.image}
                                            onError={(e) => {
                                                (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=1000&auto=format&fit=crop';
                                            }}
                                        />
                                    </Box>
                                    <CardContent sx={newsSectionStyles.content}>
                                        <Box sx={newsSectionStyles.sourceContainer}>
                                            <Avatar src={item.source?.icon} sx={{ width: 24, height: 24 }} alt={item.source?.name}>
                                                {item.source?.name?.[0] || 'N'}
                                            </Avatar>
                                            <Typography variant="caption" color="text.secondary" fontWeight="bold">
                                                {item.source?.name || 'News Source'}
                                            </Typography>
                                        </Box>
                                        <Typography variant="h6" sx={newsSectionStyles.articleTitle} color="text.primary">
                                            {item.title}
                                        </Typography>
                                        <Typography variant="caption" color="text.secondary" sx={newsSectionStyles.date}>
                                            {item.date}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))
                    )}
                </Grid>
            </Container>
        </Box>
    );
};

export default NewsSection;
