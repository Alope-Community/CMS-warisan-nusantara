"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

//
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

//api
import { getEvent, deleteEvent } from "@/api/Event";

// components
import Navbar from "@/components/Navbar";
import ConfirmDelete from "@/components/ConfirmDelete";

// icons
import {
  IconLoader2,
  IconPencilBox,
  IconPlus,
  IconTrashEmpty,
} from "@irsyadadl/paranoid";

//
interface Event {
  id: number;
  title: string;
  banner: string;
  description: string;
}

export default function Event() {
  const [dataEvent, setDataEvent] = useState<Event[]>([]);

  const [loading, setLoading] = useState(true);

  const getDataEvent = async () => {
    let result: any = await getEvent();
    if (result) {
      setDataEvent(result.data.data);
      setLoading(false);
    }
  };

  useEffect(() => {
    getDataEvent();
  }, []);

  // delete
  const [confirmDelete, setConfirmDelete] = useState({
    id: 0,
    title: "",
  });

  const deleteDataEvent = async () => {
    let result: any = await deleteEvent(confirmDelete.id);
    if (result) {
      getDataEvent();
    }
  };

  // const notify = () => toast("Wow so easy!");

  return (
    <>
      <Navbar active={3} />

      {/* <button onClick={notify}>Notify!</button>
      <ToastContainer /> */}

      <main className="px-20 mt-10">
        <section className="shadow bg-white p-7 rounded mb-10">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold tracking-wider">EVENT</h2>

            <Link
              href={"/event/add"}
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
                <td className="font-semibold px-5 w-[200px]">Title</td>
                <td className="font-semibold px-5 w-[500px]">Description</td>
                <td className="font-semibold px-5">Writer</td>
                <td className="font-semibold px-5">Action</td>
              </tr>
            </thead>
            <tbody>
              {!loading ? (
                dataEvent.length ? (
                  dataEvent.map((event, index) => (
                    <tr className={index % 2 == 1 ? "bg-gray-100" : ""}>
                      <td className="py-10 pl-5">{index + 1}</td>
                      <td className="px-5">
                        <Image
                          src={
                            event.banner
                              ? `http://127.0.0.1:8000/storage/images/${event.banner}`
                              : "/img-placeholder.png"
                          }
                          width={70}
                          height={100}
                          alt="bannerEvent"
                          className="object-cover rounded w-[70px] h-[70px]"
                        />
                      </td>
                      <td className="px-5">{event.title}</td>
                      <td className="px-5">{event.description}</td>
                      <td className="px-5">Ilham Hafidz</td>
                      <td className="px-5">
                        <div className="flex gap-2">
                          <Link
                            href={"event/edit/" + event.id}
                            className="bg-indigo-500 hover:bg-indigo-400 flex gap-1 text-gray-100 px-3 py-1 rounded text-xs items-center"
                          >
                            <IconPencilBox className="w-4" />
                            Edit
                          </Link>
                          <button
                            className="bg-red-500 hover:bg-red-400 flex gap-1 text-gray-100 px-3 py-1 rounded text-xs items-center"
                            onClick={() => {
                              setConfirmDelete({
                                id: event.id,
                                title: event.title,
                              });
                            }}
                          >
                            <IconTrashEmpty className="w-4" />
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <th className="py-3" colSpan={6}>
                      No Data
                    </th>
                  </tr>
                )
              ) : (
                <tr>
                  <th className="py-3" colSpan={6}>
                    <div className="flex items-center justify-center gap-2">
                      <IconLoader2 />
                      Loading
                    </div>
                  </th>
                </tr>
              )}
            </tbody>
          </table>
        </section>
      </main>

      <ConfirmDelete
        data={confirmDelete}
        cancelDelete={() => {
          setConfirmDelete({
            id: 0,
            title: "",
          });
        }}
        deleteData={() => {
          setLoading(true);
          setConfirmDelete({
            id: 0,
            title: "",
          });

          deleteDataEvent();
        }}
      />
    </>
  );
}
