"use client";

import * as Clerk from "@clerk/elements/common";
import * as SignIn from "@clerk/elements/sign-in";
import { useUser } from "@clerk/nextjs";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const LoginPage = () => {
  const { isLoaded, isSignedIn, user } = useUser();

  const router = useRouter();

  useEffect(() => {
    const role = user?.publicMetadata.role;

    if (role) {
      router.push(`/${role}`);
    } else {
      console.error("id not defined");
      router.push("/");
    }
  }, [user, router]);

  return (
    <div className="h-screen flex flex-col md:flex-row">
      {/* Left Side Image (hidden on small screens) */}
      <div className="hidden md:block">
        <Image
          src="/HappyDesk.jpeg"
          alt="HappyDesk"
          width={500}
          height={1000}
          className="h-full w-full object-cover"
        />
      </div>

      {/* Right Side Form */}
      <div className="flex w-full md:w-1/2 h-full items-center justify-center bg-lamaSkyLight">
        <SignIn.Root>
          <SignIn.Step
            name="start"
            className="bg-white p-8 md:p-12 rounded-md shadow-2xl flex flex-col gap-4 w-11/12 max-w-md"
          >
            <h1 className="text-xl font-bold flex items-center gap-2">
              <Image src="/logo.png" alt="" width={24} height={24} />
              HappyDesk
            </h1>
            <h2 className="text-gray-400">Sign in to your account</h2>
            <Clerk.GlobalError className="text-sm text-red-400" />

            {/* Username Field */}
            <Clerk.Field name="identifier" className="flex flex-col gap-2">
              <Clerk.Label className="text-xs text-gray-500">Username</Clerk.Label>
              <Clerk.Input
                type="text"
                required
                className="p-2 rounded-md ring-1 ring-gray-300"
              />
              <Clerk.FieldError className="text-xs text-red-400" />
            </Clerk.Field>

            {/* Password Field */}
            <Clerk.Field name="password" className="flex flex-col gap-2">
              <Clerk.Label className="text-xs text-gray-500">Password</Clerk.Label>
              <Clerk.Input
                type="password"
                required
                className="p-2 rounded-md ring-1 ring-gray-300"
              />
              <Clerk.FieldError className="text-xs text-red-400" />
            </Clerk.Field>

            {/* Submit Button */}
            <SignIn.Action
              submit
              className="bg-blue-500 text-white my-1 rounded-md text-sm p-[10px]"
            >
              Sign In
            </SignIn.Action>
          </SignIn.Step>
        </SignIn.Root>
      </div>
    </div>
  );
};

export default LoginPage;
