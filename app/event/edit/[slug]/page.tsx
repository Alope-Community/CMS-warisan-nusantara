"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

// icons
import { IconChevronLeft } from "@irsyadadl/paranoid";

// components
import Navbar from "@/components/Navbar";

//api
import { getEventById, updateEvent } from "@/api/Event";

interface ResData {
  title: string;
  description: string;
  started: string;
  ended: string;
  fee: number;
  location: string;
  for: string;
}

export default function EditEvent({ params }: { params: { slug: string } }) {
  const router = useRouter();

  const [data, setData] = useState({
    title: "",
    description: "",
    banner: "",
    started: "",
    ended: "",
    fee: 0,
    location: "",
    for: "",
  });

  const getDataEventById = async () => {
    let result = await getEventById(parseInt(params.slug));
    if (result) {
      const res: ResData = result.data.data;

      setData({
        title: res.title,
        description: res.description,
        banner: "",
        started: res.started,
        ended: res.ended,
        fee: res.fee,
        location: res.location,
        for: res.for,
      });

      console.log(result);
    }
  };

  const updateDataEvent = async () => {
    let result = await updateEvent(data, parseInt(params.slug));
    if (result) {
      router.push("/event");
    }
  };

  const checkSubmit = () => {
    updateDataEvent();
  };

  useEffect(() => {
    getDataEventById();
  }, []);

  return (
    <>
      <Navbar active={3} />

      <main className="px-20 mt-10">
        <section className="shadow p-7 bg-white rounded">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold tracking-wider">Edit EVENT</h2>

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
                value={data.title}
                onChange={(e) => {
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
                value={data.description}
                onChange={(e) => {
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
                value={data.fee}
                onChange={(e) => {
                  setData({
                    ...data,
                    fee: parseInt(e.target.value),
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
                value={data.location}
                onChange={(e) => {
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
                onChange={(e) => {
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
