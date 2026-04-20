"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Eye, EyeOff } from "lucide-react";
import client from "@/lib/api/client";
import { FormInput } from "@/components/ui/form-input";
import Button from "@/components/ui/button";

// Zod schema for login form validation
const loginSchema = z.object({
  email: z.email("Please enter a valid email address"),
  password: z
    .string()
    .min(1, "Password is required")
    .min(6, "Password must be at least 6 characters"),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    mode: "onBlur",
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      const { data: responseData, error } =
        await client.auth.signInWithPassword(data);

      if (responseData?.session) {
        toast.success("Login Successful");
        return router.push("/admin");
      }

      if (error) {
        toast.error(error.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("An unexpected error occurred");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-luxury-dark px-4">
      <div className="w-full max-w-md">
        {/* Logo/Title */}
        <div className="text-center mb-8">
          <h1 className="font-family-heading text-4xl md:text-5xl font-bold text-luxury-accent mb-2">
            Lady M
          </h1>
          <p className="text-luxury-text-muted text-lg">Admin Dashboard</p>
        </div>

        {/* Login Form */}
        <div className="bg-luxury-light rounded-lg p-8 shadow-luxury-lg border border-luxury-accent/20">
          <h2 className="text-2xl font-semibold text-luxury-text mb-6">
            Sign In
          </h2>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Email Field */}
            <FormInput
              type="email"
              label="Email Address"
              placeholder="admin@example.com"
              disabled={isSubmitting}
              error={errors.email}
              {...register("email")}
            />

            {/* Password Field */}
            <div>
              <label className="block text-sm font-medium text-luxury-text mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  {...register("password")}
                  className={`w-full px-4 py-2.5 pr-12 bg-luxury-dark border rounded-lg text-luxury-text focus:outline-none focus:ring-2 transition-all ${
                    errors.password
                      ? "border-red-500 focus:ring-red-500"
                      : "border-luxury-accent/30 focus:ring-luxury-accent"
                  }`}
                  placeholder="••••••••"
                  disabled={isSubmitting}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-luxury-text-muted hover:text-luxury-accent transition-colors"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-400 text-xs mt-1.5">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              variant="primary"
              size="lg"
              disabled={isSubmitting}
              loading={isSubmitting}
              className="w-full"
            >
              {isSubmitting ? "Signing in..." : "Sign In"}
            </Button>
          </form>
        </div>

        {/* Footer Note */}
        <p className="text-center text-luxury-text-muted text-sm mt-6">
          Secure admin access for Lady M portfolio management
        </p>
      </div>
    </div>
  );
}
