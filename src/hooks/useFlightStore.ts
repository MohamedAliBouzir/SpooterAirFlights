import { create } from 'zustand';
import { serpApiService, type SerpApiFlightOption } from '@/services/serpApi';

export interface FlightSearchParams {
    origin: string; // IATA code, e.g. ATL
    destination: string; // IATA code, e.g. JFK
    departureDate: string | null; // YYYY-MM-DD
    returnDate: string | null;
    passengers: number;
    tripType: 'round-trip' | 'one-way';
}

export interface FlightFilterParams {
    maxStops: number | null; // null = any
    maxPrice: number | null;
    airlines: string[];
}

export interface Flight {
    id: string;
    airline: string;
    airlineLogo: string;
    flightNumber: string;
    departure: {
        code: string;
        at: string; // "YYYY-MM-DD HH:mm" or ISO
    };
    arrival: {
        code: string;
        at: string;
    };
    price: number;
    duration: string; // Formatted string "2h 30m"
    stops: number;
    rawDuration: number; // minutes for sorting/filtering
    isBestDeal?: boolean; // True if price < $200
}

export interface PriceTrendPoint {
    price: number;
    date: string;
    count: number; // Using timestamp as 'count' or arbitrary value for graph x-axis if needed
}

interface FlightState {
    searchParams: FlightSearchParams;
    filters: FlightFilterParams;
    results: Flight[];
    priceTrends: PriceTrendPoint[];
    loading: boolean;
    error: string | null;

    setSearchParams: (params: Partial<FlightSearchParams>) => void;
    setFilters: (filters: Partial<FlightFilterParams>) => void;
    setPriceTrends: (trends: PriceTrendPoint[]) => void;
    searchFlights: () => Promise<void>;
    swapLocations: () => void;
}

// Helpers
const formatSerpApiDuration = (minutes: number): string => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
};

export const useFlightStore = create<FlightState>((set, get) => ({
    searchParams: {
        origin: 'ATL',
        destination: 'JFK', // Default demo route
        departureDate: new Date().toISOString().split('T')[0],
        returnDate: null,
        passengers: 1,
        tripType: 'round-trip',
    },
    filters: {
        maxStops: null,
        maxPrice: null,
        airlines: [],
    },
    results: [],
    priceTrends: [],
    loading: false,
    error: null,

    setSearchParams: (params) => set((state) => ({ searchParams: { ...state.searchParams, ...params } })),
    setFilters: (filters) => set((state) => ({ filters: { ...state.filters, ...filters } })),
    setPriceTrends: (trends) => set({ priceTrends: trends }),

    swapLocations: () => set((state) => ({
        searchParams: {
            ...state.searchParams,
            origin: state.searchParams.destination,
            destination: state.searchParams.origin
        }
    })),

    searchFlights: async () => {
        const { searchParams } = get();
        set({ loading: true, error: null });

        try {
            const response = await serpApiService.searchFlights({
                departure_id: searchParams.origin,
                arrival_id: searchParams.destination,
                outbound_date: searchParams.departureDate || new Date().toISOString().split('T')[0],
                passengers: searchParams.passengers,
                return_date: searchParams.tripType === 'round-trip' ? searchParams.returnDate || undefined : undefined
            });

            if (response.error) throw new Error(response.error);

            const rawFlights = [
                ...(response.best_flights || []),
                ...(response.other_flights || [])
            ];

            const mappedFlights: Flight[] = rawFlights.map((f: SerpApiFlightOption, index) => {
                const firstSegment = f.flights[0];
                const lastSegment = f.flights[f.flights.length - 1];

                return {
                    id: `${firstSegment.flight_number}_${index}_${Date.now()}`,
                    airline: firstSegment.airline,
                    airlineLogo: f.airline_logo || firstSegment.airline_logo,
                    flightNumber: firstSegment.flight_number,
                    departure: {
                        code: firstSegment.departure_airport.id,
                        at: firstSegment.departure_airport.time,
                    },
                    arrival: {
                        code: lastSegment.arrival_airport.id,
                        at: lastSegment.arrival_airport.time,
                    },
                    price: f.price,
                    duration: formatSerpApiDuration(f.total_duration),
                    stops: f.layovers ? f.layovers.length : 0,
                    rawDuration: f.total_duration,
                    isBestDeal: f.price < 200 // Mark as best deal if under $200
                };
            });

            let trends: PriceTrendPoint[] = [];
            if (response.price_insights && response.price_insights.price_history) {
                trends = response.price_insights.price_history.map(([timestamp, price]) => ({
                    date: new Date(timestamp * 1000).toLocaleDateString([], { month: 'short', day: 'numeric' }),
                    price: price,
                    count: 1
                }));
            } else {
                // Better fallback for trends
                trends = mappedFlights.map(f => ({
                    date: new Date(f.departure.at).toLocaleDateString([], { month: 'short', day: 'numeric' }),
                    price: f.price,
                    count: 1
                })).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
            }

            set({
                results: mappedFlights,
                priceTrends: trends,
                loading: false
            });

        } catch (err: any) {
            console.error(err);
            set({
                error: err.message || 'Failed to fetch flight data.',
                loading: false,
                results: []
            });
        }
    },
}));
