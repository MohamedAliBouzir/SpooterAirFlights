import { create } from 'zustand';
import { dummyFlights, dummyPriceTrends } from '@/assets/data/dummyFlights';

export interface FlightSearchParams {
    origin: string;
    destination: string;
    departureDate: string | null;
    returnDate: string | null;
    passengers: number;
}

export interface FlightFilterParams {
    maxStops: number | null; // null = any
    maxPrice: number | null;
    airlines: string[];
}

export interface Flight {
    id: string;
    airline: string;
    flightNumber: string;
    departure: {
        code: string;
        at: string; // ISO date
    };
    arrival: {
        code: string;
        at: string;
    };
    price: number;
    duration: string;
    stops: number;
}

export interface PriceTrendPoint {
    price: number;
    date: string; // or any x-axis value
    count: number;
}

interface FlightState {
    searchParams: FlightSearchParams;
    filters: FlightFilterParams;
    results: Flight[];
    priceTrends: PriceTrendPoint[];
    loading: boolean;

    setSearchParams: (params: Partial<FlightSearchParams>) => void;
    setFilters: (filters: Partial<FlightFilterParams>) => void;
    setResults: (results: Flight[]) => void;
    setPriceTrends: (trends: PriceTrendPoint[]) => void;
    setLoading: (loading: boolean) => void;
    searchFlights: () => Promise<void>;
}

export const useFlightStore = create<FlightState>((set) => ({
    searchParams: {
        origin: '',
        destination: '',
        departureDate: null,
        returnDate: null,
        passengers: 1,
    },
    filters: {
        maxStops: null,
        maxPrice: null,
        airlines: [],
    },
    results: [],
    priceTrends: [],
    loading: false,

    setSearchParams: (params) => set((state) => ({ searchParams: { ...state.searchParams, ...params } })),
    setFilters: (filters) => set((state) => ({ filters: { ...state.filters, ...filters } })),
    setResults: (results) => set({ results }),
    setPriceTrends: (trends) => set({ priceTrends: trends }),
    setLoading: (loading) => set({ loading }),
    searchFlights: async () => {
        set({ loading: true });
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 800));
        // In a real app, we would fetch from API based on searchParams
        set({
            results: dummyFlights,
            priceTrends: dummyPriceTrends,
            loading: false
        });
    },
}));
