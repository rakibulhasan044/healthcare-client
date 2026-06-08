"use client";
import ManagementTable from "@/components/shared/ManagementTable";
import { ISpecialty } from "@/types/specialities.interface";
import { SpecialitiesColumns } from "./SpecialitiesColumns";
import DeleteConfirmationDialog from "@/components/shared/DeleteConfirmationDialog";
import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { deleteSpeciality } from "@/services/admin/specialitiesManagement";
import { toast } from "sonner";

interface SpecialitiestableProps {
  specialities: ISpecialty[];
}

const Specialitiestable = ({ specialities }: SpecialitiestableProps) => {
  const router = useRouter();
  const [, startTransition] = useTransition();
  const [deletingSpeciality, setDeletingSpeciality] =
    useState<ISpecialty | null>(null);
  const [isDeletingDialog, setIsDeletingDialog] = useState(false);

  const handleRefresh = () => {
    startTransition(() => {
      router.refresh();
    });
  };

  const handleDelete = (speciality: ISpecialty) => {
    setDeletingSpeciality(speciality);
  };

  const confirmDelete = async () => {
    if (!deletingSpeciality) return;

    setIsDeletingDialog(true);
    const result = await deleteSpeciality(deletingSpeciality.id);
    setIsDeletingDialog(false);

    if (result.success) {
      console.log(result?.message || null);
      toast.success(result?.message || "Speciality deleted successfully");
      setDeletingSpeciality(null);
      handleRefresh();
    } else {
      console.log("error mes--->>>",result?.message);
      toast.error(result?.message || "Speciality deleted failed");
      setDeletingSpeciality(null);
      handleRefresh();
    }
  };
  return (
    <>
      <ManagementTable
        data={specialities}
        columns={SpecialitiesColumns}
        onDelete={handleDelete}
        getRowKey={(speciality) => speciality.id}
        emptyMessage="No specialities found"
      />

      <DeleteConfirmationDialog
        open={!!deletingSpeciality}
        onOpenChange={(open) => !open && setDeletingSpeciality(null)}
        onConfirm={confirmDelete}
        title="Delete Speciality"
        description={`Are you sure you want to delete ${deletingSpeciality?.title}? This action can not be undone.`}
        isDeleting={isDeletingDialog}
      />
    </>
  );
};

export default Specialitiestable;
