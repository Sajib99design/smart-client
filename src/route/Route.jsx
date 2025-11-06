import { createBrowserRouter } from "react-router";
import RootLayout from "../Layout/RootLayout";
import AllProducts from "../component/AllProducts";
import Home from "../component/Home";
import Register from "../component/Register";
import Myproducts from "../component/Myproducts";
import Mybids from "../component/Mybids";
import PrivateRoute from "../provider/PrivateRoute";
import ProductDetails from "../component/ProductDetails";
import CreateProcuts from "../component/CreateProcuts";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: '/allproducts',
        Component: AllProducts
      },
      {
        path: '/register',
        Component: Register
      },
      {
        path: '/myproducts',
        element: <PrivateRoute>
          <Myproducts></Myproducts>
        </PrivateRoute>
      },
      {
        path: '/mybids',
        element: <PrivateRoute> <Mybids> </Mybids> </PrivateRoute>
      },
      {
        path: '/productsDetails/:id',
        loader: ({ params }) => fetch(`https://smart-deal-eta.vercel.app/products/${params.id}`),
        Component: ProductDetails
      },
      {
        path: '/createProducts',
        element: <PrivateRoute>
          <CreateProcuts></CreateProcuts>
        </PrivateRoute>
      },
    ]
  }
]);