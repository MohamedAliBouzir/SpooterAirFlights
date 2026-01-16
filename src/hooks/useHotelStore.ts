import { create } from 'zustand';
import { serpApiService, type HotelResult } from '@/services/serpApi';

export interface HotelSearchParams {
    q: string;
    checkInDate: string;
    checkOutDate: string;
    adults: number;
    children: number;
}

export interface HotelFilterParams {
    minPrice: number | null;
    maxPrice: number | null;
    rating: number | null;
    propertyType: 'hotel' | 'vacation_rental' | null;
}

interface HotelState {
    searchParams: HotelSearchParams;
    filters: HotelFilterParams;
    results: HotelResult[];
    loading: boolean;
    error: string | null;

    setSearchParams: (params: Partial<HotelSearchParams>) => void;
    setFilters: (filters: Partial<HotelFilterParams>) => void;
    searchHotels: () => Promise<void>;
}

export const useHotelStore = create<HotelState>((set, get) => ({
    searchParams: {
        q: 'Paris',
        checkInDate: new Date(Date.now() + 86400000).toISOString().split('T')[0], // Tomorrow
        checkOutDate: new Date(Date.now() + 86400000 * 3).toISOString().split('T')[0], // 3 days later
        adults: 2,
        children: 0,
    },
    filters: {
        minPrice: null,
        maxPrice: null,
        rating: null,
        propertyType: null,
    },
    results: [],
    loading: false,
    error: null,

    setSearchParams: (params) => set((state) => ({ searchParams: { ...state.searchParams, ...params } })),
    setFilters: (filters) => set((state) => ({ filters: { ...state.filters, ...filters } })),

    searchHotels: async () => {
        const { searchParams } = get();
        set({ loading: true, error: null });

        try {
            const response = await serpApiService.searchHotels({
                q: searchParams.q,
                check_in_date: searchParams.checkInDate,
                check_out_date: searchParams.checkOutDate,
                adults: searchParams.adults,
                children: searchParams.children,
            });

            if (response.error) throw new Error(response.error);

            set({
                results: response.properties || [],
                loading: false
            });
        } catch (err: any) {
            console.error(err);
            set({
                error: err.message || 'Failed to fetch hotel data.',
                loading: false,
                results: []
            });
        }
    },
}));
