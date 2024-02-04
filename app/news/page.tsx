import Image from "next/image";
import Link from "next/link";
import React from "react";

// icons
import { IconPencilBox, IconPlus, IconTrashEmpty } from "@irsyadadl/paranoid";

// components
import Navbar from "./../../components/Navbar";

export default function News() {
  return (
    <>
      <Navbar active={2} />

      <main className="px-20 mt-10">
        <section className="shadow p-7 rounded">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold tracking-wider">NEWS</h2>

            <Link
              href={"/news/add"}
              className="flex items-center gap-2 bg-gray-800 px-5 py-2 rounded text-gray-100 text-xs hover:bg-gray-700"
            >
              <IconPlus className="w-3" />
              Add News
            </Link>
          </div>

          <table className="w-full mt-10">
            <thead className="bg-gray-800 text-gray-100">
              <tr>
                <td className="py-3 font-semibold pl-5">No</td>
                <td className="font-semibold px-5">Image</td>
                <td className="font-semibold px-5">Title</td>
                <td className="font-semibold px-5 w-[600px]">Content</td>
                <td className="font-semibold px-5">Writer</td>
                <td className="font-semibold px-5">Action</td>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="py-10 pl-5">1</td>
                <td className="px-5">
                  <Image
                    src={"/2.jpg"}
                    width={70}
                    height={70}
                    alt="Avatar"
                    className="object-cover rounded"
                  />
                </td>
                <td className="px-5">Seren Taun di Cigugur</td>
                <td className="px-5">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Beatae, ullam voluptates corporis eligendi debitis ....
                </td>
                <td className="px-5">Ilham Hafidz</td>
                <td className="px-5">
                  <div className="flex gap-2">
                    <button className="bg-indigo-500 flex gap-1 text-gray-100 px-3 py-1 rounded text-xs items-center">
                      <IconPencilBox className="w-4" />
                      Edit
                    </button>
                    <button className="bg-red-500 flex gap-1 text-gray-100 px-3 py-1 rounded text-xs items-center">
                      <IconTrashEmpty className="w-4" />
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
              <tr className="bg-gray-100">
                <td className="py-10 pl-5">2</td>
                <td className="px-5">
                  <Image
                    src={"/2.jpg"}
                    width={70}
                    height={70}
                    alt="Avatar"
                    className="object-cover rounded"
                  />
                </td>
                <td className="px-5">Seren Taun di Cigugur</td>
                <td className="px-5">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Beatae, ullam voluptates corporis eligendi debitis ....
                </td>
                <td className="px-5">Ilham Hafidz</td>
                <td className="px-5">
                  <div className="flex gap-2">
                    <Link href={"/news/edit"} className="bg-indigo-500 flex gap-1 text-gray-100 px-3 py-1 rounded text-xs items-center">
                      <IconPencilBox className="w-4" />
                      Edit
                    </Link>
                    <button className="bg-red-500 flex gap-1 text-gray-100 px-3 py-1 rounded text-xs items-center">
                      <IconTrashEmpty className="w-4" />
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </section>
      </main>
    </>
  );
}
