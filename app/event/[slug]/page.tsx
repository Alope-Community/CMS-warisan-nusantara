import Navbar from "@/components/Navbar";
import {
  IconChevronLeft,
  IconDateTime,
  IconLocation,
  IconTicket,
  IconUnlocked,
} from "@irsyadadl/paranoid";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function DetailEvent() {
  return (
    <>
      <Navbar active={3} />

      {/* <button onClick={notify}>Notify!</button>
      <ToastContainer /> */}

      <main className="px-20 mt-10 pb-1 mb-10">
        <section className="card mb-10 bg-base-100 shadow-md p-7">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold tracking-wider uppercase">
              Detail Event
            </h2>

            <Link href={"/event"} className="btn btn-neutral">
              <IconChevronLeft />
              Back
            </Link>
          </div>
          <section className="mt-10">
            <div className="grid grid-cols-3 gap-10">
              <div className="col-span-2">
                <Image
                  alt="banner"
                  src={"/img-placeholder.png"}
                  width={100}
                  height={100}
                  className="!w-full !h-[400px] object-cover rounded-lg"
                />
                <h2 className="text-2xl font-semibold mt-5">Ini Judul Event</h2>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eum
                  nostrum, veniam odit dolorum quidem, dolores maiores ipsam
                  natus atque eaque illum aliquid quisquam dignissimos maxime
                  voluptatibus vitae aliquam repellendus exercitationem.
                </p>
              </div>
              <div className="pt-10">
                <table className="table table-zebra">
                  <thead>
                    <tr>
                      <th colSpan={3}>Informasi Singkat</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th>
                        <IconDateTime />
                      </th>
                      <td>Waktu Event</td>
                      <td>13 sep 2023 18:30</td>
                    </tr>
                    <tr>
                      <th>
                        <IconUnlocked />
                      </th>
                      <td>Event Untuk</td>
                      <td>13 sep 2023 18:30</td>
                    </tr>
                    <tr>
                      <th>
                        <IconLocation />
                      </th>
                      <td>Lokasi Event</td>
                      <td>13 sep 2023 18:30</td>
                    </tr>
                    <tr>
                      <th>
                        <IconTicket />
                      </th>
                      <td>Tiket Masuk</td>
                      <td>13 sep 2023 18:30</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </section>
        </section>
      </main>
    </>
  );
}
