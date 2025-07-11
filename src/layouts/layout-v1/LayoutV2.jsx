import { useMediaQuery, useTheme } from "@mui/material";
import { styled } from "@mui/material/styles";
import InsuranceHeader from "layouts/layout-parts/InsuranceHeader";
import { Fragment, useState } from "react";
import { Outlet, useLocation } from "react-router"; // Import useLocation hook
import DashboardSidebar from "./DashboardSidebar";

const ContentWrapper = styled("div")(({ theme }) => ({
  minHeight: `calc(100vh - ${theme.mixins.toolbar.minHeight}px - 1px)`,
  display: "flex",
  flexDirection: "column",
}));

const OutletWrapper = styled("div")({
  display: "flex",
  justifyContent: "center",
  flex: 1,
});

const LayoutV2 = ({ children }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const location = useLocation();

  const [showSideBar, setShowSideBar] = useState(false);
  const [showMobileSideBar, setShowMobileSideBar] = useState(false);

  return (
    <Fragment>
      <DashboardSidebar
        showSideBar={showSideBar}
        setShowSideBar={() => setShowSideBar((state) => !state)}
        showMobileSideBar={showMobileSideBar}
        closeMobileSideBar={() => setShowMobileSideBar(false)}
      />

      <InsuranceHeader
        setShowSideBar={() => setShowSideBar((state) => !state)}
        setShowMobileSideBar={() => setShowMobileSideBar((state) => !state)}
      />

      <ContentWrapper>
        <OutletWrapper>{children || <Outlet />}</OutletWrapper>
        {/* <Footer showSideBar={showSideBar} /> */}
      </ContentWrapper>
    </Fragment>
  );
};

export default LayoutV2;
