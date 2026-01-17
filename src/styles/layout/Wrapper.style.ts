import type { SxProps, Theme } from "@mui/material";

export const LayoutStyle = {
    wrapperLayout: {
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        width: "100%",
        flexGrow: 1,
    } as SxProps<Theme>,
    pageLayout: {
        flexGrow: 1,
        width: "100%",
        display: "flex",
        flexDirection: "column",
    } as SxProps<Theme>,
};

export const mainLayoutStyles = LayoutStyle; // backward compatibility if needed
