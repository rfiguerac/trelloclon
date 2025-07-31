import { Outlet, useLocation } from "react-router-dom";
import { Navbar } from "../components/Navbar";

export const MainLayout = () => {
  const location = useLocation();
  const shouldShowNavbar = location.pathname !== "/board";

  return (
    <div className="place-items-center bg-transparent">
      <main className="container mx-auto">
        {shouldShowNavbar && (
          <div className="pt-8">
            <Navbar />
          </div>
        )}
        <div className="container pt-2">
          <Outlet />
        </div>
      </main>
    </div>
  );
};
