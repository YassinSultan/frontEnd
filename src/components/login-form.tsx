/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import type React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import axiosInstance from "@/config/axiosConfig";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";

// Define the type for the login form data
type LoginFormData = {
  username: string;
  password: string;
};

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<LoginFormData>();

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);
    console.log(data);
    try {
      const response = await axiosInstance.post("/auth/login", {
        username: data.username,
        password: data.password,
      });

      if (response.data.status === "success") {
        const { user, token } = response.data.data;
        login(user, token);
        toast.success(response.data.message || "تم تسجيل الدخول بنجاح");
        reset(); // مسح البيانات من النموذج
        navigate("/home");
      } else {
        toast.error("فشل في تسجيل الدخول");
      }
    } catch (error: any) {
      console.error("Login error:", error);
      const errorMessage =
        error.response?.data?.message || "حدث خطأ أثناء تسجيل الدخول";
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form
      className={cn("flex flex-col gap-6", className)}
      onSubmit={handleSubmit(onSubmit)}
      {...props}
    >
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">قم بتسجيل الدخول</h1>
        <p className="text-muted-foreground text-sm text-balance">
          ادخل اسم المستخدم وكلمة المرور للدخول الى حسابك
        </p>
      </div>
      <div className="grid gap-6">
        <div className="grid gap-3">
          <Label htmlFor="username">اسم المستخدم</Label>
          <Input
            id="username"
            type="text"
            placeholder="ادخل اسم المستخدم"
            disabled={isLoading}
            {...register("username", { required: "اسم المستخدم مطلوب" })}
            className={cn(
              errors.username &&
                "border-destructive focus-visible:ring-destructive"
            )}
          />
          {errors.username && (
            <p className="text-sm text-destructive">
              {errors.username.message}
            </p>
          )}
        </div>
        <div className="grid gap-3">
          <Label htmlFor="password">كلمة المرور</Label>
          <Input
            id="password"
            type="password"
            placeholder="ادخل كلمة المرور"
            disabled={isLoading}
            {...register("password")}
            className={cn(
              errors.password &&
                "border-destructive focus-visible:ring-destructive"
            )}
            autoComplete="current-password"
          />
          {errors.password && (
            <p className="text-sm text-destructive">
              {errors.password.message}
            </p>
          )}
        </div>
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin ml-2" />
              جاري تسجيل الدخول...
            </>
          ) : (
            "تسجيل الدخول"
          )}
        </Button>
        <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
          <span className="bg-background text-muted-foreground relative z-10 px-2">
            لو لم يكن لديك حسابك توجه للADMIN
          </span>
        </div>
      </div>
    </form>
  );
}
