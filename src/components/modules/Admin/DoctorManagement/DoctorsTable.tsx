"use client";
import DeleteConfirmationDialog from "@/components/shared/DeleteConfirmationDialog";
import ManagementTable from "@/components/shared/ManagementTable";
import { softDeleteDoctor } from "@/services/admin/doctorManagement";
import { IDoctor } from "@/types/doctor.interface";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { toast } from "sonner";
import { doctorsColumns } from "./DoctorColumns";
import DoctorViewDetailsDialog from "./DoctorViewDetailsDialog";
import { vi } from "zod/locales";

interface IDoctorTableProps {
  doctors: IDoctor[];
}
const DoctorTable = ({ doctors }: IDoctorTableProps) => {
  const router = useRouter();
  const [, startTransition] = useTransition();
  const [deletingDoctor, setDeletingDoctor] = useState<IDoctor | null>(null);
  const [viewingDoctor, setViewingDoctor] = useState<IDoctor | null>(null);
  const [isDeletingDialog, setIsDeletingDialog] = useState(false);

  const handleRefresh = () => {
    startTransition(() => {
      router.refresh();
    });
  };

  const handleView = (doctor: IDoctor) => {
    setViewingDoctor(doctor);
  };

  const handleDelete = (doctor: IDoctor) => {
    setDeletingDoctor(doctor);
  };

  const confirmDelete = async () => {
    if (!deletingDoctor) return;

    setIsDeletingDialog(true);
    const result = await softDeleteDoctor(deletingDoctor.id!);
    setIsDeletingDialog(false);

    if (result.success) {
      toast.success(result?.message || "Speciality deleted successfully");
      setDeletingDoctor(null);
      handleRefresh();
    } else {
      toast.error(result?.message || "Speciality deleted failed");
      setDeletingDoctor(null);
      handleRefresh();
    }
  };
  return (
    <>
      <ManagementTable
        data={doctors}
        columns={doctorsColumns}
        onView={handleView}
        onEdit={() => {}}
        onDelete={handleDelete}
        getRowKey={(doctor) => doctor.id!}
        emptyMessage="No doctors found"
      />

      <DoctorViewDetailsDialog
        open={!!viewingDoctor}
        onClose={() => setViewingDoctor(null)}
        doctor={viewingDoctor}
      />

      <DeleteConfirmationDialog
        open={!!deletingDoctor}
        onOpenChange={(open) => !open && setDeletingDoctor(null)}
        onConfirm={confirmDelete}
        title="Delete Doctor"
        description={`Are you sure you want to delete ${deletingDoctor?.name}? This action can not be undone.`}
        isDeleting={isDeletingDialog}
      />
    </>
  );
};

export default DoctorTable;
