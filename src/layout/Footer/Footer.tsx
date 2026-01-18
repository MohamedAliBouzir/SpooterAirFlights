import { Box, Typography, Container, Link, IconButton, useTheme, useMediaQuery } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';
import { FooterStyle as footerStyles } from '@/styles/layout/Footer.style';

const Footer = ({ detail = false }: { detail?: boolean }) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));



    if (!detail) {
        return (
            <Box sx={footerStyles.root(theme, false)}>
                <Typography variant="caption" color="text.secondary">
                    © {new Date().getFullYear()} Spotter Air. All rights reserved.
                </Typography>
            </Box>
        );
    }

    const legalLinks = ['Privacy', 'Terms & Conditions', 'Ad Choices'];
    const socialLinks = [
        { Icon: FacebookIcon, label: 'Facebook' },
        { Icon: TwitterIcon, label: 'Twitter' },
        { Icon: YouTubeIcon, label: 'YouTube' },
        { Icon: InstagramIcon, label: 'Instagram' }
    ];
    const appRoutes = [
        { label: 'Flights', path: '/flights' },
        { label: 'Hotels', path: '/hotels' },
        { label: 'Cars', path: '/cars' }
    ];

    return (
        <Box sx={footerStyles.root(theme, true)}>
            <Container maxWidth="lg">
                <Box sx={footerStyles.bottomBar(isMobile)}>
                    <Box sx={footerStyles.legalLinks(isMobile)}>
                        <Typography variant="caption" color="text.secondary">© {new Date().getFullYear()} SPOTTER</Typography>
                        {legalLinks.map((link) => (
                            <Link key={link} href="#" underline="hover" color="text.secondary" sx={{ fontSize: '0.75rem' }}>
                                {link}
                            </Link>
                        ))}
                    </Box>

                    <Box sx={footerStyles.socialBox}>
                        {socialLinks.map(({ Icon, label }) => (
                            <IconButton key={label} size="small" aria-label={label}>
                                <Icon fontSize="small" />
                            </IconButton>
                        ))}
                    </Box>
                </Box>

                <Box sx={footerStyles.partnerBar(isMobile)}>
                    <Box sx={footerStyles.partnerLinks}>
                        {appRoutes.map((route) => (
                            <Link
                                key={route.path}
                                href={route.path}
                                underline="hover"
                                color="text.secondary"
                                sx={{ fontSize: '0.875rem', fontWeight: 500 }}
                            >
                                {route.label}
                            </Link>
                        ))}
                    </Box>
                    <Box sx={{ display: 'flex', gap: 2 }}>
                        <Box component="img" sx={footerStyles.appBadge} src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg" />
                        <Box component="img" sx={footerStyles.appBadge} src="https://upload.wikimedia.org/wikipedia/commons/3/3c/Download_on_the_App_Store_Badge.svg" />
                    </Box>
                </Box>
            </Container>
        </Box>
    );
};

export default Footer;
