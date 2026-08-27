"use client";

import { IDoctor } from "@/types/doctor.interface";
import {
  StaggerContainer,
  StaggerItem,
  HoverCard,
} from "@/components/shared/Animations";
import DoctorCard from "./DoctorCard";

interface DoctorsGridProps {
  doctors: IDoctor[];
}

const DoctorsGrid = ({ doctors }: DoctorsGridProps) => {
  return (
    <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {doctors.map((doctor) => (
        <StaggerItem key={doctor.id}>
          <HoverCard>
            <DoctorCard doctor={doctor} />
          </HoverCard>
        </StaggerItem>
      ))}
    </StaggerContainer>
  );
};

export default DoctorsGrid;
