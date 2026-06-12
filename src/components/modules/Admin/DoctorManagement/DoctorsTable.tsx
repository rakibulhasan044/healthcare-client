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
import DoctorFormDialog from "./DoctorFormDialog";
import { ISpecialty } from "@/types/specialities.interface";

interface IDoctorTableProps {
  doctors: IDoctor[];
  specialities: ISpecialty[];
}
const DoctorTable = ({ doctors, specialities }: IDoctorTableProps) => {
  const router = useRouter();
  const [, startTransition] = useTransition();
  const [deletingDoctor, setDeletingDoctor] = useState<IDoctor | null>(null);
  const [viewingDoctor, setViewingDoctor] = useState<IDoctor | null>(null);
  const [isDeletingDialog, setIsDeletingDialog] = useState(false);
  const [editingDoctor, setEditingDoctor] = useState<IDoctor | null>(null);

  const handleRefresh = () => {
    startTransition(() => {
      router.refresh();
    });
  };

  const handleView = (doctor: IDoctor) => {
    setViewingDoctor(doctor);
  };

  const handleEdit = (doctor: IDoctor) => {
    setEditingDoctor(doctor);
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
        onEdit={handleEdit}
        onDelete={handleDelete}
        getRowKey={(doctor) => doctor.id!}
        emptyMessage="No doctors found"
      />

      <DoctorFormDialog
        open={!!editingDoctor}
        onClose={() => setEditingDoctor(null)}
        doctor={editingDoctor!}
        specialities={specialities}
        onSuccess={() => {
          setDeletingDoctor(null);
          handleRefresh();
        }}
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
