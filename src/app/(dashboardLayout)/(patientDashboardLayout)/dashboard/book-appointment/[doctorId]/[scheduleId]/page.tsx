/* eslint-disable @typescript-eslint/no-explicit-any */
import AppointmentConfirmation from "@/components/modules/Patient/PatientAppointment/AppointmentConfirmation";
import { getDoctorById } from "@/services/admin/doctorManagement";
import { IDoctor } from "@/types/doctor.interface";
import { notFound } from "next/navigation";

interface BookAppointmentPageProps {
  params: Promise<{
    doctorId: string;
    scheduleId: string;
  }>;
}

export default async function BookAppointmentPage({
  params,
}: BookAppointmentPageProps) {
  const { doctorId, scheduleId } = await params;

  // Fetch doctor data (which now includes nested schedules)
  const doctorResponse = await getDoctorById(doctorId);

  if (!doctorResponse?.success || !doctorResponse?.data) {
    notFound();
  }

  const doctor: IDoctor = doctorResponse.data;

  // Find the specific schedule from the doctor's schedules
  const doctorSchedule = doctor.doctorSchedules?.find(
    (ds: any) => ds.scheduleId === scheduleId
  );

  console.log("Looking for scheduleId:", scheduleId);
  console.log("doctorSchedules:", doctor.doctorSchedules);
  console.log("found doctorSchedule:", doctorSchedule);

  if (!doctorSchedule || !doctorSchedule.schedule) {
    console.log("Triggering notFound because schedule wasn't found in doctorSchedules");
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <AppointmentConfirmation
        doctor={doctor}
        schedule={doctorSchedule.schedule}
      />
    </div>
  );
}
