import AIDoctorSuggestion from "@/components/modules/Consultation/AIDoctorSuggest";
import { DoctorGrid } from "@/components/modules/Consultation/DoctorGrid";
import DoctorSearchFilters from "@/components/modules/Consultation/DoctorSearchFilter";
import TablePagination from "@/components/shared/TablePagination";
import { TableSkeleton } from "@/components/shared/TableSkeleton";
import { queryStringFormatter } from "@/lib/formatters";
import { getDoctors } from "@/services/admin/doctorManagement";
import { getSpecialties } from "@/services/admin/specialtiesManagement";
import { getUserInfo } from "@/services/auth/getUserInfo";
import { Suspense } from "react";

// ISR: Revalidate every 10 minutes for doctor listings
export const revalidate = 600;

const ConsultationPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const searchParamsObj = await searchParams;
  const queryString = queryStringFormatter(searchParamsObj);

  // Fetch doctors and specialties in parallel
  const [doctorsResponse, specialtiesResponse, userInfo] = await Promise.all([
    getDoctors(queryString),
    getSpecialties(),
    getUserInfo()
  ]);

  const doctors = doctorsResponse?.data || [];
  const specialties = specialtiesResponse?.data || [];
  const isLoggedIn = !!userInfo?.id;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Find a Doctor</h1>
          <p className="text-muted-foreground mt-2">
            Search and book appointments with our qualified healthcare
            professionals
          </p>
        </div>

        {/* AI Doctor Suggestion */}
        <AIDoctorSuggestion />

        {/* Filters */}
        <DoctorSearchFilters specialties={specialties} />

        {/* Doctor Grid */}
        <Suspense fallback={<TableSkeleton columns={3} />}>
          <DoctorGrid doctors={doctors} isLoggedIn={isLoggedIn} />
        </Suspense>

        {/* Pagination */}
        <TablePagination
          currentPage={doctorsResponse?.meta?.page || 1}
          totalPages={doctorsResponse?.meta?.totalPage || 1}
        />
      </div>
    </div>
  );
};

export default ConsultationPage;