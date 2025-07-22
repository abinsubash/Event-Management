import * as z from 'zod';

const signupSchema = z
  .object({
    name: z.string().min(3, "Name must be at least 3 characters").max(15, "Name must be at most 15 characters"),

    phone_number: z
      .string()
      .length(10, "Phone number must be exactly 10 digits")
      .regex(/^\d+$/, "Phone number must contain only digits")
      .refine((val) => !/^(\d)\1{9}$/.test(val), {
        message: "Phone number cannot have all digits the same",
      }),

    email: z.string().email("Invalid email address"),

    password: z
      .string()
      .min(8, "Password must be minimum 8 characters")
      .regex(/[A-Z]/, "Must include at least one uppercase letter")
      .regex(/[a-z]/, "Must include at least one lowercase letter")
      .regex(/[0-9]/, "Must include at least one number")
      .regex(/[^A-Za-z0-9]/, "Must include at least one special character"),

    confirm_password: z.string(),
  })
  .refine((data) => data.password === data.confirm_password, {
    path: ["confirm_password"],
    message: "Passwords do not match",
  });

export default signupSchema;
