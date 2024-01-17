import { Outlet } from "react-router-dom";
import Header from "./Header";
import Bottom from "./Bottom";

function Root() {
  return (
    <div>
      <Header />
      <Outlet />
      <Bottom />
    </div>
  );
}

export default Root;
