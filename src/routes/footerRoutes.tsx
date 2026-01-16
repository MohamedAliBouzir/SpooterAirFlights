import { useLocation } from 'react-router-dom';
import Footer from '@/components/UI/Footer';

export const FooterRoutes = () => {
    const location = useLocation();

    const isHome = location.pathname === '/';
    return <Footer detail={isHome} />;
};
