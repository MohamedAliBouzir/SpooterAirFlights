import { Box } from '@mui/material';
import Navbar from '@/components/UI/Navbar';
import { FooterRoutes } from '@/routes/footerRoutes';
import type { ReactNode } from 'react';

interface MainLayoutProps {
    children: ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', width: '100%' }}>
            <Navbar />
            <Box component="main" sx={{ flexGrow: 1, width: '100%', display: 'flex', flexDirection: 'column' }}>
                {children}
            </Box>
            <FooterRoutes />
        </Box>
    );
};

export default MainLayout;
