import * as z from "zod";

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),

  password: z
    .string()
    .min(8, "Password must be minimum 8 characters")
    .regex(/[A-Z]/, "Must include at least one uppercase letter")
    .regex(/[a-z]/, "Must include at least one lowercase letter")
    .regex(/[0-9]/, "Must include at least one number")
    .regex(/[^A-Za-z0-9]/, "Must include at least one special character"),
  role: z.enum(["user", "owner", "employee","admin"], {
    message: "Role must be user, owner, or employee",
  }),
});

export default loginSchema;
