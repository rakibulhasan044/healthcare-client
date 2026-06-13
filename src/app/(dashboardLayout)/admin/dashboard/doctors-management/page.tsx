import DoctorManagementHeader from "@/components/modules/Admin/DoctorManagement/DoctorManagementHeader";
import DoctorsTable from "@/components/modules/Admin/DoctorManagement/DoctorsTable";
import RefreshButton from "@/components/shared/RefreshButton";
import SearchFilter from "@/components/shared/SearchFilter";
import SelectFilter from "@/components/shared/SelectFilter";
import TablePagination from "@/components/shared/TablePagination";
import { TableSkeleton } from "@/components/shared/TableSkeleton";
import { queryStringFormatter } from "@/lib/formatters";
import { getDoctors } from "@/services/admin/doctorManagement";
import { getSpecialties } from "@/services/admin/specialtiesManagement";
import { ISpecialty } from "@/types/specialties.interface";
import { Suspense } from "react";

const AdminDoctorManagementPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const searchParamsObj = await searchParams;
  const queryString = queryStringFormatter(searchParamsObj);
  const specialtiesResult = await getSpecialties();
  const doctorsResult = await getDoctors(queryString);
  const totalPage = Math.ceil(
    doctorsResult.meta.total / doctorsResult.meta.limit,
  );

  return (
    <div className="space-y-6">
      <DoctorManagementHeader specialties={specialtiesResult.data || []} />
      <div className="flex space-x-2">
        <SearchFilter placeholder="search doctors..." />
        <SelectFilter
          paramName="specialty"
          options={specialtiesResult?.data?.map((specialty: ISpecialty) => ({
            label: specialty.title,
            value: specialty.title,
          }))}
          placeholder="Filter by specialty"
        />
        <RefreshButton />
      </div>
      <Suspense fallback={<TableSkeleton columns={2} rows={10} />}>
        <DoctorsTable
          doctors={doctorsResult.data}
          specialties={specialtiesResult?.data || []}
        />
        <TablePagination
          currentPage={doctorsResult.meta.page}
          totalPages={totalPage}
        />
      </Suspense>
    </div>
  );
};

export default AdminDoctorManagementPage;
