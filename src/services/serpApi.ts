import queryString from 'query-string';

const API_KEY = import.meta.env.VITE_SERPAPI_KEY;
const BASE_URL = '/api/serpapi/search.json';

export interface SerpApiFlightSegment {
    departure_airport: {
        name: string;
        id: string;
        time: string;
    };
    arrival_airport: {
        name: string;
        id: string;
        time: string;
    };
    duration: number;
    airline: string;
    airline_logo: string;
    flight_number: string;
    travel_class: string;
}

export interface SerpApiFlightOption {
    flights: SerpApiFlightSegment[];
    layovers?: any[];
    total_duration: number;
    price: number;
    type: string;
    airline_logo: string;
    departure_token?: string;
}

export interface AutocompleteResult {
    id: string;
    title: string;
    subtitle: string;
    type: string;
}

export interface SerpApiResponse {
    search_metadata: {
        status: string;
        id: string;
    };
    best_flights?: SerpApiFlightOption[];
    other_flights?: SerpApiFlightOption[];
    price_insights?: {
        lowest_price: number;
        price_level: string;
        price_history?: [number, number][];
    };
    error?: string;
}

export interface HotelResult {
    hotel_id: string;
    name: string;
    description: string;
    link: string;
    gps_coordinates: {
        latitude: number;
        longitude: number;
    };
    check_in_time: string;
    check_out_time: string;
    rate_per_night: {
        lowest: string;
        extracted_lowest: number;
        before_taxes_fees: string;
        extracted_before_taxes_fees: number;
    };
    total_rate: {
        lowest: string;
        extracted_lowest: number;
        before_taxes_fees: string;
        extracted_before_taxes_fees: number;
    };
    nearby_places: any[];
    images: {
        thumbnail: string;
    }[];
    overall_rating: number;
    reviews: number;
    ratings: any[];
    amenities: string[];
    property_token: string;
}

export interface HotelAutocompleteResult {
    id: string;
    title: string;
    subtitle: string;
    type: string;
}

export interface SerpApiHotelResponse {
    properties?: HotelResult[];
    error?: string;
}

export const serpApiService = {
    searchFlights: async (params: {
        departure_id: string;
        arrival_id: string;
        outbound_date: string;
        return_date?: string;
        passengers?: number;
    }): Promise<SerpApiResponse> => {
        const queryParams: any = {
            engine: 'google_flights',
            api_key: API_KEY,
            hl: 'en',
            currency: 'USD',
            departure_id: params.departure_id,
            arrival_id: params.arrival_id,
            outbound_date: params.outbound_date,
            passengers: params.passengers || 1
        };

        if (params.return_date) {
            queryParams.return_date = params.return_date;
            queryParams.type = "1";
        } else {
            queryParams.type = "2";
        }

        const url = `${BASE_URL}?${queryString.stringify(queryParams)}`;
        const response = await fetch(url);
        if (!response.ok) throw new Error(`SerpApi Error: ${response.status}`);
        return await response.json();
    },

    getAutocomplete: async (q: string): Promise<AutocompleteResult[]> => {
        const queryParams = {
            engine: 'google_flights_autocomplete',
            api_key: API_KEY,
            q
        };
        const url = `${BASE_URL}?${queryString.stringify(queryParams)}`;
        const response = await fetch(url);
        if (!response.ok) throw new Error(`Autocomplete Error: ${response.status}`);
        const data = await response.json();

        const results: AutocompleteResult[] = [];
        (data.suggestions || []).forEach((s: any, index: number) => {
            // Add city/region
            const mainId = s.id || `suggest-${index}`;
            results.push({
                id: mainId,
                title: s.name || '',
                subtitle: s.description || '',
                type: s.type || ''
            });

            // Add nested airports if any
            if (s.type === 'city' && s.airports && s.airports.length > 0) {
                s.airports.forEach((a: any) => {
                    results.push({
                        id: a.id, // IATA code
                        title: a.name,
                        subtitle: `${a.distance ? a.distance + ' to city center' : a.city}`,
                        type: 'airport'
                    });
                });
            }
        });

        return results;
    },

    searchHotels: async (params: {
        q: string;
        check_in_date: string;
        check_out_date: string;
        adults?: number;
        children?: number;
        currency?: string;
    }): Promise<SerpApiHotelResponse> => {
        const queryParams: any = {
            engine: 'google_hotels',
            api_key: API_KEY,
            hl: 'en',
            gl: 'us',
            ...params
        };

        const url = `${BASE_URL}?${queryString.stringify(queryParams)}`;
        const response = await fetch(url);
        if (!response.ok) throw new Error(`SerpApi Error: ${response.status}`);
        return await response.json();
    },

    getHotelAutocomplete: async (q: string): Promise<HotelAutocompleteResult[]> => {
        const queryParams = {
            engine: 'google_hotels_autocomplete',
            api_key: API_KEY,
            q
        };
        const url = `${BASE_URL}?${queryString.stringify(queryParams)}`;
        const response = await fetch(url);
        if (!response.ok) throw new Error(`Autocomplete Error: ${response.status}`);
        const data = await response.json();
        return (data.suggestions || []).map((s: any, index: number) => ({
            id: s.id || s.kgmid || `hotel-suggest-${index}`,
            title: s.autocomplete_suggestion || s.value || '',
            subtitle: s.location || '',
            type: s.type || ''
        }));
    },

    getHotelProperties: async (property_token: string): Promise<any> => {
        const queryParams = {
            engine: 'google_hotels',
            property_token,
            api_key: API_KEY
        };
        const url = `${BASE_URL}?${queryString.stringify(queryParams)}`;
        const response = await fetch(url);
        if (!response.ok) throw new Error(`Hotel Properties Error: ${response.status}`);
        return await response.json();
    },

    fetchFlightNews: async (): Promise<SerpApiNewsResponse> => {
        const queryParams = {
            engine: 'google_news',
            api_key: API_KEY,
            q: 'flights',
            gl: 'us',
            hl: 'en'
        };
        const url = `${BASE_URL}?${queryString.stringify(queryParams)}`;
        const response = await fetch(url);
        if (!response.ok) throw new Error(`News Error: ${response.status}`);
        return await response.json();
    }
};

export interface NewsArticle {
    position: number;
    title: string;
    link: string;
    date: string;
    iso_date?: string;
    source: {
        name: string;
        icon?: string;
        authors?: string[];
    };
    thumbnail?: string;
    thumbnail_small?: string;
    stories?: NewsArticle[];
}

export interface SerpApiNewsResponse {
    news_results?: NewsArticle[];
    error?: string;
}
