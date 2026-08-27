import MySchedulesFilters from "@/components/modules/Doctor/MySchedules/MyScheduleFilters";
import MySchedulesHeader from "@/components/modules/Doctor/MySchedules/MyScheduleHeader";
import MySchedulesTable from "@/components/modules/Doctor/MySchedules/MyScheduleTable";
import TablePagination from "@/components/shared/TablePagination";
import { TableSkeleton } from "@/components/shared/TableSkeleton";
import { queryStringFormatter } from "@/lib/formatters";
import {
  getAvailableSchedules,
  getDoctorOwnSchedules,
} from "@/services/doctor/doctorSchedule.service";
import { Suspense } from "react";

interface DoctorMySchedulesPageProps {
  searchParams: Promise<{
    page?: string;
    limit?: string;
    isBooked?: string;
  }>;
}
const DoctorMySchedulesPage = async ({
  searchParams,
}: DoctorMySchedulesPageProps) => {
  const params = await searchParams;
  const queryString = queryStringFormatter(params);
  const myDoctorsScheduleResponse = await getDoctorOwnSchedules(queryString);
  const availableSchedulesResponse = await getAvailableSchedules();

  const schedules = Array.isArray(myDoctorsScheduleResponse?.data)
    ? myDoctorsScheduleResponse.data
    : myDoctorsScheduleResponse?.data?.data || [];
  const meta = myDoctorsScheduleResponse?.meta || myDoctorsScheduleResponse?.data?.meta;
  const totalPages = Math.ceil((meta?.total || 1) / (meta?.limit || 1));

  const availableSchedules = Array.isArray(availableSchedulesResponse?.data)
    ? availableSchedulesResponse.data
    : availableSchedulesResponse?.data?.data || [];

  return (
    <div className="space-y-6">
      <MySchedulesHeader
        availableSchedules={availableSchedules}
      />
      <MySchedulesFilters />
      <Suspense fallback={<TableSkeleton columns={5} rows={10} />}>
        <MySchedulesTable schedules={schedules} />
        <TablePagination
          currentPage={meta?.page || 1}
          totalPages={totalPages || 1}
        />
      </Suspense>
    </div>
  );
};

export default DoctorMySchedulesPage;
