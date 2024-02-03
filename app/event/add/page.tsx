"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

// icons
import { IconChevronLeft } from "@irsyadadl/paranoid";

// components
import Navbar from "@/components/Navbar";

//api
import { insertEvent } from "@/api/Event";

export default function AddEvent() {
  const router = useRouter();

  const [data, setData] = useState({
    title: "",
    description: "",
    banner: "",
    started: "",
    ended: "",
    fee: "",
    location: "",
    for: "",
  });

  const insertDataEvent = async () => {
    let result = await insertEvent(data);
    if (result) {
      router.push("/event");
    }
  };

  const checkSubmit = () => {
    insertDataEvent();
  };

  return (
    <>
      <Navbar active={3} />

      <main className="px-20 mt-10">
        <section className="shadow p-7 bg-white rounded">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold tracking-wider">ADD EVENT</h2>

            <Link
              href={"/event"}
              className="flex items-center gap-2 bg-gray-800 px-2 py-2 rounded text-gray-100 text-xs hover:bg-gray-700"
            >
              <IconChevronLeft className="w-5" />
              Back
            </Link>
          </div>

          <div className="grid grid-cols-6 mt-10 gap-5">
            <div className="mb-5 col-span-6">
              <label htmlFor="title">Title</label>
              <input
                type="text"
                className="border px-3 py-2 rounded w-full"
                id="title"
                onBlur={(e) => {
                  setData({
                    ...data,
                    title: e.target.value,
                  });
                }}
              />
            </div>
            <div className="mb-5 col-span-6">
              <label htmlFor="description">Description</label>
              <textarea
                className="border px-3 py-2 rounded w-full h-[150px]"
                id="description"
                onBlur={(e) => {
                  setData({
                    ...data,
                    description: e.target.value,
                  });
                }}
              ></textarea>
            </div>
            <div className="mb-5  col-span-2">
              <label htmlFor="fee">Fee</label>
              <input
                type="text"
                className="border px-3 py-2 rounded w-full"
                id="fee"
                onBlur={(e) => {
                  setData({
                    ...data,
                    fee: e.target.value,
                  });
                }}
              />
            </div>
            <div className="mb-5 col-span-2">
              <label htmlFor="location">Location</label>
              <input
                type="text"
                className="border px-3 py-2 rounded w-full"
                id="location"
                onBlur={(e) => {
                  setData({
                    ...data,
                    location: e.target.value,
                  });
                }}
              />
            </div>
            <div className="mb-5 col-span-2">
              <label htmlFor="for">For</label>
              <select
                id="for"
                className="w-full px-3 py-3 rounded bg-white border"
                onBlur={(e) => {
                  setData({
                    ...data,
                    for: e.target.value,
                  });
                }}
              >
                <option value="all ages">All Ages</option>
                <option value="mature">Mature</option>
              </select>
            </div>

            <div className="flex justify-end col-span-6">
              <button
                className="flex items-center gap-2 bg-gray-800 px-5 py-2 rounded text-gray-100 hover:bg-gray-700"
                onClick={() => {
                  checkSubmit();
                }}
              >
                Submit
              </button>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
