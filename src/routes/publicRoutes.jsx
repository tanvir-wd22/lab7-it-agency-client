import { createBrowserRouter } from "react-router";
import Root from "../layouts/Root";
import Home from "../pages/Home";
import AboutUs from "../pages/AboutUs";
import Services from "../pages/Services";
import Contact from "../pages/Contact";
import Testimonials from "../pages/Testimonials";
import PrivacyPolicy from "../pages/PrivacyPolicy";
import TermsAndConditions from "../pages/TermsAndConditions";

const publicRoutes = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "/services",
        Component: Services,
      },
      {
        path: "/aboutUs",
        Component: AboutUs,
      },
      {
        path: "/contact",
        Component: Contact,
      },
      {
        path: "/testimonials",
        Component: Testimonials,
      },
      {
        path: "/privacyPolicy",
        Component: PrivacyPolicy,
      },
      {
        path: "/termsAndConditions",
        Component: TermsAndConditions,
      },
    ],
  },
]);

export default publicRoutes;
