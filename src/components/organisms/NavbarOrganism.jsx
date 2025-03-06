import React, { useState } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";
import Link from "next/link";
import ProtectedImageAtom from "../atoms/ProtectedImageAtom";

const NavbarOrganism = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const menuItems = [
    { label: "Beranda", path: "/", icon: "" },
    { label: "TanyaAI", path: "/", icon: "material-symbols:arrow-forward" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 w-full bg-background/5 backdrop-blur border-b border-black/10 z-50">
      <div className="w-full px-4 py-4 flex items-center justify-between">
        
        <div className="flex items-center text-lg font-inter font-bold italic underline text-black">
          <ProtectedImageAtom src="/company/MekarJS2.png" alt="logo" className="w-32" />
        </div>

        <div className="flex justify-between items-center">
          <Link className="text-black px-6 py-3 mr-5 text-xs border border-black/15 rounded-full" href="/dashboard" target="_blank">Dashboard</Link>
          <button
            className="relative w-10 h-10 flex items-center justify-center focus:outline-none"
            onClick={toggleMenu}
            aria-label="Toggle Menu"
          >
            <div className="relative w-6 h-5 flex flex-col justify-between">
              <span
                className={`block h-0.5 bg-black rounded transition-transform duration-300 ${
                  isMenuOpen ? "rotate-45 translate-y-2.5" : ""
                }`}
              ></span>
              <span
                className={`block h-0.5 bg-black rounded transition-all duration-300 ${
                  isMenuOpen ? "opacity-0" : "opacity-100"
                }`}
              ></span>
              <span
                className={`block h-0.5 bg-black rounded transition-transform duration-300 ${
                  isMenuOpen ? "-rotate-45 -translate-y-2.5" : ""
                }`}
              ></span>
            </div>
          </button>
        </div>

      </div>

      <div
        className={`fixed inset-0 h-screen bg-background flex flex-col items-center justify-center z-50 transform ${
          isMenuOpen
            ? "opacity-100 translate-y-0 scale-100"
            : "opacity-0 -translate-y-full scale-95"
        } transition-all duration-500 ease-in-out`}
        style={{ pointerEvents: isMenuOpen ? "auto" : "none" }}
      >
        <button
          className="absolute top-4 right-4 flex items-center justify-center w-10 h-10 focus:outline-none"
          onClick={toggleMenu}
          aria-label="Close Menu"
        >
          <div className="relative w-6 h-5">
            <span className="absolute top-0 left-0 block w-6 h-0.5 bg-black rounded transform rotate-45"></span>
            <span className="absolute top-0 left-0 block w-6 h-0.5 bg-black rounded transform -rotate-45"></span>
          </div>
        </button>

        <ul className="space-y-[-12px] text-center">
          <ProtectedImageAtom src="/favicon/F2.png" alt="logo" className="w-[128px] mb-10" />
          {menuItems.map((item, index) => (
            <li
              key={index}
              className="flex justify-start items-center text-black transition duration-500"
            >
              <Icon icon={item.icon} width="64" height="64" />
              <Link
                href={item.path}
                className="font-inter ml-2 text-6xl xl:text-[64px] m-3 font-thin transition-transform transform hover:scale-110"
                onClick={toggleMenu}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default NavbarOrganism;
