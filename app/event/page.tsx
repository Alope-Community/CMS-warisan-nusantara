"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

//api
import { getEvent, deleteEvent } from "@/api/Event";

// tools
import limitString from "./../../tools/limitStr";

// components
import Navbar from "@/components/Navbar";
import ConfirmDelete from "@/components/ConfirmDelete";
import Pagination from "@/components/Pagination";

// icons
import {
  IconLoader2,
  IconPencilBox,
  IconPlus,
  IconTrashEmpty,
  IconRepost,
  IconEye,
} from "@irsyadadl/paranoid";

//
interface Event {
  id: number;
  title: string;
  location: string;
  slug: string;
  fee: number;
  banner: string;
  started: string;
  ended: string;
  description: string;
}

export default function Event() {
  const [dataEvent, setDataEvent] = useState<Event[]>([]);
  const [pagination, setPagination] = useState<Event[]>([]);

  const [loading, setLoading] = useState(true);

  //
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [searchBy, setSearchBy] = useState("Title");
  const [condition, setCondition] = useState(1);
  const [limit, setLimit] = useState(10);

  //
  const [totalDataEvents, setTotalDataEvents] = useState(0);

  const getDataEvent = async () => {
    setLoading(true);
    let result: any = await getEvent(search, page, condition, limit);
    if (result) {
      setDataEvent(result.data.data.data);
      setPagination(result.data.data.links);
      setTotalDataEvents(result.data.data.total);
      setLoading(false);
    }
  };

  useEffect(() => {
    getDataEvent();
  }, [search, page, condition, limit]);

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

  //
  const resetFilter = () => {
    setSearch("");
    setSearchBy("Title");
    setCondition(1);
    setLimit(10);
  };

  // const notify = () => toast("Wow so easy!");

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
      /* you can also use 'auto' behaviour 
         in place of 'smooth' */
    });
  };

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
              Add Event
            </Link>
          </div>

          <div className="flex justify-between items-end">
            <div className="mt-10 flex items-center gap-2">
              <select
                className="border py-2 px-4 rounded w-[150px] border-gray-500 text-sm"
                value={condition}
                onChange={(e) => {
                  let targetVal = parseInt(e.target.value);

                  if (targetVal === 1) {
                    setSearchBy("Title");
                  } else if (targetVal === 2) {
                    setSearchBy("Description");
                  } else {
                    setSearchBy("Error!");
                  }
                  setCondition(targetVal);
                }}
              >
                <option value={1}>Title</option>
                <option value={2}>Description</option>
              </select>
              <input
                type="text"
                className="border py-2 px-4 rounded w-[300px] border-gray-500 text-sm"
                placeholder={`Search by ${searchBy}`}
                value={search}
                onChange={(e) => {
                  e.preventDefault();
                  let svalue = e.target.value;

                  setSearch(svalue);

                  if (svalue == "") {
                    setSearch("");
                  }
                }}
                onKeyPress={(ev: React.KeyboardEvent<HTMLInputElement>) => {
                  if (ev.key === "Enter") {
                    ev.preventDefault();
                    setSearch((ev.target as HTMLInputElement).value);
                  }
                }}
              />
              <button
                className="flex items-center gap-2 hover:bg-gray-800 pl-3 pr-5 py-1 rounded hover:text-gray-100 border border-gray-700 text-xs"
                onClick={resetFilter}
              >
                <IconRepost className="w-4" />
                Reset
              </button>
            </div>
            {/* <div className="mt-10 flex items-center gap-2">
              <label htmlFor="setLimit" className="text-sm">
                Limit :
              </label>
              <select
                className="border py-2 px-4 rounded w-[100px] border-gray-500 text-sm"
                id="setLimit"
                value={condition}
                onChange={(e) => {
                  let targetVal = parseInt(e.target.value);

                  if (targetVal === 1) {
                    setSearchBy("Title");
                  } else if (targetVal === 2) {
                    setSearchBy("Description");
                  } else {
                    setSearchBy("Error!");
                  }
                  setCondition(targetVal);
                }}
              >
                <option value={1}>10</option>
                <option value={2}>25</option>
                <option value={2}>50</option>
                <option value={2}>100</option>
              </select>
            </div> */}
            <p className="text-sm">
              Total <b>{totalDataEvents}</b> Event
            </p>
          </div>
          <div className="overflow-x-auto w-full mt-5">
            <table className="w-full">
              <thead className="bg-gray-800 text-gray-100">
                <tr>
                  <td className="font-semibold py-5 px-5 min-w-[150px] max-w-[150px] w-[150px]">
                    Image
                  </td>
                  <td className="font-semibold px-5">Title</td>
                  <td className="font-semibold px-5">Description</td>
                  <td className="font-semibold px-5">Action</td>
                </tr>
              </thead>
              <tbody>
                {!loading ? (
                  dataEvent.length ? (
                    dataEvent.map((event, index) => (
                      <tr
                        className={index % 2 == 1 ? "bg-gray-100" : ""}
                        key={index}
                      >
                        <td className="pl-5 py-5">
                          <Image
                            src={
                              event.banner && event.banner != "-"
                                ? `http://127.0.0.1:8000/storage/images/${event.banner}`
                                : "/img-placeholder.png"
                            }
                            width={100}
                            height={100}
                            alt={`bannerEvent-${event.slug}`}
                            className="object-cover rounded w-[70px] h-[70px]"
                          />
                        </td>
                        <td className="px-5 text-gray-800" title={event.title}>
                          {limitString(event.title, 80, "...")}
                        </td>
                        <td
                          className="px-5 text-gray-800"
                          title={event.description}
                        >
                          {limitString(event.description, 100, "...")}
                        </td>
                        <td className="px-5 py-5">
                          <div className="flex items-center gap-1">
                            <button
                              className="bg-cyan-500 hover:bg-cyan-400 flex gap-1 text-gray-100 px-3 py-1 rounded text-xs items-center justify-center w-full"
                              title="Detail"
                              onClick={() => {
                                setConfirmDelete({
                                  id: event.id,
                                  title: event.title,
                                });
                              }}
                            >
                              <IconEye className="w-4" />
                            </button>
                            <Link
                              href={"event/edit/" + event.id}
                              className="bg-indigo-500 hover:bg-indigo-400 flex gap-1 text-gray-100 px-3 py-1 rounded text-xs items-center justify-center w-full"
                              title="Edit"
                            >
                              <IconPencilBox className="w-4" />
                            </Link>
                            <button
                              className="bg-red-500 hover:bg-red-400 flex gap-1 text-gray-100 px-3 py-1 rounded text-xs items-center justify-center w-full"
                              title="Delete"
                              onClick={() => {
                                setConfirmDelete({
                                  id: event.id,
                                  title: event.title,
                                });
                              }}
                            >
                              <IconTrashEmpty className="w-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td className="py-3 text-center" colSpan={4}>
                        No Data
                      </td>
                    </tr>
                  )
                ) : (
                  <tr>
                    <th className="py-3" colSpan={4}>
                      <div className="flex items-center justify-center gap-2">
                        <IconLoader2 />
                        Loading
                      </div>
                    </th>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <div className="flex justify-between items-center relative mt-10 pb-5">
            <Pagination
              links={pagination}
              getDataEvent={(e: any) => {
                setPage(e);
              }}
              active={page}
            />
            <div className="flex justify-end items-center gap-2 absolute right-0">
              <label htmlFor="setLimit" className="text-sm">
                Limit :
              </label>
              <select
                className="border py-2 px-4 rounded w-[100px] border-gray-500 text-sm"
                id="setLimit"
                value={limit}
                onChange={(e) => {
                  let limitVal = parseInt(e.target.value);

                  setLimit(limitVal);
                }}
              >
                <option value={10} selected={limit === 10}>
                  10
                </option>
                <option value={25} selected={limit === 25}>
                  25
                </option>
                <option value={50} selected={limit === 50}>
                  50
                </option>
                <option value={100} selected={limit === 100}>
                  100
                </option>
              </select>

              <button
                className="text-xs ml-10 bg-gray-800 text-white py-2 px-5 rounded"
                onClick={() => {
                  scrollToTop();
                }}
              >
                Back to Top
              </button>
            </div>
          </div>
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
