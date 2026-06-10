import DoctorManagementHeader from "@/components/modules/Admin/DoctorManagement/DoctorManagementHeader";
import DoctorsTable from "@/components/modules/Admin/DoctorManagement/DoctorsTable";
import RefreshButton from "@/components/shared/RefreshButton";
import SearchFilter from "@/components/shared/SearchFilter";
import SelectFilter from "@/components/shared/SelectFilter";
import { TableSkeleton } from "@/components/shared/TableSkeleton";
import { getDoctors } from "@/services/admin/doctorManagement";
import { getSpecialities } from "@/services/admin/specialitiesManagement";
import { ISpecialty } from "@/types/specialities.interface";
import { Suspense } from "react";

const AdminDoctorManagementPage = async () => {
  const specialitiesResult = await getSpecialities();
  const doctorsResult = await getDoctors();
  return (
    <div className="space-y-6">
      <DoctorManagementHeader specialities={specialitiesResult.data} />
      <div className="flex space-x-2">
        <SearchFilter placeholder="search doctors..." />
        <SelectFilter
          paramName="speciality"
          options={specialitiesResult.data.map((speciality: ISpecialty) => ({
            label: speciality.title,
            value: speciality.title,
          }))}
          placeholder="Filter by speciality"
        />
        <RefreshButton />
      </div>
      <Suspense fallback={<TableSkeleton columns={2} rows={10} />}>
        <DoctorsTable doctors={doctorsResult.data} />
      </Suspense>
    </div>
  );
};

export default AdminDoctorManagementPage;
