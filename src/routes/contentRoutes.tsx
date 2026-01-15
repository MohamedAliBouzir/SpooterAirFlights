import { Routes, Route } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import { Box, CircularProgress } from '@mui/material';

const Home = lazy(() => import('@/pages/Home'));
const Flights = lazy(() => import('@/pages/Flights'));
const ComingSoon = lazy(() => import('@/pages/ComingSoon'));

const Loading = () => (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
    </Box>
);

export const ContentRoutes = () => {
    return (
        <Suspense fallback={<Loading />}>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/flights" element={<Flights />} />
                <Route path="/hotels" element={<ComingSoon title="Hotels" />} />
                <Route path="/cars" element={<ComingSoon title="Cars" />} />
                <Route path="/packages" element={<ComingSoon title="Packages" />} />
            </Routes>
        </Suspense>
    );
};
