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
    startedDate: "",
    startedTime: "",
    endedDate: "",
    endedTime: "",
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

  const [imagePlaceholder, setImagePlaceholder] = useState("");
  const [imageFile, setImageFile] = useState("");

  return (
    <>
      <Navbar active={3} />

      <main className="px-20 mt-10">
        <section className="shadow p-7 bg-white rounded mb-10">
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

          <div className="grid grid-cols-4 gap-10 mt-10 ">
            <div className="grid-cols-1">
              <div className="mb-5 col-span-6">
                <label htmlFor="banner">Banner</label>
                <label htmlFor="banner">
                  <img
                    src={
                      imagePlaceholder
                        ? imagePlaceholder
                        : "/img-placeholder.png"
                    }
                    alt="bannerEvent"
                    className="rounded cursor-pointer w-[700px] h-[300px] object-cover mx-auto"
                  />
                </label>
                <input
                  type="file"
                  className="border px-3 py-2 rounded w-full mt-5 hidden"
                  id="banner"
                  onChange={(e: { target: any }) => {
                    setImageFile(e.target.files[0]);
                    if (e.target.files && e.target.files[0]) {
                      let reader = new FileReader();

                      reader.onload = (e: { target: any }) => {
                        setImagePlaceholder(e.target.result);
                      };

                      reader.readAsDataURL(e.target.files[0]);
                    }
                  }}
                />
                {imagePlaceholder ? (
                  <div className="flex gap-2 mt-5 justify-center">
                    <label
                      htmlFor="banner"
                      className="text-xs bg-gray-800 hover:bg-gray-700 px-5 py-2 rounded text-white"
                    >
                      Change Banner
                    </label>
                    <button
                      className="text-xs bg-red-500 hover:bg-red-400 px-5 py-2 rounded text-white"
                      onClick={() => {
                        setImagePlaceholder("");
                        setImageFile("");
                      }}
                    >
                      Delete Banner
                    </button>
                  </div>
                ) : (
                  ""
                )}
              </div>
            </div>
            <div className="grid gap-5 grid-cols-6 col-span-3">
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

              <div className="mb-5 col-span-2">
                <label htmlFor="for">Started Date</label>
                <input
                  type="date"
                  onChange={(e) => {
                    setData({
                      ...data,
                      startedDate: e.target.value,
                    });
                  }}
                  className="w-full px-3 py-3 rounded bg-white border"
                />
              </div>
              <div className="mb-5 col-span-1">
                <label htmlFor="for">Started Time</label>
                <input
                  type="time"
                  onChange={(e) => {
                    setData({
                      ...data,
                      startedTime: e.target.value,
                    });
                  }}
                  className="w-full px-3 py-3 rounded bg-white border"
                />
              </div>

              <div className="mb-5 col-span-2">
                <label htmlFor="for">Ended Date</label>
                <input
                  type="date"
                  onChange={(e) => {
                    setData({
                      ...data,
                      endedDate: e.target.value,
                    });
                  }}
                  className="w-full px-3 py-3 rounded bg-white border"
                />
              </div>
              <div className="mb-5 col-span-1">
                <label htmlFor="for">Ended Time</label>
                <input
                  type="time"
                  onChange={(e) => {
                    setData({
                      ...data,
                      endedTime: e.target.value,
                    });
                  }}
                  className="w-full px-3 py-3 rounded bg-white border"
                />
              </div>

              <div className="flex gap-3 mt-10 justify-end col-span-6">
                <button
                  className="flex items-center gap-2 border border-gray-800 px-5 py-2 rounded text-gray-800 hover:bg-gray-700 hover:text-gray-200"
                  onClick={() => {
                    checkSubmit();
                  }}
                >
                  Cancel
                </button>
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
          </div>
        </section>
      </main>
    </>
  );
}
