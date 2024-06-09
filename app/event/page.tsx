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
  IconSearch,
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
        <section className="card bg-base-100 shadow-md p-7 mb-10">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold tracking-wider">EVENT</h2>

            <Link href={"/event/add"} className="btn btn-neutral">
              <IconPlus className="w-3" />
              Add Event
            </Link>
          </div>

          <div className="flex justify-between items-end">
            <div className="mt-10 flex items-center gap-2">
              <select
                className="select select-bordered w-xs"
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
              <label className="input input-bordered flex items-center gap-2">
                <input
                  type="text"
                  className="grow"
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
                <IconSearch />
              </label>
              <button className="btn btn-ghost" onClick={resetFilter}>
                <IconRepost className="w-4" />
                Reset
              </button>
            </div>
            <p className="text-sm">
              Total <b>{totalDataEvents}</b> Event
            </p>
          </div>
          <div className="overflow-x-auto mt-5">
            <table className="table table-zebra">
              <thead>
                <tr>
                  <td>Image</td>
                  <td>Title</td>
                  <td>Description</td>
                  <td>Action</td>
                </tr>
              </thead>
              <tbody>
                {!loading ? (
                  dataEvent.length ? (
                    dataEvent.map((event, index) => (
                      <tr key={index} className="hover">
                        <td>
                          <div className="avatar">
                            <div className="w-24 rounded">
                              <Image
                                alt="Banner"
                                src={
                                  event.banner && event.banner != "-"
                                    ? `http://127.0.0.1:8000/storage/images/${event.banner}`
                                    : "/img-placeholder.png"
                                }
                                width={60}
                                height={60}
                              />
                            </div>
                          </div>
                        </td>
                        <td title={event.title}>
                          {limitString(event.title, 80, "...")}
                        </td>
                        <td title={event.description}>
                          {limitString(event.description, 100, "...")}
                        </td>
                        <td>
                          <div className="flex items-center gap-1">
                            <Link
                              className="btn btn-sm btn-info text-white"
                              title="Detail"
                              href={`/event/${event.slug}`}
                            >
                              <IconEye className="w-4" />
                            </Link>
                            <Link
                              href={"event/edit/" + event.slug}
                              className="btn btn-sm btn-primary"
                              title="Edit"
                            >
                              <IconPencilBox className="w-4" />
                            </Link>
                            <button
                              className="btn btn-sm btn-error text-white"
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
            <div className="flex justify-end items-center gap-2 absolute right-0 mt-3">
              <label htmlFor="setLimit" className="text-sm">
                Limit :
              </label>
              <select
                className="select select-bordered select-sm"
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
                className="btn btn-neutral btn-sm"
                onClick={() => {
                  scrollToTop();
                }}
              >
                Back to Top
              </button>
            </div>
          </div>
        </section>

        {/* <section className="fixed bg-black/30 inset-0 flex items-center justify-center">
          <div className="bg-white w-[500px] rounded p-5">wefewf</div>
        </section> */}
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
