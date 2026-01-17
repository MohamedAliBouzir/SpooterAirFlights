import type { FC, ReactNode } from "react";
import Content from "./Content";
import Header from "./Header/Header";
import Footer from "./Footer/Footer";
import { Box, Toolbar } from "@mui/material";
import PageLayout from "./PageLayout";
import { LayoutStyle } from "../styles/layout/Wrapper.style";

import { useLocation } from "react-router-dom";

interface IWrapperProps {
    children?: ReactNode;
}

export const WrapperContainer: FC<IWrapperProps> = ({ children }) => {
    const location = useLocation();
    const isHome = location.pathname === "/";

    return (
        <Box className="root" sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <Header />
            <Toolbar />
            <Box
                component="main"
                sx={LayoutStyle.wrapperLayout}
            >
                <PageLayout>{children}</PageLayout>
            </Box>
            <Footer detail={isHome} />
        </Box>
    );
};

const Wrapper = () => {
    return (
        <WrapperContainer>
            <Content />
        </WrapperContainer>
    );
};

export default Wrapper;
