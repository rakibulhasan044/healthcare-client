"use client";
import ManagementTable from "@/components/shared/ManagementTable";
import { ISpecialty } from "@/types/specialties.interface";
import { SpecialtiesColumns } from "./SpecialtiesColumns";
import DeleteConfirmationDialog from "@/components/shared/DeleteConfirmationDialog";
import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { deleteSpecialty } from "@/services/admin/specialtiesManagement";
import { toast } from "sonner";

interface SpecialtiesTableProps {
  specialties: ISpecialty[];
}

const SpecialtiesTable = ({
  specialties: specialties,
}: SpecialtiesTableProps) => {
  const router = useRouter();
  const [, startTransition] = useTransition();
  const [deletingSpecialty, setDeletingSpecialty] =
    useState<ISpecialty | null>(null);
  const [isDeletingDialog, setIsDeletingDialog] = useState(false);

  const handleRefresh = () => {
    startTransition(() => {
      router.refresh();
    });
  };

  const handleDelete = (specialty: ISpecialty) => {
    setDeletingSpecialty(specialty);
  };

  const confirmDelete = async () => {
    if (!deletingSpecialty) return;

    setIsDeletingDialog(true);
    const result = await deleteSpecialty(deletingSpecialty.id);
    setIsDeletingDialog(false);

    if (result.success) {
      toast.success(result?.message || "Specialty deleted successfully");
      setDeletingSpecialty(null);
      handleRefresh();
    } else {
      toast.error(result?.message || "Specialty deleted failed");
      setDeletingSpecialty(null);
      handleRefresh();
    }
  };
  return (
    <>
      <ManagementTable
        data={specialties}
        columns={SpecialtiesColumns}
        onDelete={handleDelete}
        getRowKey={(specialty) => specialty.id}
        emptyMessage="No specialties found"
      />

      <DeleteConfirmationDialog
        open={!!deletingSpecialty}
        onOpenChange={(open) => !open && setDeletingSpecialty(null)}
        onConfirm={confirmDelete}
        title="Delete Specialty"
        description={`Are you sure you want to delete ${deletingSpecialty?.title}? This action can not be undone.`}
        isDeleting={isDeletingDialog}
      />
    </>
  );
};

export default SpecialtiesTable;
