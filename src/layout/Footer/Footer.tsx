import { Box, Typography, Container, Link, Divider, IconButton, useTheme, useMediaQuery } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';
import { FooterStyle as footerStyles } from '@/styles/layout/Footer.style';

const Footer = ({ detail = false }: { detail?: boolean }) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const footerSections = [
        {
            title: 'Company',
            links: ['About', 'Careers', 'Mobile', 'Blog', 'How we work']
        },
        {
            title: 'Contact',
            links: ['Help/FAQ', 'Press', 'Affiliates', 'Hotel owners', 'Partners', 'Advertise with us']
        },
        {
            title: 'More',
            links: ['Airline fees', 'Airlines', 'Low fare tips', 'Badges & Certificates', 'Security']
        }
    ];

    if (!detail) {
        return (
            <Box sx={footerStyles.root(theme, false)}>
                <Typography variant="caption" color="text.secondary">
                    © {new Date().getFullYear()} Spooter Air. All rights reserved.
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
    const partnerLinks = ['SPOOTER', 'Booking.com', 'OpenTable', 'priceline', 'agoda'];
    const settingLinks = ['English', '$ USD'];

    return (
        <Box sx={footerStyles.root(theme, true)}>
            <Container maxWidth="lg">
                <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr 1fr', sm: '1fr 1fr 1fr 1fr' }, gap: 4, mb: 6 }}>
                    {footerSections.map((section) => (
                        <Box key={section.title}>
                            <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                                {section.title}
                            </Typography>
                            <Box sx={footerStyles.gridItem}>
                                {section.links.map((link) => (
                                    <Link
                                        key={link}
                                        href="#"
                                        underline="hover"
                                        color="text.secondary"
                                        sx={footerStyles.link}
                                    >
                                        {link}
                                    </Link>
                                ))}
                            </Box>
                        </Box>
                    ))}
                    <Box>
                        <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                            Get the Spooter app
                        </Typography>
                        <Box sx={footerStyles.appLinkBox}>
                            <Box component="img" sx={footerStyles.appBadge} src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg" />
                            <Box component="img" sx={footerStyles.appBadge} src="https://upload.wikimedia.org/wikipedia/commons/3/3c/Download_on_the_App_Store_Badge.svg" />
                        </Box>
                    </Box>
                </Box>

                <Divider sx={{ mb: 4 }} />

                <Box sx={footerStyles.bottomBar(isMobile)}>
                    <Box sx={footerStyles.legalLinks(isMobile)}>
                        <Typography variant="caption" color="text.secondary">© {new Date().getFullYear()} SPOOTER</Typography>
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
                        {partnerLinks.map((partner, index) => (
                            <Typography
                                key={partner}
                                variant={index === 0 ? "subtitle2" : "caption"}
                                fontWeight="bold"
                            >
                                {partner}
                            </Typography>
                        ))}
                    </Box>
                    <Box sx={footerStyles.settingLinks}>
                        {settingLinks.map((setting) => (
                            <Typography key={setting} variant="caption">
                                {setting}
                            </Typography>
                        ))}
                    </Box>
                </Box>
            </Container>
        </Box>
    );
};

export default Footer;
