import { z, ZodError } from 'zod';

// Define a schema for your form data
export const SignupValidation = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  username: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email(),
  password: z.string().min(8, { message: "Password must be at least 8 characters." }),
});

export const SigninValidation = z.object({
  email: z.string().email(),
  password: z.string().min(8, { message: "Password must be at least 8 characters." }),
});

export const QueryValidation = z.object({
  UserID: z.string(),
  content: z.string().min(20).max(2000),
  domain: z.string(),
  timestamp: z.string(),
});

export const ProfileUpdateValidation = z.object({
  name: z.string(),
  bio: z.string(),
  institute: z.string(),
})