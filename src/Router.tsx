import { createBrowserRouter } from "react-router-dom";
import Root from "./root";
import HomeB from "./HomeB";
import HomeA from "./HomeA";
import Login from "./Login";
import Check from "./Check";
import Search from "./Search";

const Router = createBrowserRouter([
  {
    path: "/MOVING",
    element: <Root />,
    children: [
      {
        path: "",
        element: <HomeB />,
      },
      { path: "login", element: <Login /> },
      {
        path: "home",
        element: <HomeA />,
        children: [
          { path: "today/:Id", element: <HomeA /> },
          {
            path: ":onair/:Id",
            element: <HomeA />,
          },
        ],
      },
      {
        path: "checklist",
        element: <Check />,
      },
      {
        path: "search",
        element: <Search />,
        children: [
          {
            path: "result/:Id",
            element: <Search />,
          },
        ],
      },
    ],
  },
]);

export default Router;
