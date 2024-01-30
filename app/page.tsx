import { IconArchive, IconDashboard } from "@irsyadadl/paranoid";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function Dashboard() {
  return (
    <>
      <nav className="flex justify-between items-center px-20 py-3 shadow">
        <div className="flex items-center">
          <div className="mr-10">
            <h1 className="font-semibold text-xl">Warisan Nusantara</h1>
          </div>
          <div className="text-sm">
            <ul className="flex gap-5">
              <li className="font-semibold">
                <Link href={"/"} className="flex items-center gap-1">
                  <IconDashboard className="w-5" />
                  Dashboard
                </Link>
              </li>
              <li>
                <Link href={"/news"} className="flex items-center gap-1">
                  <IconArchive className="w-5" />
                  News
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
