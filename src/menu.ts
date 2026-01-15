export interface MenuItem {
    id: string;
    title: string;
    path: string;
    icon?: string;
    hidden?: boolean;
    children?: MenuItem[];
}

export const menuItems: MenuItem[] = [
    {
        id: "flights",
        title: "Flights",
        path: "/flights",
    },
    {
        id: "hotels",
        title: "Hotels",
        path: "/hotels",
    },
    {
        id: "cars",
        title: "Car Rental",
        path: "/cars",
    },
    // Example for hidden folders/routes
    {
        id: "admin",
        title: "Admin",
        path: "/_admin",
        hidden: true,
    },
];
