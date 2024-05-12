"use client";
import React, { useEffect, useState } from "react";

// api
import { getDashboard } from "@/api/Dashboard";

// Icon
import {
  IconPeople,
  IconInvoice,
  IconCalendar,
  IconArchive,
} from "@irsyadadl/paranoid";

// Chart
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

// component
import Navbar from "./../../components/Navbar";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: true,
    },
  },
};

const labels = ["January", "February", "March", "April", "May", "June"];

export const data = {
  labels,
  datasets: [
    {
      label: "Event",
      data: [65, 59, 80, 81, 56, 55],
      backgroundColor: "rgba(255, 99, 132, 0.5)",
    },
  ],
};
export const options2 = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: true,
    },
  },
};

const labels2 = ["January", "February", "March", "April", "May", "June"];

export const data2 = {
  labels,
  datasets: [
    {
      label: "News",
      data: [65, 59, 80, 81, 56, 55],
      backgroundColor: "rgba(255, 99, 132, 0.5)",
    },
  ],
};

export default function Dashboard() {
  const [total, setTotal] = useState({
    totalEvent: 0,
    totalNews: 0,
    totalUser: 0,
  });
  const getDataDashboard = async () => {
    let result: any = await getDashboard();
    if (result) {
      setTotal(result.data.data.total);
    }
  };

  useEffect(() => {
    getDataDashboard();
  }, []);
  return (
    <>
      <Navbar active={1} />
      <section className="grid grid-cols-4 gap-10 px-20 mt-10">
        <div className="bg-white rounded-md p-5 shadow ">
          <div className="flex justify-between items-end">
            <div>
              <h1 className="font-semibold mb-3 text-lg">User</h1>
              <p className="font-semibold">{total.totalUser}</p>
            </div>
            <IconPeople className="w-14 h-14" />
          </div>
        </div>
        <div className="bg-white rounded-md p-5 shadow ">
          <div className="flex justify-between items-end">
            <div>
              <h1 className="font-semibold mb-3 text-lg">Writer</h1>
              <p className="font-semibold">10</p>
            </div>
            <IconInvoice className="w-14 h-14" />
          </div>
        </div>
        <div className="bg-white rounded-md p-5 shadow ">
          <div className="flex justify-between items-end">
            <div>
              <h1 className="font-semibold mb-3 text-lg">Event</h1>
              <p className="font-semibold">{total.totalEvent}</p>
            </div>
            <IconCalendar className="w-14 h-14" />
          </div>
        </div>
        <div className="bg-white rounded-md p-5 shadow ">
          <div className="flex justify-between items-end">
            <div>
              <h1 className="font-semibold mb-3 text-lg">News</h1>
              <p className="font-semibold">{total.totalNews}</p>
            </div>
            <IconArchive className="w-14 h-14" />
          </div>
        </div>
      </section>
      <section className="grid grid-cols-2 gap-10 px-20 mt-10">
        <div className="bg-white rounded-md p-5 shadow">
          <h2 className="font-semibold text-lg">Event</h2>
          <Bar options={options} data={data} />
        </div>
        <div className="bg-white rounded-md p-5 shadow">
          <h2 className="font-semibold text-lg">News</h2>
          <Bar options={options2} data={data2} />
        </div>
      </section>
    </>
  );
}
