import { lazy } from "react";
import type { RouteProps } from "react-router-dom";
import { menuItems } from "@/menu";

const Home = lazy(() => import("@/pages/Home"));
const Flights = lazy(() => import("@/pages/Flights"));
const Hotels = lazy(() => import("@/pages/Hotels"));
const ComingSoon = lazy(() => import("@/pages/ComingSoon"));
const FlightDetails = lazy(() => import("@/pages/Flights/FlightDetails"));

const contents: RouteProps[] = [
    {
        path: menuItems.find(m => m.id === 'home')?.path || "/",
        element: <Home />,
    },
    {
        path: menuItems.find(m => m.id === 'flights')?.path || "/flights",
        element: <Flights />,
    },
    {
        path: menuItems.find(m => m.id === 'flightDetails')?.path || "/flights/:id",
        element: <FlightDetails />,
    },
    {
        path: menuItems.find(m => m.id === 'hotels')?.path || "/hotels",
        element: <Hotels />,
    },
    {
        path: menuItems.find(m => m.id === 'cars')?.path || "/cars",
        element: <ComingSoon title="Cars" />,
    },
];

export default contents;
