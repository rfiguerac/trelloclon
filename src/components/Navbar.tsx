import { Link } from "react-router-dom";
import { ThemeToggle } from "./ThemeToggle";

export const Navbar = () => {
  return (
    <>
      <div
        className="navbar bg-base-100 bg-opacity-90 shadow-sm mb-12  py-5 rounded-box">
        <div className="flex-1">
          <Link to="/" className="ml-6 text-blue-700 text-2xl md:text-5xl font-bold">
            My Trello Clon
          </Link>
        </div>
        <div className="flex-none">
          <div className="dropdown dropdown-end mr-6" >
                <ThemeToggle />
          </div>
          <div className="dropdown dropdown-end mr-6">
            <div
              tabIndex={0}
              role="button"
              className="avatar">
              <div className="w-16 rounded-full">
                <img
                  alt="Tailwind CSS Navbar component"
                  src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
              <li>
                <Link to="/" className="text-xl justify-between">Profile</Link>
              </li>
              <li>
                <Link to="/settings" className="text-xl justify-between">Settings</Link>
              </li>
              <li>
                <Link to="/login" className="text-xl justify-between">Login</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};
