"use server";

import { loginSchema } from "../validators/auth.validator";
import { prisma } from "../db/prisma";
import { verifyPassword } from "../auth/crypto";

export interface ActionResponse<T> {
  success: boolean;
  message: string;
  data?: T;
  errors?: Record<string, string[]>;
}

/**
 * Server action to authenticate admin panel logins
 */
export async function loginAction(
  prevState: any,
  formData: FormData
): Promise<ActionResponse<{ email: string; role: string }>> {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const result = loginSchema.safeParse({ email, password });

  if (!result.success) {
    return {
      success: false,
      message: "Validation failed",
      errors: result.error.flatten().fieldErrors,
    };
  }

  try {
    const user = await prisma.user.findUnique({
      where: { email: result.data.email },
    });

    if (!user) {
      return {
        success: false,
        message: "Invalid email or password",
      };
    }

    const isValid = verifyPassword(result.data.password, user.passwordHash);

    if (!isValid) {
      return {
        success: false,
        message: "Invalid email or password",
      };
    }

    // Return authenticated user summary
    return {
      success: true,
      message: "Login successful",
      data: {
        email: user.email,
        role: user.role,
      },
    };
  } catch (error: any) {
    console.error("Login Error:", error);
    return {
      success: false,
      message: "An internal server error occurred",
    };
  }
}
