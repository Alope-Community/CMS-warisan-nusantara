import React from "react";
import Image from "next/image";
import Link from "next/link";

// icons
import { IconArchive, IconCalendar, IconDashboard } from "@irsyadadl/paranoid";

export default function Navbar({ active }) {
  return (
    <>
      <nav className="flex justify-between items-center px-20 py-3 shadow">
        <div className="flex items-center">
          <div className="mr-10">
            <h1 className="font-semibold text-xl">Warisan Nusantara</h1>
          </div>
          <div className="text-sm">
            <ul className="flex gap-5">
              <li className={active == 1 ? "font-semibold" : ""}>
                <Link href={"/"} className="flex items-center gap-1">
                  <IconDashboard className="w-5" />
                  Dashboard
                </Link>
              </li>
              <li className={active == 2 ? "font-semibold" : ""}>
                <Link href={"/news"} className="flex items-center gap-1">
                  <IconArchive className="w-5" />
                  News
                </Link>
              </li>
              <li className={active == 3 ? "font-semibold" : ""}>
                <Link href={"/event"} className="flex items-center gap-1">
                  <IconCalendar className="w-5" />
                  Event
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div>
          <Image
            src={"/2.jpg"}
            width={40}
            height={40}
            alt="Avatar"
            className="object-cover rounded-full"
          />
        </div>
      </nav>
    </>
  );
}
