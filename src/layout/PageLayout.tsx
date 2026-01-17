import type { FC, ReactNode } from "react";
import Box from "@mui/material/Box";
import { LayoutStyle } from "../styles/layout/Wrapper.style";

interface ILayoutProps {
    children: ReactNode;
}

const PageLayout: FC<ILayoutProps> = ({ children }) => {
    return <Box sx={LayoutStyle.pageLayout}>{children}</Box>;
};

export default PageLayout;
