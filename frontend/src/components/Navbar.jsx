import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import { FaTimes } from "react-icons/fa";

const NavBar = () => {
  const headings = [
    { id: 1, name: "MENU", to: "/" },
    { id: 2, name: "CREATE MENU", to: "/createMenu" },
  ];
  const [visible, setVisible] = useState(false);

  return (
    <div className="flex items-center justify-between py-5 font-medium">
      <h1 className="font-serif text-3xl sm:py-3 lg:text-5xl leading-relaxed">
        MENU APP
      </h1>

      <ul className="hidden sm:flex gap-5 text-sm text-gray-700">
        {headings.map((item) =><NavLink key={item.id} to={item.to} className="flex flex-col items-center gap-1">
          <p>{item.name}</p>
          <hr className="w-2/4 broder-none h-[1.5px] bg-gray-700 hidden" />
        </NavLink>)}
      </ul>

      <div
        onClick={() => setVisible(!visible)}
        className=" md:hidden cursor-pointer pr-4 z-10 text-gray-500"
      >
        {visible ? <FaTimes size={30} /> : <FaBars size={30} />}
      </div>

      {visible && (
        <ul className="flex flex-col justify-center items-center absolute top-0 left-0 w-full h-screen bg-gradient-to-b from-white to-white text-gray-500">
          {headings.map((item) =><li key={item.id} className="px-4 py-6 cursor-pointer">
            <Link onClick={() => setVisible(!visible)} to={item.to}>
              {item.name}
            </Link>
          </li>)}
        </ul>
      )}
    </div>
  );
};

export default NavBar;
