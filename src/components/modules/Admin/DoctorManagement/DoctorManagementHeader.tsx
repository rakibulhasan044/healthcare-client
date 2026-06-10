"use client";

import ManagementPageHeader from "@/components/shared/ManagementPageHeader";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import DoctorFormDialog from "./DoctorFormDialog";
import { IDoctor } from "@/types/doctor.interface";
import { ISpecialty } from "@/types/specialities.interface";

interface IDoctorManagementHeaderProps {
    doctor?: IDoctor;
    specialities?: ISpecialty[]
}
const DoctorManagementHeader = ({doctor, specialities}: IDoctorManagementHeaderProps) => {
  const router = useRouter();
  const [, startTransition] = useTransition();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleSuccess = () => {
    startTransition(() => {
      router.refresh();
    });
  };
  return (
    <>
      <DoctorFormDialog
        open={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onSuccess={handleSuccess}
        doctor={doctor}
        specialities={specialities}
      />

      <ManagementPageHeader
        title="Doctors Management"
        description="Manage doctors information and details"
        action={{
          label: "Add Doctor",
          icon: Plus,
          onClick: () => setIsDialogOpen(true),
        }}
      />
    </>
  );
};

export default DoctorManagementHeader;
