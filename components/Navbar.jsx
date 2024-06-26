import React from "react";
import Image from "next/image";
import Link from "next/link";

// icons
import {
  IconArchive,
  IconCalendar,
  IconDashboard,
  IconLogout,
} from "@irsyadadl/paranoid";

export default function Navbar({ active }) {
  return (
    <>
      <nav className="flex justify-between items-center px-20 py-3 shadow bg-white">
        <div className="flex items-center">
          <div className="mr-10">
            <h1 className="font-semibold text-xl">Warisan Nusantara</h1>
          </div>
          <div className="text-sm">
            <ul className="flex gap-8">
              <li className={active == 1 ? "font-bold text-red-500" : ""}>
                <Link href={"/dashboard"} className="flex items-center gap-1">
                  <IconDashboard className="w-5" />
                  Dashboard
                </Link>
              </li>
              <li className={active == 2 ? "font-bold text-red-500" : ""}>
                <Link href={"/news"} className="flex items-center gap-1">
                  <IconArchive className="w-5" />
                  News
                </Link>
              </li>
              <li className={active == 3 ? "font-bold text-red-500" : ""}>
                <Link href={"/event"} className="flex items-center gap-1">
                  <IconCalendar className="w-5" />
                  Event
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div>
          <details className="dropdown dropdown-end">
            <summary className="m-1 btn">
              <Image
                src={"/2.jpg"}
                width={40}
                height={40}
                alt="Avatar"
                className="object-cover rounded-full"
              />
            </summary>
            <ul className="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-52">
              <li className="text-red-500">
                <Link href={"/"} className="flex items-center gap-1">
                  <IconLogout className="w-5" />
                  Logout
                </Link>
              </li>
            </ul>
          </details>
        </div>
      </nav>
    </>
  );
}
