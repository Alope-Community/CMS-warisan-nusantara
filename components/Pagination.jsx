import React from "react";

export default function Pagination({ links, getDataEvent, active }) {
  return (
    links.length > 3 && (
      <section>
        <div className="flex flex-wrap items-center gap-2">
          {links.map((link, key) =>
            link.label === "&laquo; Previous" ||
            link.label === "Next &raquo;" ? (
              // <div className="mr-1 mb-1 px-4 py-3 text-sm leading-4 text-gray-400 border rounded">
              //   {/* {link.label} */}
              // </div>
              ""
            ) : key == active ? (
              <button
                key={key}
                className="bg-gray-900 w-[38px] h-[38px] flex items-center justify-center text-white rounded"
                onClick={() => {
                  getDataEvent(parseInt(link.label));
                }}
              >
                {link.label}
              </button>
            ) : (
              <button
                key={key}
                className="border border-gray-900 w-[38px] h-[38px] flex items-center justify-center text-gray-900 rounded"
                onClick={() => {
                  getDataEvent(parseInt(link.label));
                }}
              >
                {link.label}
              </button>
            )
          )}
        </div>
      </section>
    )
  );
}
