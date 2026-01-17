export interface MenuItem {
    id: string;
    label: string;
    path: string;
    showInNavbar?: boolean;
}

export const menuItems: MenuItem[] = [
    {
        id: "home",
        label: "Home",
        path: "/",
        showInNavbar: false,
    },
    {
        id: "flights",
        label: "Flights",
        path: "/flights",
        showInNavbar: true,
    },
    {
        id: "hotels",
        label: "Hotels",
        path: "/hotels",
        showInNavbar: true,
    },
    {
        id: "cars",
        label: "Cars",
        path: "/cars",
        showInNavbar: true,
    },
    {
        id: "flightDetails",
        label: "Flight Details",
        path: "/flights/:id",
        showInNavbar: false,
    },
];

export const navbarMenu = menuItems.filter((item) => item.showInNavbar);
