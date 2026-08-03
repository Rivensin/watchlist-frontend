"use client";
import Link from "next/link";
import { useState } from "react";
import { Eye, EyeOff, Film } from "lucide-react";
import { Card,CardContent,CardDescription,CardHeader,CardTitle} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import api from "@/lib/axios";
import axios from "axios";
import { toast } from "sonner"
import { useForm } from "react-hook-form";
import { RegisterFormData, RegisterSchema } from "@/lib/validators/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export default function RegisterForm() {
  const router = useRouter()

  const { register, handleSubmit, reset, formState: { errors } } = useForm<RegisterFormData>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });
  const [showPassword, setShowPassword] = useState(false);

  const registerMutation = useMutation({
    mutationFn: async(data: RegisterFormData) => {
      const response = await api.post("/auth/register", data);
      return response.data;
    },
    onSuccess: () => {
      toast.success("Account created successfully!", {
        description: "Welcome to Watchlist",
      })
      reset()
      router.push('/login')
    },
    onError: (error) => {
      if(axios.isAxiosError(error)){
        toast.error("Registration failed", {
          description: error.response?.data?.error || "Something went wrong",
        })
      } else {
        toast.error('something went wrong')
      }
    },
  })

  const onSubmit = async (data: RegisterFormData) => {
    registerMutation.mutate(data)
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
            Create Account
          </CardTitle>

          <CardDescription>
            Register to start building your watchlist
          </CardDescription>
        </div>
      </CardHeader>

      <CardContent>
        <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-2">
            <Label htmlFor="name">
              Name
            </Label>

            <Input
              {...register("name")}
              id="name"
              placeholder=""
            />

            {errors.name && (
              <p className="text-sm text-red-500">{errors.name.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">
              Email
            </Label>

            <Input
              {...register("email")}
              id="email"
              type="email"
              placeholder=""
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
                type={showPassword ? "text" : "password"}
                {...register("password")}
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
            disabled={registerMutation.isPending}
          >
            Create Account
          </Button>

          <div className="text-center text-sm">
            Already have an account?{" "}
            <Link
              href="/login"
              className="font-medium text-blue-600 hover:underline"
            >
              Login
            </Link>
          </div>

        </form>
      </CardContent>
    </Card>
  );
}