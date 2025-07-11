import LoadingScreen from "components/LoadingScreen";
import LayoutV2 from "layouts/layout-v1/LayoutV2";
import { lazy, Suspense } from "react";
import { Navigate } from "react-router-dom";

const Loadable = (Component) => (props) => {
  return (
    <Suspense fallback={<LoadingScreen />}>
      <Component {...props} />
    </Suspense>
  );
};

const Login = Loadable(lazy(() => import("./pages/login")));
const Error = Loadable(lazy(() => import("./pages/404")));
const InsuranceDashboard = Loadable(lazy(() => import("./pages/insurance-dashboard")));
const InsuranceTable = Loadable(lazy(() => import("./pages/insurance-table")));
const InsuranceQna = Loadable(lazy(() => import("./pages/insurance-qna")));
const InsuranceTaxInfo = Loadable(lazy(() => import("./pages/insurance-tax-info")));

const routes = () => {
  return [
    {
      path: "/",
      element: <Navigate to="/naver/insurance/dashboard" replace />,
    },
    {
      path: "/",
      element: <LayoutV2 />,
      children: [
        {
          path: "about",
          element: <InsuranceDashboard />,
        },
        {
          path: "login",
          element: <Login />,
        },
        {
          path: "naver/insurance/dashboard",
          element: <InsuranceDashboard />,
        },
        {
          path: "naver/insurance/table",
          element: <InsuranceTable />,
        },
        {
          path: "naver/insurance/qna",
          element: <InsuranceQna />,
        },
        {
          path: "naver/insurance/tax-info",
          element: <InsuranceTaxInfo />,
        },
      ],
    },
    {
      path: "*",
      element: <Error />,
    },
  ];
};

export default routes;
