import { createBrowserRouter } from "react-router-dom";
import Login from "./auth/Login";
import Signup from "./auth/Signup";
import Home from "./Home";
import PropertyCatalog from "./property-catalog/PropertyCatalog";

const Routes = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/login",
    element: <Login />,
  },

  {
    path: "/signup",
    element: <Signup />,
  },

  {
    path: "/property",
    element: <PropertyCatalog />,
  },
]);

export default Routes;
