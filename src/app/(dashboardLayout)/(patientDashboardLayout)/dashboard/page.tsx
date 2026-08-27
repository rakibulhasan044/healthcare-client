export const dynamic = "force-dynamic";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getDashboardMetaData } from "@/services/meta/dashboard.service";
import { Activity, FileText, Star } from "lucide-react";
import { FadeUp, PageTransition, StaggerContainer, StaggerItem, HoverCard } from "@/components/shared/Animations";

export default async function PatientDashboardPage() {
  const response = await getDashboardMetaData();
  const meta = response?.data || {};

  return (
    <PageTransition className="space-y-6">
      <FadeUp>
        <h1 className="text-3xl font-bold tracking-tight">Patient Dashboard</h1>
        <p className="text-muted-foreground mt-2">
          Overview of your medical history and appointments
        </p>
      </FadeUp>

      <StaggerContainer className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <StaggerItem>
          <HoverCard>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Appointments</CardTitle>
                <Activity className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{meta.appointmentCount || 0}</div>
              </CardContent>
            </Card>
          </HoverCard>
        </StaggerItem>
        <StaggerItem>
          <HoverCard>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Prescriptions</CardTitle>
                <FileText className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{meta.prescriptionCount || 0}</div>
              </CardContent>
            </Card>
          </HoverCard>
        </StaggerItem>
        <StaggerItem>
          <HoverCard>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Reviews Given</CardTitle>
                <Star className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{meta.reviewCount || 0}</div>
              </CardContent>
            </Card>
          </HoverCard>
        </StaggerItem>
      </StaggerContainer>

      <FadeUp delay={0.3} className="grid gap-4 md:grid-cols-2">
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
      </FadeUp>
    </PageTransition>
  );
}
