"use client";
import Link from "next/link";
import { useState } from "react";
import { Eye, EyeOff, Film } from "lucide-react";
import {Card,CardContent,CardDescription,CardHeader,CardTitle} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { LoginFormData, LoginSchema } from "@/lib/validators/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import api from "@/lib/axios";
import { toast } from "sonner";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const { register, handleSubmit, reset, formState: { errors } } = useForm<LoginFormData>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const loginMutation = useMutation({
    mutationFn: async(data: LoginFormData) => {
      const response = await api.post("/auth/login", data);
      return response.data;
    },
      
    onSuccess: () => {
      toast.success("Logged in successfully!");
      reset()
      router.push('/')
    },

    onError: (error) => {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.error ?? "Login Failed");
      } else {
        toast.error("Something went wrong");
      }
    },
  })

  const onSubmit = (data: LoginFormData) => {
    loginMutation.mutate(data)
  }

  return (
    <Card className="w-full max-w-107.5 shadow-xl">
      <CardHeader className="space-y-4">
        <Link href='/' className="hover:underline hover:text-blue-400 text-right">Back to Watchlist</Link>
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full relative">
          <Image src='/icon.png' fill alt='watchlist icon' className="object-contain" />
        </div>

        <div className="space-y-1 text-center">
          <CardTitle className="text-3xl font-bold">
            WatchList
          </CardTitle>

          <CardDescription>
            Sign in to your account
          </CardDescription>
        </div>
      </CardHeader>

      <CardContent>
        <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-2">
            <Label htmlFor="email">
              Email
            </Label>

            <Input
              id="email"
              type="email"
              placeholder=""
              {...register("email")}
            />

            {errors.email && (
              <p className="text-sm text-red-500">{errors.email.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">
              Password
            </Label>

            <div className="relative">

              <Input
                id="password"
                {...register("password")}
                type={showPassword ? "text" : "password"}
                placeholder=""
              />

              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-black"
              >
                {showPassword ? (
                  <EyeOff size={18} />
                ) : (
                  <Eye size={18} />
                )}
              </button>

            </div>

            {errors.password && (
              <p className="text-sm text-red-500">{errors.password.message}</p>
            )}
          </div>
          
          <Button
            className="w-full"
            type="submit"
            disabled={loginMutation.isPending}
          >
            Sign In
          </Button>

          <div className="text-center text-sm">

            Dont have an account?{" "}

            <Link
              href="/register"
              className="font-medium text-blue-600 hover:underline"
            >
              Register
            </Link>

          </div>
        </form>
      </CardContent>
    </Card>
  );
}