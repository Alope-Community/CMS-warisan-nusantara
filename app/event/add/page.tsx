"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

// icons
import { IconChevronLeft } from "@irsyadadl/paranoid";

// components
import Navbar from "@/components/Navbar";
import Loading from "@/components/Loading";

//api
import { insertEvent } from "@/api/Event";
import uploadFile from "@/api/_UploadFile";

interface apiResponse {
  data: {
    status_code: string;
    fileName: string;
    data: any;
  };
}

export default function AddEvent() {
  const router = useRouter();

  const [loading, isLoading] = useState(false);

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
    for: "all ages",
  });

  const [imagePlaceholder, setImagePlaceholder] = useState("");
  const [imageFile, setImageFile] = useState("");

  const handleChange = (e: any) => {
    setValidation({
      ...validation,
      banner: "",
    });

    setImageFile(e.target.files[0]);

    if (e.target.files && e.target.files[0]) {
      let reader = new FileReader();

      reader.onload = (e: { target: any }) => {
        setImagePlaceholder(e.target.result);
      };

      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const checkSubmit = (e: any) => {
    e.preventDefault();

    let validator = {
      title: "",
      description: "",
      banner: "",
      startedDate: "",
      startedTime: "",
      endedDate: "",
      endedTime: "",
      fee: "",
      location: "",
    };

    if (!data.title) validator.title = "Title is required!";
    if (!data.description) validator.description = "Description is required!";
    if (!data.startedDate) validator.startedDate = "Started Date is required!";
    if (!data.startedTime) validator.startedTime = "Started Time is required!";
    if (!data.endedDate) validator.endedDate = "Ended Date is required!";
    if (!data.endedTime) validator.endedTime = "Ended Time is required!";
    if (!data.fee) validator.fee = "Fee is required!";
    if (!data.location) validator.location = "Location is required!";
    if (!imagePlaceholder && !imageFile)
      validator.banner = "Banner is required!";

    // Periksa apakah semua nilai dari kunci-kunci di objek validator kosong
    const isAllEmpty = Object.values(validator).every((value) => value === "");

    if (isAllEmpty) {
      const formData = new FormData();

      formData.append("image", imageFile);

      uploadDataFile(formData);
    } else {
      setValidation(validator);
    }
  };

  const uploadDataFile = async (formData: any) => {
    isLoading(true);
    let result = (await uploadFile(formData)) as apiResponse;
    if (result) {
      if (result.data.status_code == "WN-01") {
        setData({
          ...data,
          banner: result.data.fileName,
        });

        insertDataEvent(result.data.fileName);
      }
    }
  };

  const insertDataEvent = async (fileName: String) => {
    isLoading(true);
    let result = await insertEvent(data, fileName);
    if (result) {
      isLoading(false);
      router.push("/event");
    }
  };

  const resetForm = () => {
    setData({
      title: "",
      description: "",
      banner: "",
      startedDate: "",
      startedTime: "",
      endedDate: "",
      endedTime: "",
      fee: "",
      location: "",
      for: "all ages",
    });

    setImagePlaceholder("");
    setImageFile("");
  };

  const [validation, setValidation] = useState({
    title: "",
    description: "",
    banner: "",
    startedDate: "",
    startedTime: "",
    endedDate: "",
    endedTime: "",
    fee: "",
    location: "",
  });

  return (
    <>
      <Navbar active={3} />

      <Loading show={loading} />

      <main className="px-20 mt-10">
        <section className="card bg-base-100 shadow-md p-7 mb-10">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold tracking-wider">ADD EVENT</h2>

            <Link href={"/event"} className="btn btn-neutral">
              <IconChevronLeft className="w-5" />
              Back
            </Link>
          </div>

          <form onSubmit={checkSubmit}>
            <div className="grid grid-cols-4 gap-10 mt-10 ">
              <div className="grid-cols-1">
                <div className="mb-5 col-span-6">
                  <label className="label-text" htmlFor="banner">
                    Banner
                  </label>
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
                        className="btn btn-neutral btn-sm"
                      >
                        Change Banner
                      </label>
                      <button
                        className="btn btn-error btn-sm"
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
                  <small className="text-red-500 italic">
                    {validation.banner}
                  </small>
                </div>
              </div>
              <div className="grid gap-5 grid-cols-6 col-span-3">
                <div className="form-control col-span-6">
                  <label htmlFor="title" className="label-text">
                    Title
                  </label>
                  <input
                    type="text"
                    className="input input-bordered w-full"
                    id="title"
                    onBlur={(e) => {
                      setData({
                        ...data,
                        title: e.target.value,
                      });

                      setValidation({
                        ...validation,
                        title: "",
                      });
                    }}
                  />
                  <small className="text-red-500 italic">
                    {validation.title}
                  </small>
                </div>
                <div className="mb-5 col-span-6">
                  <label htmlFor="description" className="label-text">
                    Description
                  </label>
                  <textarea
                    className="textarea textarea-bordered h-24 w-full"
                    id="description"
                    onBlur={(e) => {
                      setData({
                        ...data,
                        description: e.target.value,
                      });

                      setValidation({
                        ...validation,
                        description: "",
                      });
                    }}
                  ></textarea>
                  <small className="text-red-500 italic">
                    {validation.description}
                  </small>
                </div>
                <div className="mb-5  col-span-2">
                  <label className="label-text" htmlFor="fee">
                    Fee
                  </label>
                  <input
                    type="text"
                    className="input input-bordered w-full"
                    id="fee"
                    onBlur={(e) => {
                      setData({
                        ...data,
                        fee: e.target.value,
                      });

                      setValidation({
                        ...validation,
                        fee: "",
                      });
                    }}
                  />
                  <small className="text-red-500 italic">
                    {validation.fee}
                  </small>
                </div>
                <div className="mb-5 col-span-2">
                  <label className="label-text" htmlFor="location">
                    Location
                  </label>
                  <input
                    type="text"
                    className="input input-bordered w-full"
                    id="location"
                    onBlur={(e) => {
                      setData({
                        ...data,
                        location: e.target.value,
                      });

                      setValidation({
                        ...validation,
                        location: "",
                      });
                    }}
                  />
                  <small className="text-red-500 italic">
                    {validation.location}
                  </small>
                </div>

                <div className="mb-5 col-span-2">
                  <label className="label-text" htmlFor="for">
                    For
                  </label>
                  <select
                    id="for"
                    className="select select-bordered w-full"
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
                  <label className="label-text" htmlFor="for">
                    Started Date
                  </label>
                  <input
                    type="date"
                    onChange={(e) => {
                      setData({
                        ...data,
                        startedDate: e.target.value,
                      });

                      setValidation({
                        ...validation,
                        startedDate: "",
                      });
                    }}
                    className="input input-bordered w-full"
                  />
                  <small className="text-red-500 italic">
                    {validation.startedDate}
                  </small>
                </div>
                <div className="mb-5 col-span-1">
                  <label className="label-text" htmlFor="for">
                    Started Time
                  </label>
                  <input
                    type="time"
                    onChange={(e) => {
                      setData({
                        ...data,
                        startedTime: e.target.value,
                      });

                      setValidation({
                        ...validation,
                        startedTime: "",
                      });
                    }}
                    className="input input-bordered w-full"
                  />
                  <small className="text-red-500 italic">
                    {validation.startedTime}
                  </small>
                </div>

                <div className="mb-5 col-span-2">
                  <label className="label-text" htmlFor="for">
                    Ended Date
                  </label>
                  <input
                    type="date"
                    onChange={(e) => {
                      setData({
                        ...data,
                        endedDate: e.target.value,
                      });

                      setValidation({
                        ...validation,
                        endedDate: "",
                      });
                    }}
                    className="input input-bordered w-full"
                  />
                  <small className="text-red-500 italic">
                    {validation.endedDate}
                  </small>
                </div>
                <div className="mb-5 col-span-1">
                  <label className="label-text" htmlFor="for">
                    Ended Time
                  </label>
                  <input
                    type="time"
                    onChange={(e) => {
                      setData({
                        ...data,
                        endedTime: e.target.value,
                      });

                      setValidation({
                        ...validation,
                        endedTime: "",
                      });
                    }}
                    className="input input-bordered w-full"
                  />
                  <small className="text-red-500 italic">
                    {validation.endedTime}
                  </small>
                </div>

                <div className="flex gap-3 mt-10 justify-end col-span-6">
                  <button
                    className="btn btn-ghost"
                    type="reset"
                    onClick={() => {
                      resetForm();
                    }}
                  >
                    Reset
                  </button>
                  <button
                    className="btn btn-neutral"
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
