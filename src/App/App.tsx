import { BrowserRouter } from 'react-router-dom';
import { AppThemeProvider } from '@/providers/ThemeProvider';
import Wrapper from '@/layout/Wrapper';

const App = () => {
    return (
        <BrowserRouter>
            <AppThemeProvider>
                <Wrapper />
            </AppThemeProvider>
        </BrowserRouter>
    );
};

export default App;
