cat << 'PAGE_EOF' > src/app/\(dashboardLayout\)/admin/dashboard/page.tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getDashboardMetaData } from "@/services/meta/dashboard.service";
import { Activity, CreditCard, Stethoscope, Users, UserCheck } from "lucide-react";

export default async function AdminDashboardPage() {
  const response = await getDashboardMetaData();
  const meta = response?.data || {};

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
        <p className="text-muted-foreground mt-2">
          Overview of the healthcare platform
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${meta.totalRevenue?._sum?.amount || 0}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Appointments</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{meta.appointmentCount || 0}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Doctors</CardTitle>
            <Stethoscope className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{meta.doctorCount || 0}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Patients</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{meta.patientCount || 0}</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Appointments by Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {meta.pieCharData?.map((data: any) => (
                <div key={data.status} className="flex items-center justify-between">
                  <div className="font-medium">{data.status}</div>
                  <div className="text-muted-foreground">{data.count}</div>
                </div>
              ))}
              {!meta.pieCharData?.length && (
                <div className="text-muted-foreground">No data available</div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
PAGE_EOF

cat << 'PAGE_EOF' > src/app/\(dashboardLayout\)/doctor/dashboard/page.tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getDashboardMetaData } from "@/services/meta/dashboard.service";
import { Activity, CreditCard, Star, Users } from "lucide-react";

export default async function DoctorDashboardPage() {
  const response = await getDashboardMetaData();
  const meta = response?.data || {};

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Doctor Dashboard</h1>
        <p className="text-muted-foreground mt-2">
          Overview of your practice
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${meta.totalRevenue?._sum?.amount || 0}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Appointments</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{meta.appointmentCount || 0}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Patients</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{meta.patientCount || 0}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Reviews</CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{meta.reviewCount || 0}</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Appointment Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {meta.formattedAppointmentStatusDistribution?.map((data: any) => (
                <div key={data.status} className="flex items-center justify-between">
                  <div className="font-medium">{data.status}</div>
                  <div className="text-muted-foreground">{data.count}</div>
                </div>
              ))}
              {!meta.formattedAppointmentStatusDistribution?.length && (
                <div className="text-muted-foreground">No data available</div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
PAGE_EOF

cat << 'PAGE_EOF' > src/app/\(dashboardLayout\)/\(patientDashboardLayout\)/dashboard/page.tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getDashboardMetaData } from "@/services/meta/dashboard.service";
import { Activity, FileText, Star } from "lucide-react";

export default async function PatientDashboardPage() {
  const response = await getDashboardMetaData();
  const meta = response?.data || {};

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Patient Dashboard</h1>
        <p className="text-muted-foreground mt-2">
          Overview of your medical history and appointments
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Appointments</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{meta.appointmentCount || 0}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Prescriptions</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{meta.prescriptionCount || 0}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Reviews Given</CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{meta.reviewCount || 0}</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Appointment Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {meta.formattedAppointmentStatusDistribution?.map((data: any) => (
                <div key={data.status} className="flex items-center justify-between">
                  <div className="font-medium">{data.status}</div>
                  <div className="text-muted-foreground">{data.count}</div>
                </div>
              ))}
              {!meta.formattedAppointmentStatusDistribution?.length && (
                <div className="text-muted-foreground">No data available</div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
PAGE_EOF

sh scratch/generate_dashboards.sh
