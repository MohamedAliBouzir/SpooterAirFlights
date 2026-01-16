import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Paper, Typography, useTheme, Box } from '@mui/material';
import { useFlightStore } from '@/hooks/useFlightStore';
import { priceGraphStyles } from '@/styles/components/Flights/PriceGraph.style';

const PriceGraph = () => {
    const theme = useTheme();
    const { priceTrends } = useFlightStore();

    if (!priceTrends || priceTrends.length === 0) {
        return null; // Or a placeholder
    }

    return (
        <Paper
            elevation={2}
            sx={priceGraphStyles.paper(theme)}
        >
            <Typography variant="h6" sx={priceGraphStyles.title}>
                Price Trends
            </Typography>
            <Box sx={priceGraphStyles.chartContainer}>
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                        data={priceTrends}
                        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                    >
                        <defs>
                            <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor={theme.palette.secondary.main} stopOpacity={0.3} />
                                <stop offset="95%" stopColor={theme.palette.secondary.main} stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={theme.palette.divider} />
                        <XAxis
                            dataKey="date"
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: theme.palette.text.secondary, fontSize: 12 }}
                        />
                        <YAxis
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: theme.palette.text.secondary, fontSize: 12 }}
                            unit="$"
                        />
                        <Tooltip
                            contentStyle={{
                                backgroundColor: theme.palette.background.paper,
                                border: `1px solid ${theme.palette.divider}`,
                                borderRadius: 8,
                            }}
                        />
                        <Area
                            type="monotone"
                            dataKey="price"
                            stroke={theme.palette.secondary.main}
                            fillOpacity={1}
                            fill="url(#colorPrice)"
                            strokeWidth={3}
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </Box>
        </Paper>
    );
};

export default PriceGraph;
