"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { login } from "@/api/Auth";

//
import { IconLockFill, IconPersonFill } from "@irsyadadl/paranoid";

export default function Login() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [error, setError] = useState({
    message: "",
  });

  const checkValidation = () => {
    if (formData.username && formData.password) {
      return true;
    }

    return false;
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setError({
      ...error,
      message: "",
    });

    if (!checkValidation()) {
      return setError({
        ...error,
        message: "Username & Password are required",
      });
    }

    let result: any = await login(formData);

    if (result) {
      if (result.data.status_code == "WN-01") {
        router.push("/dashboard");
      } else if (result.data.status_code == "WN-02") {
        setError({
          ...error,
          message: result.data.message,
        });
      }
    }
  };

  return (
    <main className="grid grid-cols-1 lg:grid-cols-2 min-h-screen">
      <section className="z-20 right-0 flex items-center rounded justify-center border-blue-500 order-1 sm:order-1 md:right-[50px] lg:right-0 top-0 md:top-1/2 lg:top-0 md:-translate-y-1/2 lg:-translate-y-0 relative md:absolute lg:relative w-auto md:w-[400px] lg:w-auto py-0 md:py-7 lg:py-0 border-b-0 md:border-b-[5px] lg:border-b-0 h-screen md:h-auto">
        <div className="w-[80%] md:w-[85%] lg:w-[70%] text-center">
          <div className="mb-10">
            <img
              src="/logo.png"
              className="mx-auto mb-2 w-[70px] md:w-[50px] lg:w-[70px]"
            />
            <h2 className="text-2xl md:text-xl lg:text-2xl font-semibold">
              Warisan Nusantara
            </h2>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="mb-5">
              <label className="input input-bordered flex items-center gap-2">
                <IconPersonFill className="opacity-60" />
                <input
                  type="text"
                  className="grow"
                  placeholder="Username"
                  onChange={(e) => {
                    setFormData({
                      ...formData,
                      username: e.target.value,
                    });
                  }}
                />
              </label>
            </div>

            <div className="mb-5">
              <label className="input input-bordered flex items-center gap-2">
                <IconLockFill className="opacity-60" />
                <input
                  type="password"
                  className="grow"
                  placeholder="Password"
                  onChange={(e) => {
                    setFormData({
                      ...formData,
                      password: e.target.value,
                    });
                  }}
                />
              </label>
            </div>

            <div className="mb-10 text-right mt-1 flex justify-between">
              <div className="text-left text-error text-sm">
                {error.message}
              </div>
              <a href="" className="text-gray-600 text-[13px]">
                Lupa password?
              </a>
            </div>

            <div>
              <button className="btn btn-error text-white w-full">Login</button>
            </div>
          </form>
        </div>
        <footer className="absolute bottom-[25px] block md:hidden lg:block">
          <small className="text-gray-600">
            Copyright &copy; 2024 by ALOPE Team
          </small>
        </footer>
      </section>
      <section className="relative after:content-[''] after:absolute after:inset-0 after:bg-black/10 order-2 sm:order-2 h-screen md:h-auto">
        <div className="h-full w-full">
          <img
            src="/login.jpg"
            className="object-cover w-full h-screen object-center"
          />
          <div className="absolute bottom-[100px] text-white z-10 pl-10 border-l-[5px] border-error w-[85%] md:w-[45%] lg:w-[60%] bg-black/50 py-6">
            <h1 className="text-3xl font-bold tracking-wider">
              Warisan Nusantara
            </h1>
            <p className="text-sm mt-3">
              Mari kenali keragaman budaya Indonesia, hasil cipta olah nenek
              moyang nusantara agar tetap eksis di mata Dunia.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
