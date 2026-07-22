import { z } from "zod";

export const RegisterSchema = z.object({
    name:z.string().trim().min(1, "Name is required").min(3, "Name must be at least 3 characters"),
    email: z.email("Invalid email"),
    password: z.string().min(1, "Password is required").min(8, "Minimum 8 characters"),
});

export const LoginSchema = z.object({
    email: z.email('Email is invalid').toLowerCase(),
    password: z.string().min(1, 'Password is required')
});

export type RegisterFormData = z.infer<typeof RegisterSchema>;
export type LoginFormData = z.infer<typeof LoginSchema>;