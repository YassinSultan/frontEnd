import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { User, Phone, CreditCard, Shield } from "lucide-react";

export default function Home() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">
            مرحباً بك في نظام إدارة البيانات
          </h1>
        </div>

        {/* User Info Card */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              معلومات المستخدم
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4 text-muted-foreground" />
                <span className="font-medium">اسم المستخدم:</span>
                <span>{user?.username}</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4 text-muted-foreground" />
                <span className="font-medium">الدور:</span>
                <span className="capitalize">{user?.role}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <span className="font-medium">رقم الهاتف:</span>
                <span>{user?.phoneNumber}</span>
              </div>
              <div className="flex items-center gap-2">
                <CreditCard className="h-4 w-4 text-muted-foreground" />
                <span className="font-medium">الرقم القومي:</span>
                <span>{user?.national_ID}</span>
              </div>
              <div className="flex items-center gap-2">
                <User className="h-4 w-4 text-muted-foreground" />
                <span className="font-medium">الجنس:</span>
                <span>{user?.gender === "Male" ? "ذكر" : "أنثى"}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Dashboard Content */}
        {/*         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>إجمالي المستخدمين</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">150</div>
              <p className="text-muted-foreground text-sm">مستخدم نشط</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>البيانات المعالجة</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2,340</div>
              <p className="text-muted-foreground text-sm">سجل هذا الشهر</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>المهام المكتملة</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">89%</div>
              <p className="text-muted-foreground text-sm">معدل الإنجاز</p>
            </CardContent>
          </Card>
        </div> */}
      </div>
    </div>
  );
}
