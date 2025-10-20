import { signIn } from "@/auth";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import React from "react";

async function handleGoogleSignIn() {
    "use server"
    await signIn("google")
}

const SigninForm = () => {
  return (
    <Card className="w-full max-w-md">
      <CardHeader className="space-y-1">
        <CardTitle className="text-4xl font-bold text-center">
          Sign In
        </CardTitle>
        <CardDescription className="text-center font-medium text-slate-500">
          Welcome! Please sign in using your Google account to continue.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <form action={handleGoogleSignIn}>
          <Button type="submit" variant={"outline"} className="w-full">
            <div className="flex flex-row gap-2 items-center">
              <span>Sign In with</span>
              <Image
                src={"/google.png"}
                alt="logo"
                width={60}
                height={70}
                className="mt-1"
              />
            </div>
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default SigninForm;
