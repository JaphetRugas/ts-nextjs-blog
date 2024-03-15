import { z } from "zod";

export const registerSchemaValidation = z.object({
  email: z.string().email("Invalid email format.").min(1, "Email is required."),
  firstName: z.string().min(2),
  lastName: z.string().min(2),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters long.")
    .max(15, "Password must be at least 15 characters long")
    .refine((password) => /[A-Z]/.test(password), {
      message: "Password must contain at least one uppercase letter.",
    })
    .refine((password) => /[a-z]/.test(password), {
      message: "Password must contain at least one lowercase letter.",
    })
    .refine((password) => /[0-9]/.test(password), {
      message: "Password must contain at least one number.",
    })
    .refine(
      (password) => /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]+/.test(password),
      {
        message: "Password must contain at least one special character.",
      }
    ),
});

export const updateProfileSchemaValidation = z.object({
  firstName: z
    .string()
    .min(2, "First name must be at least 2 characters long")
    .optional(),
  lastName: z
    .string()
    .min(2, "Last name must be at least 2 characters long")
    .optional(),
  bio: z.string().min(2).optional(),
  oldPassword: z
    .string()
    .min(6, "Password must be at least 6 characters long.")
    .max(15, "Password must be at least 15 characters long")
    .optional(),
  newPassword: z
    .string()
    .min(6, "Password must be at least 6 characters long.")
    .max(15, "Password must be at least 15 characters long")
    .refine((password) => /[A-Z]/.test(password), {
      message: "New password must contain at least one uppercase letter.",
    })
    .refine((password) => /[a-z]/.test(password), {
      message: "New password must contain at least one lowercase letter.",
    })
    .refine((password) => /[0-9]/.test(password), {
      message: "New password must contain at least one number.",
    })
    .refine(
      (password) => /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]+/.test(password),
      {
        message: "New password must contain at least one special character.",
      }
    )
    .optional(),
  confirmPassword: z.string().optional(),
});

export const postSchema = z.object({
  title: z.string().min(1, "Post title is required.").max(255),
  content: z.string().min(1, "Post Content is required.").max(65535),
});
