"use client";

import axios from "axios";
import * as z from "zod";
import { signIn, useSession } from "next-auth/react";
import React, { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";

type Variant = "LOGIN" | "REGISTER";

const formSchema = z.object({
  name: z.string().min(1),
  email: z.string().min(1),
  password: z.string().min(8),
});

export function AuthForm() {
  const [variant, setVariant] = useState<Variant>("LOGIN");
  const router = useRouter();
  const session = useSession();
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  useEffect(() => {
    if (session?.status === "authenticated") {
      console.log('authenticated')
      router.push(`/user/${session.data.user?.email}`);
    }
  }, [session?.status]);

  const loading = form.formState.isLoading;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (variant === "REGISTER") {
      await axios
        .post("/api/register", values)
        .then(() =>
          signIn("credentials", {
            ...values,
            redirect: false,
          })
        )
        .then((callback) => {
          if (callback?.error) {
            toast({
              variant: "destructive",
              description: "Invalid credentials!",
              duration: 2000
            })
          }

          if (callback?.ok) {
            router.push(`/user/${session.data?.user?.email}`);
          }
        });
    }

    if (variant === "LOGIN") {
      signIn("credentials", {
        ...values,
        redirect: false,
      }).then((callback) => {
        if (callback?.error) {
          toast({
            variant: "destructive",
            description: "Invalid credentials!",
            duration: 2000
          })
        }

        if (callback?.ok) {
          router.push(`/user/${session.data?.user?.email}`);
        }
      });
    }
  };

  const socialAction = (action: string) => {
    signIn(action, { redirect: false })
      .then((callback) => {
        if (callback?.error) {
          toast({
            variant: "destructive",
            description: "Invalid credentials!",
            duration: 2000
          })
        }

        if (callback?.ok) {
          router.push(`/user/${session.data?.user?.email}`);
        }
      })
      
  } 


  const toggleVariant = useCallback(() => {
    if (variant === "LOGIN") {
      setVariant("REGISTER");
    } else {
      setVariant("LOGIN");
    }
  }, [variant]);

  return (
    <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div
        className="bg-white
          px-4
          py-8
          sm:rounded-lg
          sm:px-10"
      >
        <Form {...form}>
          <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
            {variant === "REGISTER" && (
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input disabled={loading} placeholder="name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input disabled={loading} placeholder="email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                    type="password"
                      disabled={loading}
                      placeholder="password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex w-full justify-center ">
              <Button disabled={loading} type="submit" size="widthFull">
                {variant === "LOGIN" ? "Sign in" : "Register"}
              </Button>
            </div>
          </form>
        </Form>
        <div className="mt-6">
          <div className="relative">
            <div
              className="
                absolute 
                inset-0 
                flex 
                items-center
              "
            >
              <div className="w-full  border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-white px-2 text-gray-500">
                Or continue with
              </span>
            </div>
          </div>

          <div className="mt-6 flex gap-2 w-full justify-center">
            <Button onClick={() => socialAction('github')}  variant="outline">
              <span>github</span>
            </Button>
            <Button onClick={() => socialAction('google')}  variant="outline">
              <span>google</span>
            </Button>
          </div>
        </div>
        <div
          className="
            flex 
            gap-2 
            justify-center 
            text-sm 
            mt-6 
            px-2 
            text-gray-500
          "
        >
          <div>
            {variant === "LOGIN"
              ? "New to Messenger?"
              : "Already have an account?"}
          </div>
          <div onClick={toggleVariant} className="underline cursor-pointer">
            {variant === "LOGIN" ? "Create an account" : "Login"}
          </div>
        </div>
      </div>
    </div>
  );
}
