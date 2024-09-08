import { z } from "zod";
import { emailRegex, passwordRegex } from "@/lib/constants";

export const signInSchema = z.object({
  email: z
    .string()
    .min(5, { message: "Email must be required" })
    .regex(emailRegex, { message: "Please enter a valid email address" }),
  password: z
    .string()
    .min(8, { message: "Password must be atleast 8 characters" })
    .regex(passwordRegex, {
      message: "Password contains one uppercase, lowercase, and number",
    }),
});

export type signInSchemaType = z.infer<typeof signInSchema>;

export const signUpSchema = z
  .object({
    fullName: z
      .string()
      .min(5, { message: "Name must be atleast 3 characters" }),
    email: z
      .string()
      .min(5, { message: "Email must be required" })
      .regex(emailRegex, { message: "Please enter a valid email address" }),
    password: z
      .string()
      .min(8, { message: "Password must be atleast 8 characters" })
      .regex(passwordRegex, {
        message: "Password contains one uppercase, lowercase, and number",
      }),
    confirmPassword: z
      .string()
      .min(8, { message: "Password must be atleast 8 characters" })
      .regex(passwordRegex, {
        message: "Password contains one uppercase, lowercase, and number",
      }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });

export type signUpSchemaType = z.infer<typeof signUpSchema>;
