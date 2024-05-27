import React from "react";
import Link from "next/link";

// components
import Navbar from "@/components/Navbar";

// icons
import { IconArrowLeft } from "@irsyadadl/paranoid";

export default function NewsAdd() {
  return (
    <>
      <Navbar active={2} />
      <main className="px-20 mt-10">
        <section className="card bg-base-100 shadow-md p-7 mb-10">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold tracking-wider">ADD NEWS</h2>
            <Link href={"/news"} className="btn btn-neutral">
              <IconArrowLeft className="w-5" />
              back
            </Link>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div className="">
              <label className="label-text" htmlFor="banner">
                Banner
              </label>
              <label htmlFor="banner">
                <img
                  src={"/img-placeholder.png"}
                  alt="bannerEvent"
                  className="rounded cursor-pointer w-[700px] h-[300px] object-cover mx-auto"
                />
              </label>
            </div>
            <div className="col-span-2">
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
              <button className="btn btn-neutral">
                submit
              </button>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
