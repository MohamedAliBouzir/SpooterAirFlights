import { create } from 'zustand';
import { serpApiService, type SerpApiFlightOption, type SerpApiBookingOption } from '@/services/serpApi';

export interface FlightSearchParams {
    origin: string;
    destination: string;
    departureDate: string | null;
    returnDate: string | null;
    passengers: number;
    tripType: 'round-trip' | 'one-way';
}

export interface FlightFilterParams {
    maxStops: number | null;
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
        at: string;
    };
    arrival: {
        code: string;
        at: string;
    };
    price: number;
    duration: string;
    stops: number;
    rawDuration: number;
    isBestDeal?: boolean;
    segments?: any[];
    layovers?: any[];
    emissions?: {
        this_flight: number;
        typical_for_this_route: number;
        difference_percent: number;
    };
    extensions?: string[];
    bookingLink?: string;
    bookingToken?: string;
}

export interface PriceTrendPoint {
    price: number;
    date: string;
    count: number;
}

interface FlightState {
    searchParams: FlightSearchParams;
    filters: FlightFilterParams;
    results: Flight[];
    priceTrends: PriceTrendPoint[];
    priceInsights: {
        lowestPrice?: number;
        priceLevel?: string;
        typicalPriceRange?: [number, number];
    } | null;
    bookingOptions: SerpApiBookingOption[];
    loading: boolean;
    error: string | null;

    setSearchParams: (params: Partial<FlightSearchParams>) => void;
    setFilters: (filters: Partial<FlightFilterParams>) => void;
    setPriceTrends: (trends: PriceTrendPoint[]) => void;
    searchFlights: () => Promise<void>;
    fetchBookingOptions: (booking_token: string) => Promise<void>;
    swapLocations: () => void;
}


const formatSerpApiDuration = (minutes: number): string => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
};

export const useFlightStore = create<FlightState>((set, get) => ({
    searchParams: {
        origin: 'ATL',
        destination: 'JFK',
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
    priceInsights: null,
    bookingOptions: [],
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
                    isBestDeal: f.price < 200,
                    segments: f.flights,
                    layovers: f.layovers,
                    emissions: f.carbon_emissions,
                    extensions: f.extensions,
                    bookingLink: f.link || `https://www.google.com/travel/flights?q=Flights%20to%20${lastSegment.arrival_airport.id}%20from%20${firstSegment.departure_airport.id}%20on%20${firstSegment.departure_airport.time.split('T')[0]}`,
                    bookingToken: f.booking_token
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
                trends = mappedFlights.map(f => ({
                    date: new Date(f.departure.at).toLocaleDateString([], { month: 'short', day: 'numeric' }),
                    price: f.price,
                    count: 1
                })).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
            }

            set({
                results: mappedFlights,
                priceTrends: trends,
                priceInsights: response.price_insights ? {
                    lowestPrice: response.price_insights.lowest_price,
                    priceLevel: response.price_insights.price_level,
                    typicalPriceRange: response.price_insights.typical_price_range,
                } : null,
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

    fetchBookingOptions: async (booking_token: string) => {
        const { searchParams } = get();
        set({ loading: true, error: null });
        try {
            const response = await serpApiService.getBookingOptions({
                booking_token,
                departure_id: searchParams.origin,
                arrival_id: searchParams.destination,
                outbound_date: searchParams.departureDate || new Date().toISOString().split('T')[0],
                return_date: searchParams.tripType === 'round-trip' ? searchParams.returnDate || undefined : undefined,
                trip_type: searchParams.tripType === 'round-trip' ? '1' : '2'
            });
            if (response.error) throw new Error(response.error);
            set({
                bookingOptions: response.booking_options || [],
                loading: false
            });
        } catch (err: any) {
            console.error(err);
            set({
                error: err.message || 'Failed to fetch booking options.',
                loading: false
            });
        }
    }
}));
