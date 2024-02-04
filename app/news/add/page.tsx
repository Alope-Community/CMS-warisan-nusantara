import React from "react";
import Link from "next/link";

// components
import Navbar from "@/components/Navbar";

// icons
import { IconBatteryLoading } from "@irsyadadl/paranoid";

export default function NewsAdd() {
  return (
    <>
      <Navbar active={2} />

      <main className="px-20 mt-10">
        <section className="bg-white rounded shadow p-10">
          <div className="flex justify-between items-center mb-10">
            <div className="">
              <h1 className="text-xl font-bold">ADD NEWS</h1>
            </div>
            <div>
              <Link
                href={"/news"}
                className="bg-gray-900 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-none flex gap-2"
              >
                <IconBatteryLoading />
                back
              </Link>
            </div>
          </div>
          <div className="mb-5">
            <label htmlFor="title">Title</label>
            <input
              className="w-full py-3 px-5 rounded border"
              type="text"
              id="title"
            />
          </div>
          <div className="mb-5">
            <label htmlFor="content">Content</label>
            <textarea
              className="w-full max-h-44 min-h-44 py-3 px-5 rounded border"
              name=""
              id="content"
            ></textarea>
          </div>
          <div className="mb-5">
            <label htmlFor="writer">Writer</label>
            <input
              className="w-full py-3 px-5 rounded border"
              type="text"
              id="writer"
            />
          </div>
          <div className="flex justify-end gap-2 mx-10 mt-5">
            <button className="bg-gray-900 hover:bg-gray-800 text-white py-2 px-4 rounded">
              Submit
            </button>
            <button className="bg-gray-900 hover:bg-gray-800 text-white py-2 px-4 rounded">
              Submit
            </button>
          </div>
        </section>
      </main>
    </>
  );
}
