import { LoginForm } from "@/components/login-form";
import { DatabaseZapIcon } from "lucide-react";
import login from "@/assets/Login-amico.svg";
import { useAuth } from "@/contexts/AuthContext";
import { Navigate } from "react-router-dom";

export default function Login() {
  const { isAuthenticated, isLoading } = useAuth();

  // إذا كان المستخدم مسجل دخول بالفعل، وجهه للصفحة الرئيسية
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (isAuthenticated) {
    return <Navigate to="/" />;
  }

  return (
    <>
      <div className="grid min-h-svh lg:grid-cols-2">
        <div className="flex flex-col gap-4 p-6 md:p-10">
          <div className="flex justify-center gap-2 md:justify-start">
            <a href="#" className="flex items-center gap-2 font-medium">
              <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
                <DatabaseZapIcon className="size-4" />
              </div>
              DataManger
            </a>
          </div>
          <div className="flex flex-1 items-center justify-center">
            <div className="w-full max-w-xs">
              <LoginForm />
            </div>
          </div>
        </div>
        <div className="relative hidden bg-muted lg:block">
          <img
            src={login || "/placeholder.svg"}
            alt="Image"
            className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.5] dark:grayscale"
          />
        </div>
      </div>
    </>
  );
}
