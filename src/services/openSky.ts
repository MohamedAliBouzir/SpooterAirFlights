import wretch from 'wretch';
import queryString from 'query-string';

// OpenSky Network API Base URL
const BASE_URL = 'https://opensky-network.org/api';

// Create a wretch instance
const api = wretch(BASE_URL);

export interface OpenSkyFlight {
    icao24: string;
    firstSeen: number; // Unix timestamp
    estDepartureAirport: string;
    lastSeen: number; // Unix timestamp
    estArrivalAirport: string;
    callsign: string;
    estDepartureAirportHorizDistance: number;
    estDepartureAirportVertDistance: number;
    estArrivalAirportHorizDistance: number;
    estArrivalAirportVertDistance: number;
    departureAirportCandidatesCount: number;
    arrivalAirportCandidatesCount: number;
}

export const openSkyService = {
    /**
     * Get flights departing from a specific airport within a time interval.
     * @param airport ICAO code (e.g., 'EDDF')
     * @param begin Unix timestamp (start time)
     * @param end Unix timestamp (end time)
     */
    getDepartures: async (airport: string, begin: number, end: number): Promise<OpenSkyFlight[]> => {
        try {
            const query = queryString.stringify({ airport, begin, end });
            return await api
                .url(`/flights/departure?${query}`)
                .get()
                .json<OpenSkyFlight[]>();
        } catch (error) {
            console.error('Failed to fetch departures:', error);
            return [];
        }
    },

    /**
     * Get flights arriving at a specific airport within a time interval.
     * @param airport ICAO code
     * @param begin Unix timestamp
     * @param end Unix timestamp
     */
    getArrivals: async (airport: string, begin: number, end: number): Promise<OpenSkyFlight[]> => {
        try {
            const query = queryString.stringify({ airport, begin, end });
            return await api
                .url(`/flights/arrival?${query}`)
                .get()
                .json<OpenSkyFlight[]>();
        } catch (error) {
            console.error('Failed to fetch arrivals:', error);
            return [];
        }
    }
};
