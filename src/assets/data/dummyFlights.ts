import type { Flight } from '@/hooks/useFlightStore';

export const dummyFlights: Flight[] = [
    {
        id: 'f1',
        airline: 'Air France',
        flightNumber: 'AF123',
        departure: { code: 'CDG', at: '2023-10-25T10:00:00' },
        arrival: { code: 'JFK', at: '2023-10-25T14:00:00' },
        price: 450,
        duration: '8h 00m',
        stops: 0,
    },
    {
        id: 'f2',
        airline: 'British Airways',
        flightNumber: 'BA456',
        departure: { code: 'LHR', at: '2023-10-25T11:00:00' },
        arrival: { code: 'JFK', at: '2023-10-25T15:30:00' },
        price: 420,
        duration: '8h 30m',
        stops: 1,
    },
    {
        id: 'f3',
        airline: 'Lufthansa',
        flightNumber: 'LH789',
        departure: { code: 'FRA', at: '2023-10-25T09:30:00' },
        arrival: { code: 'JFK', at: '2023-10-25T13:45:00' },
        price: 480,
        duration: '8h 15m',
        stops: 0,
    },
    {
        id: 'f4',
        airline: 'Delta',
        flightNumber: 'DL111',
        departure: { code: 'AMS', at: '2023-10-25T12:00:00' },
        arrival: { code: 'JFK', at: '2023-10-25T16:00:00' },
        price: 390,
        duration: '10h 00m',
        stops: 1,
    },
    {
        id: 'f5',
        airline: 'Emirates',
        flightNumber: 'EK202',
        departure: { code: 'DXB', at: '2023-10-25T08:00:00' },
        arrival: { code: 'JFK', at: '2023-10-25T20:00:00' },
        price: 850,
        duration: '14h 00m',
        stops: 0,
    },
];

export const dummyPriceTrends = [
    { date: '2023-10-20', price: 500, count: 5 },
    { date: '2023-10-21', price: 480, count: 8 },
    { date: '2023-10-22', price: 460, count: 12 },
    { date: '2023-10-23', price: 440, count: 10 },
    { date: '2023-10-24', price: 420, count: 15 }, // Dip
    { date: '2023-10-25', price: 450, count: 20 }, // Selected
    { date: '2023-10-26', price: 490, count: 7 },
    { date: '2023-10-27', price: 520, count: 4 },
];
