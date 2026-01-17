import { Routes, Route } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import { Box, CircularProgress } from '@mui/material';

const Home = lazy(() => import('@/pages/Home'));
const Flights = lazy(() => import('@/pages/Flights'));
const Hotels = lazy(() => import('@/pages/Hotels'));
const ComingSoon = lazy(() => import('@/pages/ComingSoon'));

const Loading = () => (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
    </Box>
);

const FlightDetails = lazy(() => import('@/pages/Flights/FlightDetails'));

export const ContentRoutes = () => {
    return (
        <Suspense fallback={<Loading />}>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/flights" element={<Flights />} />
                <Route path="/flights/:id" element={<FlightDetails />} />
                <Route path="/hotels" element={<Hotels />} />
                <Route path="/cars" element={<ComingSoon title="Cars" />} />
            </Routes>
        </Suspense>
    );
};
