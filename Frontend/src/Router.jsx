import { createBrowserRouter } from "react-router-dom";
import Layout from "./components/layout/Layout";
import startRoutes from "./routes/start";
import aboutRoutes from "./routes/about";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [...startRoutes, ...aboutRoutes],
  },
]);

export default router;
