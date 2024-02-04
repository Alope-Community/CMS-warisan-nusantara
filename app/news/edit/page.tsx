import React from "react";

export default function NewsEdit() {
  return (
    <div>
      {" "}
      <div className="">
        <div className="flex mx-10 mt-5 items-center">
          <div className="">
            <h1>ADD EVENT</h1>
          </div>
          <div className="ml-[64rem]">
            <button className="bg-gray-900 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-none">
              back
            </button>
          </div>
        </div>
        <div className="mx-10 mt-5 items-center">
          <div className="font-bold mb-2">
            <h1>Title</h1>
          </div>
          <div className="border-2">
            <input className="w-full" type="text" />
          </div>
        </div>
        <div className="mx-10 mt-5 items-center">
          <div className="font-bold mb-2">
            <h1>Content</h1>
          </div>
          <div className="border-2">
            <textarea
              className="w-full max-h-44 min-h-44"
              name=""
              id=""
            ></textarea>
          </div>
        </div>
        <div className="mx-10 mt-5 items-center">
          <div className="font-bold mb-2">
            <h1>Writer</h1>
          </div>
          <div className="border-2">
            <input className="w-full" type="text" />
          </div>
        </div>
        <div className="mx-10 mt-5 items-center">
          <button className="bg-gray-900 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-none">
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}
