"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Loader } from "lucide-react";

import { Input } from "@/components/ui/input";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { signIn } from "next-auth/react";
import Image from "next/image";

const formSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long" })
    .max(15, { message: "Password must not exceed 15 characters" })
    .regex(/[a-zA-Z0-9]/, { message: "Password must be alphanumeric" }),
});

export default function SignInPage() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setIsLoading(true);
      const result = await signIn("credentials", {
        redirect: false,
        email: values.email,
        password: values.password,
      });
      if (result?.error) {
        toast.error(result?.error || "Failed to Login. Please try again.");
        return;
      }
      toast.success("Logged in successfully");
      setTimeout(() => {
        router.push("/profile");
      }, 500);
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message || "Something went wrong"
          : "Something went wrong"
      );
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="flex flex-col min-h-screen h-full w-full items-center justify-center px-4">
      <Card className="mx-auto max-w-md w-full">
        <CardHeader>
          <CardTitle className="text-2xl">Sign In to Your Account</CardTitle>
          <CardDescription>
            Enter your email and password to sign in. If you don&#39;t have an
            account,{" "}
            <Link href="/signup" className="underline hover:text-black">
              SignUp here
            </Link>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <div className="grid gap-4">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem className="grid gap-2">
                      <FormLabel htmlFor="email">Email</FormLabel>
                      <FormControl>
                        <Input
                          id="email"
                          placeholder="mail@devvoy.com"
                          type="email"
                          autoComplete="email"
                          readOnly={isLoading}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem className="grid gap-2">
                      <div className="flex justify-between items-center">
                        <FormLabel htmlFor="password">Password</FormLabel>
                        <Link
                          href="/forgot-password"
                          className="ml-auto inline-block text-sm underline"
                        >
                          Forgot your password?
                        </Link>
                      </div>
                      <FormControl>
                        <Input
                          id="password"
                          placeholder="******"
                          type="password"
                          readOnly={isLoading}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  type="submit"
                  className="w-full cursor-pointer"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader className="mr-2 h-4 w-4 animate-spin" />
                      Logging in...
                    </>
                  ) : (
                    "Login"
                  )}
                </Button>
                <div className="text-center text-sm">or</div>
              </div>
            </form>
          </Form>
          <Button
            variant="outline"
            className="w-full my-5 cursor-pointer"
            disabled={isLoading}
            onClick={() => {
              signIn("google", {
                callbackUrl: "/profile",
              });
            }}
          >
            <Image
              src="/google-logo.png"
              alt="Google Logo"
              width={16}
              height={16}
              className="inline-block mr-2"
            />
            Login with Google
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
