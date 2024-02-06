"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import moment from "moment";

// icons
import { IconChevronLeft } from "@irsyadadl/paranoid";

// components
import Navbar from "@/components/Navbar";

//api
import { getEventById, updateEvent } from "@/api/Event";
import uploadFile from "@/api/_UploadFile";

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

  const dateFormat = moment();

  const [data, setData] = useState({
    title: "",
    description: "",
    banner: "",
    startedDate: "",
    startedTime: "",
    endedDate: "",
    endedTime: "",
    fee: 0,
    location: "",
    for: "",
  });

  const getDataEventById = async () => {
    let result = await getEventById(parseInt(params.slug));
    if (result) {
      const res: ResData = result.data.data;

      const started = res.started;
      const ended = res.ended;

      setData({
        title: res.title,
        description: res.description,
        banner: "",
        startedDate: String(moment(started).format("YYYY-MM-DD")),
        startedTime: String(moment(started).format("hh:mm:ss")),
        endedDate: String(moment(ended).format("YYYY-MM-DD")),
        endedTime: String(moment(ended).format("hh:mm:ss")),
        fee: res.fee,
        location: res.location,
        for: res.for,
      });
    }
  };

  const [imagePlaceholder, setImagePlaceholder] = useState("");
  const [imageFile, setImageFile] = useState("");

  const handleChange = (e: any) => {
    setImageFile(e.target.files[0]);

    if (e.target.files && e.target.files[0]) {
      let reader = new FileReader();

      reader.onload = (e: { target: any }) => {
        setImagePlaceholder(e.target.result);
      };

      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const updateDataEvent = async (fileName: String) => {
    let result = await updateEvent(data, parseInt(params.slug), fileName);
    if (result) {
      router.push("/event");
    }
  };

  const uploadDataFile = async (formData: any) => {
    let result = await uploadFile(formData);
    if (result) {
      if (result.data.status_code == "WN-01") {
        setData({
          ...data,
          banner: result.data.fileName,
        });

        updateDataEvent(result.data.fileName);
      }
    }
  };

  const checkSubmit = (e: any) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("image", imageFile);

    uploadDataFile(formData);
  };

  useEffect(() => {
    getDataEventById();
  }, []);
  return (
    <>
      <Navbar active={3} />

      <main className="px-20 mt-10">
        <section className="shadow p-7 bg-white rounded mb-10">
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

          <form action="" onSubmit={checkSubmit}>
            <div className="grid grid-cols-4 gap-10 mt-10 ">
              <div className="col-span-1">
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
                  onChange={(e) => handleChange(e)}
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
              <div className="grid grid-cols-6 col-span-3 gap-5">
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

                <div className="mb-5 col-span-2">
                  <label htmlFor="for">Started Date</label>
                  <input
                    type="date"
                    value={data.startedDate}
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
                    value={data.startedTime}
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
                    value={data.endedDate}
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
                    value={data.endedTime}
                    onChange={(e) => {
                      setData({
                        ...data,
                        endedTime: e.target.value,
                      });
                    }}
                    className="w-full px-3 py-3 rounded bg-white border"
                  />
                </div>

                <div className="flex justify-end col-span-6">
                  <button
                    className="flex items-center gap-2 bg-gray-800 px-5 py-2 rounded text-gray-100 hover:bg-gray-700"
                    type="submit"
                    onClick={() => {
                      checkSubmit;
                    }}
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </form>
        </section>
      </main>
    </>
  );
}
