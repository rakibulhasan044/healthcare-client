import SpecialitiesManagementHeader from "@/components/modules/Admin/SpecialitiesManagement/SpecialitiesManagementHeader";
import Specialitiestable from "@/components/modules/Admin/SpecialitiesManagement/Specialitiestable";
import RefreshButton from "@/components/shared/RefreshButton";
import { TableSkeleton } from "@/components/shared/TableSkeleton";
import { getSpeciality } from "@/services/admin/specialitiesManagement";
import { Suspense } from "react";

const AdminSchedulesManagementPage = async () => {
  const result = await getSpeciality()
  return (
    <div className="space-y-6">
      <SpecialitiesManagementHeader />
      <div>
        <RefreshButton />
      </div>
      <Suspense fallback={<TableSkeleton columns={2} rows={10} />}>
      <Specialitiestable specialities={result.data} />
      </Suspense>
    </div>
  );
};

export default AdminSchedulesManagementPage;
