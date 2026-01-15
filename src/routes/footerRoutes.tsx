import { useLocation } from 'react-router-dom';
import Footer from '@/components/UI/Footer';

export const FooterRoutes = () => {
    const location = useLocation();

    // Check if we are on the home page
    const isHome = location.pathname === '/';

    // Return the appropriate footer
    // Just for demo, Home gets "detail" footer, others get standard
    return <Footer detail={isHome} />;
};
