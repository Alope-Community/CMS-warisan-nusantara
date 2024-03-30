import Link from "next/link";
import React from "react";

export default function Pagination({ links, getDataEvent }) {
  return (
    links.length > 3 && (
      <div className="mb-4">
        <div className="flex flex-wrap items-center gap-2 mt-8">
          {links.map((link, key) =>
            link.label === "&laquo; Previous" ||
            link.label === "Next &raquo;" ? (
              // <div className="mr-1 mb-1 px-4 py-3 text-sm leading-4 text-gray-400 border rounded">
              //   {/* {link.label} */}
              // </div>
              ""
            ) : (
              <button
                className="bg-gray-900 w-[38px] h-[38px] flex items-center justify-center text-white rounded"
                onClick={() => {
                  getDataEvent(parseInt(link.label));
                }}
              >
                {link.label}
              </button>
            )
          )}
        </div>
      </div>
    )
  );
}
