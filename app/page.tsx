"use client";

import React from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Login() {
  const router = useRouter();

  return (
    <section className="flex justify-between items-center">
      <div className="bg-[#ea4335] w-2/5  h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className=" uppercase font-semibold text-gray-200">
            Login Portal ADMIN
          </h2>
          <h1 className="text-3xl text-gray-100 font-bold">
            WARISAN NUSANTARA
          </h1>
          <img
            src="./logo.png"
            width={80}
            alt="warisanNusantaraLogo"
            className="mx-auto my-3"
          />
          <p className="text-sm text-gray-200">
            Mari lestarikan ragam budaya hasil dari warisan nusantara.
          </p>
          <Link
            href={"/dashboard"}
            className="flex items-center justify-center gap-2 bg-white mx-auto mt-10 py-2 px-20 rounded-full"
            // onClick={() => {
            //   router.push("/dashboard");
            // }}
          >
            <svg
              viewBox="0 0 15 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              style={{
                height: 20,
                width: 20,
              }}
            >
              <g clip-path="url(#clip0_1693_8270)">
                <path
                  d="M15.3542 8.17241C15.3542 7.66258 15.3128 7.15 15.2246 6.64844H8.15039V9.53655H12.2015C12.0334 10.468 11.4932 11.292 10.7023 11.8156V13.6896H13.1192C14.5384 12.3833 15.3542 10.4542 15.3542 8.17241Z"
                  fill="#4285F4"
                ></path>
                <path
                  d="M8.14945 15.5003C10.1722 15.5003 11.8781 14.8362 13.121 13.6898L10.7041 11.8158C10.0317 12.2733 9.1636 12.5323 8.15221 12.5323C6.19557 12.5323 4.53656 11.2123 3.9413 9.4375H1.44727V11.3693C2.72046 13.9019 5.3137 15.5003 8.14945 15.5003Z"
                  fill="#34A853"
                ></path>
                <path
                  d="M3.93948 9.4372C3.62531 8.50573 3.62531 7.4971 3.93948 6.56563V4.63379H1.4482C0.384453 6.75302 0.384453 9.24981 1.4482 11.369L3.93948 9.4372Z"
                  fill="#FBBC04"
                ></path>
                <path
                  d="M8.14945 3.46854C9.21872 3.452 10.2522 3.85435 11.0265 4.59292L13.1678 2.45164C11.812 1.17844 10.0124 0.478459 8.14945 0.500505C5.3137 0.500505 2.72046 2.09889 1.44727 4.63425L3.93854 6.56609C4.53104 4.78858 6.19281 3.46854 8.14945 3.46854Z"
                  fill="#EA4335"
                ></path>
              </g>
              <defs>
                <clipPath id="clip0_1693_8270">
                  <rect
                    width="25"
                    height="25"
                    fill="white"
                    transform="translate(0.5 0.5)"
                  ></rect>
                </clipPath>
              </defs>
            </svg>
            Masuk Dengan Google
          </Link>
          <p className="mt-16 text-gray-200">
            Dowload Gratis Aplikasinya Dibawah Ini!
          </p>
          <button className="mt-5">
            <img
              src="https://lh3.googleusercontent.com/q1k2l5CwMV31JdDXcpN4Ey7O43PxnjAuZBTmcHEwQxVuv_2wCE2gAAQMWxwNUC2FYEOnYgFPOpw6kmHJWuEGeIBLTj9CuxcOEeU8UXyzWJq4NJM3lg=s0"
              alt=""
            />
          </button>
        </div>
      </div>
      <div className="flex justify-center w-3/5">
        <img src="/login.svg" alt="loginVector" className="w-[500px]" />
      </div>
    </section>
  );
}
