"use client";
import React, { useContext } from "react";
import { SquareActivity } from "lucide-react";
import { useRouter, usePathname } from "next/navigation";
import { AuthContext } from "@/provider/AuthProvider";

export const NavBar: React.FC = () => {
  const description = [
    "Home",
    "Measurements",
    "Architecture",
    "Brand",
    "Contact",
  ];
  const context=useContext(AuthContext)
  const isLoggedIn = context?.isLoggedIn;
  const currentPath = usePathname();
  console.log(currentPath);
  const navigate = useRouter();
  const handleClick=async()=>{
    context?.AuthLogout()
    navigate.push("/")
  }
  return (
    <header className="sticky top-0 z-50 border-b border-border-brass bg-background-dark/95 backdrop-blur-sm">
      <div className="flex items-center justify-between h-16 px-6 mx-auto max-w-7xl">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-8 h-8 border border-primary bg-primary-dim text-primary">
            <SquareActivity size={18} strokeWidth={1.5} />
          </div>
          <button
            onClick={() => {
              window.scrollBy(0, 0), navigate.push("/");
            }}
            className="font-sans text-xl font-bold tracking-tight text-white uppercase"
          >
            Raidexi
            <span className="ml-1 font-mono text-xs font-normal align-top text-primary">
              SYS.V.1
            </span>
          </button>
        </div>

        <nav className="hidden gap-8 md:flex">
          {description.map((item) => (
            <a
              key={item}
              href={`${item === "Home" ? "/" : `/${item}`}`}
              className={`relative px-1 py-2 font-mono text-sm font-medium text-white hover:text-primary after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-primary after:transition-all hover:after:w-full ${
                currentPath === "/" || currentPath === `/${item}`
                  ? "underline-offset-2 text-amber-300"
                  : ""
              }`}
            >
              {item}
            </a>
          ))}
        </nav>

        {isLoggedIn ? (
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 text-sm font-semibold text-gray-200">
              <div className="flex items-center justify-center w-6 h-6 text-xs font-bold rounded-full bg-primary text-background-dark">
                U
              </div>
              Hello,{context?.userData?.fullName || "User"}
            </div>
            <div className="w-px h-5 bg-gray-400/50" />
            <a
              href="/Dashboard"
              className="px-3 py-1.5 text-xs font-mono font-bold uppercase text-primary hover:text-white transition-all duration-300 hover:underline underline-offset-4 hidden md:block"
            >
              Profile
            </a>
            <button
            onClick={handleClick}
              className="px-4 py-2 font-mono text-xs font-bold text-white uppercase transition-all duration-300 border border-primary/50 hover:bg-primary/20 hover:border-primary focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none"
            >
              Log Out
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-3">
            <a
              href="/Login"
              className="px-4 py-2 font-mono text-xs font-bold uppercase transition-all duration-300 border bg-primary text-background-dark hover:bg-white hover:shadow-md hover:shadow-primary/25 border-primary focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none active:scale-95"
            >
              Login
            </a>
            <div className="w-px h-6 bg-gray-400/50" />
            <a
              href="/SignUp"
              className="px-6 py-2 font-mono text-xs font-bold uppercase text-white border-2 border-primary hover:bg-primary-dim hover:shadow-lg hover:shadow-primary/50 hover:-translate-y-0.5 transition-all duration-300 focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none bg-linear-to-r from-primary to-primary/80 hover:from-primary/90"
            >
              Sign Up
            </a>
          </div>
        )}
      </div>
    </header>
  );
};
