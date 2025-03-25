"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import TopMenuItem from "./TopMenuItem";
import { useState } from "react";

export default function TopMenu() {
    const { data: session, status } = useSession();
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

    return (
        <div className="fixed top-0 left-0 right-0 z-30 flex justify-between h-16 p-4 px-10 items-center bg-white shadow-md space-x-8">
            <Link href={"/"}>
                <div className="text-xl font-bold text-pink-500 whitespace-nowrap truncate px-4 py-2 transition duration-300 ease-in-out">
                    MMM Co-Working Spaces Reservation
                </div>
            </Link>
            <div className="flex items-center space-x-8">
                <TopMenuItem title={"Home"} pageRef={"/"} />
                <TopMenuItem title={"Coworkingspaces"} pageRef={"/coworkingspace"} />
                <TopMenuItem title={"Register"} pageRef={"/register"} />
                {status === "loading" ? null : session && (
                    <>
                        <TopMenuItem title={"Reserve"} pageRef={"/reservation"} />
                        <TopMenuItem
                            title={"All Reservations"}
                            pageRef={"/myreservation"}
                        />
                    </>
                )}
                
                {status === "loading" ? (
                        <Link href={"/api/auth/signin?callbackUrl=/"}
                            
                            className="px-4 py-2 text-pink-600 border border-pink-600 rounded hover:bg-pink-600 hover:text-white transition duration-200"
                        >
                            Login
                        </Link>
                    ) : (
                    session ? (
                        <div className="relative">
                            <button
                                onClick={toggleDropdown}
                                className="flex items-center px-4 py-2 text-pink-800 bg-pink-200 rounded hover:bg-pink-300 transition duration-200"
                            >
                                Welcome
                                {/* Dropdown arrow */}
                                <svg
                                    className={`w-4 h-4 ml-2 transition-transform ${
                                        dropdownOpen ? "rotate-180" : "rotate-0"
                                    }`}
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M19 9l-7 7-7-7"
                                    />
                                </svg>
                            </button>
                            {dropdownOpen && (
                                <div className="absolute right-0 mt-2 w-48 bg-white border border-pink-200 rounded shadow-lg">
                                    <Link  href={"/api/auth/signout"}
                                        
                                        className="block w-full text-left px-4 py-2 text-pink-800 hover:bg-pink-100 transition"
                                    >
                                        Logout
                                    </Link>
                                </div>
                            )}
                        </div>
                    ) : (
                        <Link href={"/api/auth/signin?callbackUrl=/"}
                            
                            className="px-4 py-2 text-pink-600 border border-pink-600 rounded hover:bg-pink-700 hover:text-white transition duration-200"
                        >
                            Login
                        </Link>
                    )
                )}
            </div>
        </div>
    );
}
