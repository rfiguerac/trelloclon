import { Outlet } from "react-router-dom";
import { Navbar } from "../components/Navbar";

export const MainLayout = () => {
  return (
    <div className="place-items-center bg-transparent">
      <main className="container mx-auto pt-8">
        <Navbar />

        <div className="container">
          <Outlet />
        </div>
      </main>
    </div>
  );
};
