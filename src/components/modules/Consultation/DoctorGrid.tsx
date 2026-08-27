"use client";
import { IDoctor } from "@/types/doctor.interface";
import DoctorCard from "./DoctorCard";
import { StaggerContainer, StaggerItem } from "@/components/shared/Animations";

interface DoctorGridProps {
  doctors: IDoctor[];
}

export const DoctorGrid = ({ doctors }: DoctorGridProps) => {

  // console.log("consultation page ", doctors);
  if (doctors.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground text-lg">
          No doctors found matching your criteria
        </p>
        <p className="text-sm text-muted-foreground mt-2">
          try adjusting your filters or search terms
        </p>
      </div>
    );
  }
  return (
    <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {doctors.map((doctor) => (
        <StaggerItem key={doctor.id}>
          <DoctorCard doctor={doctor} />
        </StaggerItem>
      ))}
    </StaggerContainer>
  );
};
