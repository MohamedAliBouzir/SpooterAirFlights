import { BrowserRouter } from 'react-router-dom';
import { AppThemeProvider } from '@/providers/ThemeProvider';
import { ContentRoutes } from '@/routes/contentRoutes';
import MainLayout from '@/components/layouts/MainLayout';

const App = () => {
    return (
        <BrowserRouter>
            <AppThemeProvider>
                <MainLayout>
                    <ContentRoutes />
                </MainLayout>
            </AppThemeProvider>
        </BrowserRouter>
    );
};

export default App;
