import SigninForm from "@/features/auth/components/signin-form";
import Image from "next/image";
import React from "react";

const SignInPage = () => {
  return (
    <>
      <Image src={"/next.svg"} alt="logo" width={300} height={300} />
        <SigninForm/>
    </>
  );
};

export default SignInPage;
