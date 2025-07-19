import { Link } from "react-router-dom";
import { ThemeToggle } from "./ThemeToggle";

export const Navbar = () => {
  return (
    <>
      <div
        className="navbar bg-base-100 bg-opacity-90 shadow-sm mb-12  py-5 rounded-box">
        <div className="flex-1">
          <Link to="/" className="ml-6 text-2xl md:text-5xl font-bold">
            My Trello Clon
          </Link>
        </div>
        <div className="flex-none">
          <div className="dropdown dropdown-end mr-6" >
                <ThemeToggle />
          </div>
         
        </div>
      </div>
    </>
  );
};
