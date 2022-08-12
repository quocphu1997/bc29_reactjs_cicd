import UpdateMovie from "modules/update-movie/update-movie";
import React, { lazy } from "react";
import { useRoutes } from "react-router-dom";

const AdminGuard = lazy(() => import("../guards/admin.guard"));
const AuthGuard = lazy(() => import("../guards/auth.guard"));
const NoAuthGuard = lazy(() => import("../guards/no-auth.guard"));
const AdminLayout = lazy(() => import("../layouts/admin"));
const HomeLayout = lazy(() => import("../layouts/home"));
const Booking = lazy(() => import("pages/booking/booking"));
const Home = lazy(() => import("pages/home/home"));
const Login = lazy(() => import("pages/login/login"));
const MovieDetail = lazy(() => import("pages/movie-detail/movie-detail"));
const MovieManagerment = lazy(() =>
  import("pages/movie-managerment/movie-managerment")
);
const CreateMovie = lazy(() => import("pages/create-movie/create-movie"));

export default function Router() {
  const routing = useRoutes([
    {
      path: "/",
      element: <HomeLayout />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/movie/:movieId",
          element: <MovieDetail />,
        },
        {
          path: "/",
          element: <AuthGuard />,
          children: [
            {
              path: "/booking/:maLichChieu",
              element: <Booking />,
            },
          ],
        },
        {
          path: "/",
          element: <NoAuthGuard />,
          children: [
            {
              path: "/login",
              element: <Login />,
            },
          ],
        },
      ],
    },
    {
      path: "/admin",
      element: <AdminLayout />,
      children: [
        {
          path: "/admin/",
          element: <AdminGuard />,
          children: [
            {
              path: "/admin/movie-managerment",
              element: <MovieManagerment />,
            },
            {
              path: "/admin/movie-managerment/create-movie",
              element: <CreateMovie />,
            },
            {
              path: "/admin/movie-managerment/:movieId/update",
              element: <UpdateMovie />,
            },
          ],
        },
      ],
    },
  ]);

  return routing;
}
