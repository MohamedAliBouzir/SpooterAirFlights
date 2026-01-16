import { Box } from '@mui/material';
import Navbar from '@/components/UI/Navbar';
import { FooterRoutes } from '@/routes/footerRoutes';
import type { ReactNode } from 'react';
import { mainLayoutStyles } from '@/styles/layout/MainLayout.style';

interface MainLayoutProps {
    children: ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
    return (
        <Box sx={mainLayoutStyles.root}>
            <Navbar />
            <Box component="main" sx={mainLayoutStyles.main}>
                {children}
            </Box>
            <FooterRoutes />
        </Box>
    );
};

export default MainLayout;
